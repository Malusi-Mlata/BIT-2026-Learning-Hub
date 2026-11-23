
const units = [
    {
        title: "Automation and Control Foundations",
        description: "Automation concepts, control systems, open-loop and closed-loop control, and errors."
    },
    {
        title: "Sensors, Switches and Actuators",
        description: "Sensor principles, switches, actuators, time constants and transfer functions."
    },
    {
        title: "Data Conversion",
        description: "Analogue-to-digital conversion, successive approximation, quantisation and DAC."
    },
    {
        title: "PLC Theory and Basics",
        description: "PLC architecture, scan cycles, logic gates, contacts, timers and counters."
    },
    {
        title: "PLC Practical Laboratory",
        description: "Input/output tables, ladder logic, programming scenarios and troubleshooting."
    },
    {
        title: "Industrial Robotics",
        description: "Robot joints, configurations, programming methods and control resolution."
    },
    {
        title: "Pneumatic Automation",
        description: "Pneumatic components, valve numbering, sequences and cascade grouping."
    },
    {
        title: "Assessment Preparation",
        description: "Revision priorities, worked examples, practice questions and timed tests."
    }
];

const modules = [
    ["IAUT202", "Introduction to Automation", "Available"],
    ["IDPM202", "Interaction Design and Process Modeling", "Coming soon"],
    ["INOS202", "Network Optimization and Security", "Coming soon"],
    ["IWDV202", "Web Applications Development", "Coming soon"]
];

const STORAGE_KEY = "bit2026-learning-progress";

function loadProgress() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

let progress = loadProgress();

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function completedCount() {
    return units.filter((_, index) => progress[index] === true).length;
}

function showPage(page) {
    const pages = {
        dashboard: "dashboard-page",
        modules: "modules-page",
        iaut: "iaut-page",
        progress: "progress-page"
    };

    Object.values(pages).forEach(id => {
        document.getElementById(id).classList.add("hidden");
    });

    document.getElementById(pages[page]).classList.remove("hidden");

    const headings = {
        dashboard: "Dashboard",
        modules: "My Modules",
        iaut: "IAUT202",
        progress: "My Progress"
    };

    document.getElementById("page-heading").textContent = headings[page];

    document.querySelectorAll(".nav-link").forEach(button => {
        button.classList.toggle("active", button.dataset.page === page);
    });

    if (page === "progress") renderProgress();
    if (page === "iaut") renderUnits();
}

function renderUnits() {
    const container = document.getElementById("unit-list");
    container.innerHTML = "";

    units.forEach((unit, index) => {
        const article = document.createElement("article");
        article.className = "unit-card";

        const number = document.createElement("div");
        number.className = "unit-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const info = document.createElement("div");
        info.className = "unit-info";

        const title = document.createElement("h3");
        title.textContent = unit.title;

        const description = document.createElement("p");
        description.textContent = unit.description;

        info.append(title, description);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "unit-check";
        checkbox.checked = progress[index] === true;
        checkbox.setAttribute("aria-label", `Mark ${unit.title} as completed`);

        checkbox.addEventListener("change", () => {
            progress[index] = checkbox.checked;
            saveProgress();
            updateDashboardStats();
            renderProgress();
        });

        article.append(number, info, checkbox);
        container.appendChild(article);
    });
}

function renderModules() {
    const container = document.getElementById("all-modules");
    container.innerHTML = "";

    modules.forEach(([code, name, status]) => {
        const card = document.createElement("article");
        card.className = "module-card";

        const top = document.createElement("div");
        top.className = "module-top";

        const codeLabel = document.createElement("span");
        codeLabel.className = "module-code";
        codeLabel.textContent = code;

        const statusLabel = document.createElement("span");
        statusLabel.className = `status-tag ${status === "Available" ? "available" : "planned"}`;
        statusLabel.textContent = status;

        top.append(codeLabel, statusLabel);

        const title = document.createElement("h3");
        title.textContent = name;

        const description = document.createElement("p");
        description.textContent = code === "IAUT202"
            ? "Eight learning units, study resources and interactive practice."
            : "This module workspace will be added in a future release.";

        card.append(top, title, description);

        if (code === "IAUT202") {
            const open = document.createElement("button");
            open.className = "primary-button";
            open.textContent = "Open module →";
            open.addEventListener("click", () => showPage("iaut"));
            card.appendChild(open);
        }

        container.appendChild(card);
    });
}

function renderProgress() {
    const count = completedCount();
    const percentage = Math.round((count / units.length) * 100);

    document.getElementById("progress-fill").style.width = `${percentage}%`;
    document.getElementById("progress-text").textContent =
        `${count} of ${units.length} units completed (${percentage}%)`;

    const container = document.getElementById("progress-units");
    container.innerHTML = "";

    units.forEach((unit, index) => {
        const row = document.createElement("div");
        row.className = "progress-row";

        const name = document.createElement("span");
        name.textContent = `${index + 1}. ${unit.title}`;

        const status = document.createElement("span");
        status.textContent = progress[index] === true ? "Completed ✓" : "Not completed";

        row.append(name, status);
        container.appendChild(row);
    });
}

function updateDashboardStats() {
    document.getElementById("completed-count").textContent = completedCount();

    const attempts = Number(localStorage.getItem("iaut202-quiz-attempts") || 0);
    document.getElementById("saved-score").textContent = attempts;
}

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
});

document.querySelectorAll('[data-action="open-iaut"]').forEach(button => {
    button.addEventListener("click", () => showPage("iaut"));
});

document.getElementById("today").textContent =
    new Intl.DateTimeFormat("en-ZA", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(new Date());

renderModules();
renderUnits();
updateDashboardStats();
