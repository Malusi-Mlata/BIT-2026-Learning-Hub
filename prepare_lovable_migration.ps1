param(
    [string]$ProjectPath = "C:\Users\students\Documents\BIT-2026-Learning-Hub"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $ProjectPath -PathType Container)) {
    throw "Project folder not found: $ProjectPath"
}

$ProjectPath = (Resolve-Path -LiteralPath $ProjectPath).Path.TrimEnd("\")
$ProjectName = Split-Path -Leaf $ProjectPath
$ParentPath = Split-Path -Parent $ProjectPath
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$ZipPath = Join-Path $ParentPath "$ProjectName-Lovable-Migration-$Timestamp.zip"
$StagePath = Join-Path $env:TEMP "$ProjectName-Lovable-Migration-$Timestamp"

New-Item -ItemType Directory -Path $StagePath -Force | Out-Null

# Directories that are generated, local-only, or dependency content.
$ExcludedDirectories = @(
    ".git", ".svn", ".hg", "node_modules", "bower_components",
    "dist", "build", "coverage", ".nyc_output", ".vite",
    ".next", ".nuxt", ".output", "out", "vendor",
    ".idea", ".turbo", ".cache", "playwright-report",
    "test-results", "__pycache__", ".pytest_cache"
)

# Files that can contain secrets, local state, database records, or generated output.
$ExcludedFilePatterns = @(
    "^\.env($|\.)",
    "\.(pem|key|p12|pfx|crt|cer|jks)$",
    "(^|[\\/])(id_rsa|id_ed25519)(\.pub)?$",
    "(^|[\\/])(credentials?|secrets?)([-_.].*)?$",
    "\.(sqlite|sqlite3|db|mdb|accdb|dump|bak|backup|log|tmp|cache)$",
    "(^|[-_.])(token|session|password|passwd|secret|credential)([-_.]|$)"
)

# Database record exports are excluded. Keep schema/migration definitions only.
$AllowedSqlPattern = '(^|[\\/])(migrations?|schema)([\\/]|[-_.])|(^|[\\/])(schema|structure)\.sql$'
$ExcludedDataPathPattern = '(^|[\\/])(seed|seeds|fixtures|data|dumps?|backups?)([\\/]|[-_.])'

$FilesCopied = 0
$FilesSkipped = 0
$EnvNames = [System.Collections.Generic.SortedSet[string]]::new([System.StringComparer]::Ordinal)

function Add-EnvName([string]$Name) {
    if ($Name -match '^[A-Za-z_][A-Za-z0-9_]*$') {
        [void]$script:EnvNames.Add($Name)
    }
}

# Read only environment variable NAMES from existing env files. Values are never copied.
$EnvFiles = Get-ChildItem -LiteralPath $ProjectPath -Recurse -Force -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match '^\.env($|\.)' }

foreach ($EnvFile in $EnvFiles) {
    try {
        foreach ($Line in Get-Content -LiteralPath $EnvFile.FullName -ErrorAction Stop) {
            if ($Line -match '^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=') {
                Add-EnvName $Matches[1]
            }
        }
    } catch {
        Write-Warning "Could not inspect variable names in $($EnvFile.Name)."
    }
}

# Discover common frontend/backend environment references in source/config files.
$ReferenceExtensions = @(
    ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".vue",
    ".svelte", ".json", ".html", ".css", ".scss", ".py",
    ".php", ".rb", ".go", ".java", ".cs", ".yml", ".yaml",
    ".toml", ".md"
)

$SourceFiles = Get-ChildItem -LiteralPath $ProjectPath -Recurse -Force -File -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Extension -in $ReferenceExtensions -and
        $_.FullName -notmatch '[\\/](node_modules|\.git|dist|build|vendor|\.next|\.vite)[\\/]'
    }

foreach ($SourceFile in $SourceFiles) {
    try {
        $Content = Get-Content -LiteralPath $SourceFile.FullName -Raw -ErrorAction Stop
        $Patterns = @(
            'import\.meta\.env\.([A-Za-z_][A-Za-z0-9_]*)',
            'process\.env\.([A-Za-z_][A-Za-z0-9_]*)',
            'process\.env\[[''"]([A-Za-z_][A-Za-z0-9_]*)[''"]\]',
            'Deno\.env\.get\([''"]([A-Za-z_][A-Za-z0-9_]*)[''"]\)'
        )
        foreach ($Pattern in $Patterns) {
            foreach ($Match in [regex]::Matches($Content, $Pattern)) {
                Add-EnvName $Match.Groups[1].Value
            }
        }
    } catch {
        # Binary or unreadable files are ignored during variable discovery.
    }
}

# Copy approved project files while preserving their relative folder structure.
$AllFiles = Get-ChildItem -LiteralPath $ProjectPath -Recurse -Force -File -ErrorAction SilentlyContinue

foreach ($File in $AllFiles) {
    $RelativePath = $File.FullName.Substring($ProjectPath.Length).TrimStart("\", "/")
    $RelativeWindows = $RelativePath -replace '/', '\'
    $Segments = $RelativeWindows -split '\\'

    if ($Segments | Where-Object { $_ -in $ExcludedDirectories }) {
        $FilesSkipped++
        continue
    }

    if ($File.Name -match '^\.env($|\.)') {
        $FilesSkipped++
        continue
    }

    $Skip = $false
    foreach ($Pattern in $ExcludedFilePatterns) {
        if ($RelativeWindows -match $Pattern -or $File.Name -match $Pattern) {
            $Skip = $true
            break
        }
    }

    if ($Skip) {
        $FilesSkipped++
        continue
    }

    # SQL is retained only when it is clearly a schema or migration definition.
    if ($File.Extension -eq ".sql") {
        $IsSchema = $RelativeWindows -match $AllowedSqlPattern
        $IsData = $RelativeWindows -match $ExcludedDataPathPattern
        if (-not $IsSchema -or $IsData) {
            $FilesSkipped++
            continue
        }
    }

    # Exclude common database exports regardless of their extension/name.
    if ($File.Name -match '(?i)(database|db)[-_ ]?(export|dump|backup)|(^|[-_.])(seed|fixture)([-_.]|$)') {
        $FilesSkipped++
        continue
    }

    $Destination = Join-Path $StagePath $RelativePath
    $DestinationDirectory = Split-Path -Parent $Destination
    New-Item -ItemType Directory -Path $DestinationDirectory -Force | Out-Null
    Copy-Item -LiteralPath $File.FullName -Destination $Destination -Force
    $FilesCopied++
}

# Create a plain-text environment template containing names only and blank values.
$EnvTemplatePath = Join-Path $StagePath ".env.example"
$EnvLines = @(
    "# Lovable migration environment template",
    "# Values intentionally left blank. Set them in Lovable Secrets / environment settings.",
    "# Review the project code and deployment requirements before supplying values.",
    ""
)

if ($EnvNames.Count -gt 0) {
    foreach ($Name in $EnvNames) {
        $EnvLines += "$Name="
    }
} else {
    $EnvLines += "# No environment variable names were detected automatically."
    $EnvLines += "# Add required variable names here after reviewing the application."
}

Set-Content -LiteralPath $EnvTemplatePath -Value $EnvLines -Encoding UTF8

# Add a migration note without changing the application itself.
$Readme = @"
# Lovable migration package

This archive was assembled from: $ProjectName
Created: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Included
- Project source and static assets
- Dependency manifests and lockfiles, where present
- Application and tool configuration files
- Database schema and migration files detected by path/name
- .env.example containing detected environment variable names with blank values

## Excluded
- .env files and their values
- Common credential, key, certificate, token, and session files
- Dependency folders and generated build output
- Local database files, database dumps, backups, seeds, and fixture data
- Git metadata and local editor/cache folders

## Important review before importing into Lovable
1. Inspect .env.example and add any required variables that could not be detected automatically.
2. Configure secret values in Lovable's environment/secrets settings, not in source files.
3. Review database migrations and confirm the target database provider and migration order.
4. Check API routes, server functions, authentication, file storage, and external integrations for Lovable compatibility.
5. This archive does not contain database records.

The packaging process does not intentionally edit files in the original project directory.
"@
Set-Content -LiteralPath (Join-Path $StagePath "LOVABLE-MIGRATION-README.md") -Value $Readme -Encoding UTF8

# Create the ZIP beside the original project folder.
if (Test-Path -LiteralPath $ZipPath) {
    Remove-Item -LiteralPath $ZipPath -Force
}
Compress-Archive -Path (Join-Path $StagePath '*') -DestinationPath $ZipPath -CompressionLevel Optimal

# Verify the archive exists and report its contents summary.
if (-not (Test-Path -LiteralPath $ZipPath -PathType Leaf)) {
    throw "ZIP creation failed."
}

$ZipInfo = Get-Item -LiteralPath $ZipPath
Write-Host ""
Write-Host "LOVABLE MIGRATION ZIP CREATED" -ForegroundColor Green
Write-Host "ZIP: $ZipPath"
Write-Host ("Size: {0:N2} MB" -f ($ZipInfo.Length / 1MB))
Write-Host "Files copied: $FilesCopied"
Write-Host "Files skipped by safety/exclusion rules: $FilesSkipped"
Write-Host "Environment variable names detected: $($EnvNames.Count)"
Write-Host ""
Write-Host "IMPORTANT: Review the ZIP before uploading it to Lovable." -ForegroundColor Yellow
Write-Host "Check .env.example and confirm all required variables are listed."
Write-Host "Check that database schema/migrations are present and no records are included."

# Remove temporary staging files.
Remove-Item -LiteralPath $StagePath -Recurse -Force
