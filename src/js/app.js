"use strict";

/* ============================================================
   BIT-2026 LEARNING HUB
   IAUT202 UNIT 1 + UNIT 2 LESSON ENGINE
   Existing dashboard and practice resources are preserved.
   Unit 1 progress uses its original numeric storage keys.
   Unit 2 progress uses separate unit2_0 ... unit2_7 keys.
   ============================================================ */

const units = [
    {
        title: "Automation and Control Foundations",
        description: "Automation concepts, control systems, open-loop and closed-loop control, and errors."
    },
    {
        title: "Sensors, Switches and Actuators",
        description: "The computer-process interface, sensor classifications, performance, transfer functions, switches and actuators."
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
    ["INOS202", "Network Optimization and Security", "In progress"],
    ["IWDV202", "Web Applications Development", "Coming soon"]
];

/* ============================================================
   STORAGE
   Existing progress data is retained.
   ============================================================ */

const STORAGE_KEY = "bit2026-learning-progress";
const LESSON_STORAGE_KEY = "bit2026-learning-lessons";

function readStorage(key, fallback = {}) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
        console.warn(`Could not read ${key}:`, error);
        return fallback;
    }
}

let progress = readStorage(STORAGE_KEY);
let lessonProgress = readStorage(LESSON_STORAGE_KEY);

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function saveLessonProgress() {
    localStorage.setItem(LESSON_STORAGE_KEY, JSON.stringify(lessonProgress));
}

function completedCount() {
    return units.filter((_, index) => progress[index] === true).length;
}

/* ============================================================
   UNIT 1 LESSON CONTENT
   Based on the IAUT202 Content Report supplied by the user.
   ============================================================ */

const unitOneLessons = [
    {
        title: "Introduction to Automation",
        source: "Chapter 4 | DOC",
        introduction: "Automation is technology by which a process or procedure is carried out without human assistance.",
        sections: [
            {
                heading: "Understanding automation",
                text: "An automated system uses technology to perform tasks or processes with reduced or no direct human assistance during operation."
            },
            {
                heading: "The three basic elements",
                text: "The source identifies three basic elements of an automated system:",
                points: [
                    "Electric power: supplies the energy needed to operate the system.",
                    "Program of instructions: tells the system what actions to perform.",
                    "Control system: manages and regulates the system to achieve the desired result."
                ]
            },
            {
                heading: "How the elements work together",
                text: "Electric power provides energy, the instructions define what should happen, and the control system manages the operation."
            }
        ],
        keyPoints: [
            "Automation performs a process without human assistance.",
            "The three basic elements are electric power, a program of instructions and a control system.",
            "These elements work together in an automated system."
        ],
        question: {
            prompt: "Which three elements are identified as the basic elements of an automated system?",
            options: [
                "Electric power, program of instructions and control system",
                "Sensors, computers and the internet",
                "Motors, switches and batteries",
                "Input, output and storage"
            ],
            answer: 0,
            explanation: "Correct. Chapter 4 identifies electric power, a program of instructions and a control system as the three basic elements."
        }
    },
    {
        title: "Power in Automated Systems",
        source: "Chapter 4 | DOC",
        introduction: "Electric power supports both the process being performed and the automation functions that control it.",
        sections: [
            {
                heading: "Power for the process",
                text: "Power is used to perform the actual work of the process.",
                points: ["Loading and unloading work units.", "Transporting materials."]
            },
            {
                heading: "Power for automation",
                text: "Power is also needed to operate the automation and information functions.",
                points: ["Operating the control unit.", "Sending control signals.", "Data acquisition.", "Information processing."]
            },
            {
                heading: "Why electric power is useful",
                text: "The source describes electric power as having moderate cost, being easily converted into other forms of energy, carrying signals and being easily stored."
            }
        ],
        keyPoints: [
            "Power for the process performs the physical work.",
            "Power for automation supports control and information functions.",
            "Electric power can be converted into other energy forms and can carry signals."
        ],
        question: {
            prompt: "Which activity is an example of power used for automation?",
            options: ["Transporting raw material", "Loading a work unit", "Operating the control unit", "Unloading finished products"],
            answer: 2,
            explanation: "Correct. Operating the control unit is listed as an automation function."
        }
    },
    {
        title: "Programs of Instructions and Actuation",
        source: "Chapter 4 | DOC",
        introduction: "The program of instructions defines the actions that an automated system must perform.",
        sections: [
            {
                heading: "Types of instruction programs",
                text: "The source identifies several types of programs of instructions:",
                points: ["Set-point control.", "Logic control.", "Sequence control.", "Interactive program.", "Intelligent program."]
            },
            {
                heading: "Work-cycle programs",
                text: "Work-cycle programs maintain a single process parameter at a defined level."
            },
            {
                heading: "The actuation system",
                text: "The actuation system transforms the output of a microprocessor or control system into a controlling action on a machine or device."
            }
        ],
        keyPoints: [
            "The program of instructions defines what the system should do.",
            "Work-cycle programs maintain a process parameter at a defined level.",
            "The actuation system converts control output into a physical controlling action."
        ],
        question: {
            prompt: "What does the actuation system do?",
            options: ["Stores the student's examination results", "Transforms control-system output into a controlling action", "Measures the cost of electric power", "Replaces the program of instructions"],
            answer: 1,
            explanation: "Correct. The actuation system transforms control-system output into an action on a machine or device."
        }
    },
    {
        title: "Control Systems: Open-Loop and Closed-Loop",
        source: "Chapter 4 | DOC",
        introduction: "A control system manages or regulates another system using control signals to achieve a desired result.",
        sections: [
            {
                heading: "Elements of a control system",
                text: "The source identifies these elements:",
                points: ["Inputs.", "Outputs.", "Process.", "Controller.", "Feedback.", "Actuator."]
            },
            {
                heading: "Open-loop control",
                text: "An open-loop control system has no feedback loop. Its output is not used to regulate the system."
            },
            {
                heading: "Closed-loop control",
                text: "A closed-loop control system uses feedback. The system compares its output with the input set-point."
            },
            {
                heading: "When can open-loop control be used?",
                text: "The source identifies three situations where open-loop control may be acceptable:",
                points: ["The actions are simple.", "The actuator is highly reliable.", "Opposing reaction forces are too small to affect actuation."]
            }
        ],
        keyPoints: [
            "Open-loop control has no feedback loop.",
            "Closed-loop control uses feedback to compare output with the set input.",
            "Feedback is the key difference between the two systems."
        ],
        question: {
            prompt: "What is the main difference between open-loop and closed-loop control?",
            options: ["Open-loop uses feedback while closed-loop does not", "Closed-loop uses feedback while open-loop does not", "Both systems always use feedback", "Neither system uses a controller"],
            answer: 1,
            explanation: "Correct. Closed-loop control uses feedback. Open-loop control does not."
        }
    }, {
        title: "Industrial Control: Process and Discrete Industries",
        source: "Chapter 5 | DOC",
        introduction: "Industrial control can be understood by looking at the type of material or production activity involved.",
        sections: [
            {
                heading: "Process industries",
                text: "A process industry performs operations on amounts of material."
            },
            {
                heading: "Discrete industries",
                text: "A discrete industry performs operations on quantities of material. These are countable units."
            },
            {
                heading: "Understanding the distinction",
                text: "The source distinguishes amounts from quantities. Amounts refer to material handled as a continuous or bulk process, while quantities refer to countable units."
            }
        ],
        keyPoints: ["Process industries work with amounts of material.", "Discrete industries work with quantities of material.", "Discrete quantities are countable units."],
        question: {
            prompt: "According to Chapter 5, what does a discrete industry perform operations on?",
            options: ["Only electric power", "Amounts of material", "Quantities of material", "Only continuous signals"],
            answer: 2,
            explanation: "Correct. Discrete industries perform operations on quantities, which are countable units."
        }
    },
    {
        title: "Continuous Control",
        source: "Chapter 5 | DOC",
        introduction: "Continuous control aims to keep an output variable at a desired level using an input set-point.",
        sections: [
            {
                heading: "Continuous variables",
                text: "A continuous or analogue variable is an uninterrupted signal during operation."
            },
            {
                heading: "Regulatory control",
                text: "Regulatory control maintains process performance at a particular value or within a tolerance band."
            },
            {
                heading: "Feedforward control",
                text: "Feedforward control anticipates and compensates for a disturbance before it enters the process, rather than waiting to correct the effect afterwards."
            },
            {
                heading: "Steady-state optimisation",
                text: "Steady-state optimisation aims to optimise an index of performance, such as production rate. It uses relationships between the performance index and process variables. Parameter values are found mathematically. The source notes that this is open-loop and cannot compensate for disturbances."
            },
            {
                heading: "Adaptive control",
                text: "Adaptive control combines feedback control and optimal control. It measures process variables during operation and can alter its algorithm as the environment changes.",
                points: ["Identification.", "Decision.", "Modification."]
            }
        ],
        keyPoints: [
            "Regulatory control maintains a value or tolerance band.",
            "Feedforward control anticipates disturbances.",
            "Steady-state optimisation optimises a performance index but cannot compensate for disturbances.",
            "Adaptive control measures variables and changes its algorithm as conditions change."
        ],
        question: {
            prompt: "Which control approach anticipates and compensates for a disturbance before it enters the process?",
            options: ["Feedforward control", "Steady-state optimisation", "Time-driven control", "Discrete control"],
            answer: 0,
            explanation: "Correct. Feedforward control anticipates a disturbance and compensates before it enters the process."
        }
    },
    {
        title: "Discrete Control: Event-Driven and Time-Driven",
        source: "Chapter 5 | DOC",
        introduction: "Discrete control variables change at particular moments defined by a program.",
        sections: [
            {
                heading: "Discrete variables",
                text: "A discrete variable takes values periodically from a range. The source notes that these are most commonly binary values, represented by 1s and 0s."
            },
            {
                heading: "Event-driven control",
                text: "In event-driven control, the controller acts because an event has changed the state of the system.",
                points: [
                    "A robot loads a part into a fixture and a limit switch detects it.",
                    "A low hopper level activates a low-level switch that opens a valve.",
                    "An optical sensor counts parts passing on a conveyor."
                ]
            },
            {
                heading: "Time-driven control",
                text: "In time-driven control, the controller acts at a set time or after a time interval.",
                points: ["A factory clock sounds a bell at shift or break times.", "A heat-treatment process runs for a fixed time.", "A washing machine agitates for a fixed period."]
            }
        ],
        keyPoints: [
            "Event-driven control responds to an event or change in system state.",
            "Time-driven control responds to a set time or elapsed time.",
            "Discrete variables commonly use binary values."
        ],
        question: {
            prompt: "A washing machine agitates for a fixed period. Which type of control is this?",
            options: ["Event-driven control", "Time-driven control", "Feedforward control", "Adaptive control"],
            answer: 1,
            explanation: "Correct. The agitation period is determined by a fixed time interval, making it time-driven."
        }
    },
    {
        title: "System Reliability and Error Recovery",
        source: "Chapter 4 | DOC",
        introduction: "Automated systems use monitoring and recovery functions to improve safe and reliable operation.",
        sections: [
            {
                heading: "Advanced automation functions",
                text: "The source identifies four advanced automation functions:",
                points: ["Safety monitoring.", "Maintenance diagnostics.", "Error detection.", "Error recovery."]
            },
            {
                heading: "Safety monitoring",
                text: "Possible safety responses include stopping the system, raising an alarm or reducing speed. Devices mentioned in the source include vision systems, limit switches, heat and smoke detectors, LIDAR and light curtains."
            },
            {
                heading: "Maintenance diagnostics",
                text: "The source describes three diagnostic activities:",
                points: [
                    "Status monitoring: watches sensors and system parameters.",
                    "Failure diagnostics: compares current values with earlier monitored values to identify a fault.",
                    "Repair procedure: recommends repair steps to the maintenance team."
                ]
            },
            {
                heading: "Types of errors",
                text: "The source identifies three error types:",
                points: [
                    "Random errors: occur during regular operation.",
                    "Systematic errors: have a transferable cause, such as material changes or equipment drift.",
                    "Aberrations: can result from human error or equipment failure."
                ]
            },
            {
                heading: "Error recovery strategies",
                text: "The source identifies four strategies:",
                points: [
                    "Make adjustments at the end of the cycle.",
                    "Make adjustments during the cycle.",
                    "Stop the process to correct the problem.",
                    "Stop the process and call for assistance."
                ]
            }
        ],
        keyPoints: [
            "Safety monitoring can stop a system, raise an alarm or reduce speed.",
            "Maintenance diagnostics include status monitoring, failure diagnostics and repair procedures.",
            "The three error types are random errors, systematic errors and aberrations.",
            "Error recovery can involve adjustments, stopping the process or calling for assistance."
        ],
        question: {
            prompt: "Which error type can result from equipment drift or a material change?",
            options: ["Random error", "Systematic error", "Time-driven error", "Feedback error"],
            answer: 1,
            explanation: "Correct. The source describes systematic errors as having a transferable cause, such as material changes or equipment drift."
        }
    }
];

/* ============================================================
   UNIT 2 LESSON CONTENT
   Source: Claude's IAUT202 Unit 2 Content Report, 22 Nov 2026.
   Primary PDF: Automation Components (Chapter 6) [Part 1].pdf.
   Supporting PDFs and 2025 Test 1 are identified lesson by lesson.
   Source gaps are explicitly labelled. No unsupported definitions
   are presented as lecture-slide content.
   ============================================================ */

const unitTwoLessons = [
    {
        title: "The Computer–Process Interface",
        source: "Chapter 6 Part 1 | Slides 3–4",
        introduction: "For process control to work, a computer must collect data from the production process and transmit signals back to it.",
        sections: [
            {
                heading: "The four parts of the interface",
                text: "Chapter 6 Part 1, slide 3, identifies four things needed to implement process control:",
                points: [
                    "Sensors: measure continuous and discrete process variables.",
                    "Actuators: drive continuous and discrete process parameters.",
                    "ADC and DAC devices: convert analogue signals to digital and digital signals to analogue.",
                    "Discrete-data I/O devices: provide input and output for discrete data."
                ]
            },
            {
                heading: "Understanding the process diagram",
                text: "Slide 4 places the Process at the centre and identifies four interface elements in its legend:",
                points: [
                    "1: Sensors measure continuous and discrete variables.",
                    "2: Actuators drive the process.",
                    "3: Conversion devices change between continuous and discrete signals, in both directions.",
                    "4: Input/output data."
                ]
            },
            {
                heading: "Continuous and discrete variables",
                text: "Chapter 5, slide 4, describes a continuous variable, also called analogue, as an uninterrupted signal during an operation. A discrete variable takes values periodically from a range. The most common discrete values are binary: 1s and 0s."
            },
            {
                heading: "Where this unit stops",
                text: "The interface introduces ADC, DAC and discrete I/O. The detailed conversion chain and data-conversion methods belong to Unit 3, not this lesson."
            }
        ],
        keyPoints: [
            "The computer–process interface has four parts: sensors, actuators, conversion devices and discrete-data I/O.",
            "Sensors measure process variables; actuators drive process parameters.",
            "Continuous variables are uninterrupted analogue signals.",
            "Discrete variables take values from a range, most commonly binary 1s and 0s."
        ],
        question: {
            prompt: "Which interface component drives continuous and discrete process parameters?",
            options: ["Sensor", "Actuator", "ADC", "Discrete input device"],
            answer: 1,
            explanation: "Correct. Chapter 6 Part 1 identifies actuators as the devices that drive continuous and discrete process parameters."
        }
    },
        {
        title: "Sensor Performance and Selection Criteria",
        source: "Chapter 6 Part 1 | Slides 7–8",
        introduction: "Choosing a sensor involves understanding the measurement, deciding what output is needed and then identifying suitable sensors.",
        sections: [
            {
                heading: "Sensor performance terminology",
                text: "Chapter 6 Part 1 slide 7 lists nine performance terms. The slide lists the terms but does not define them or provide formulas:",
                points: [
                    "Range and span.",
                    "Error.",
                    "Accuracy.",
                    "Non-linearity error.",
                    "Repeatability/reproducibility.",
                    "Stability.",
                    "Dead band/time.",
                    "Resolution.",
                    "Output impedance."
                ]
            },
            {
                heading: "Three-step sensor selection process",
                text: "Chapter 6 Part 1 slide 8 gives the following selection sequence:",
                points: [
                    "1. Consider the nature of the measurement required: the variable, its nominal value, range, required accuracy, measurement speed, reliability and environmental conditions.",
                    "2. Consider the nature of the output required from the sensor. This determines the signal-conditioning requirements.",
                    "3. Identify possible sensors, considering range, accuracy, linearity, speed of response, reliability, maintainability, life, power-supply requirements, ruggedness, availability and cost."
                ]
            },
            {
                heading: "Applying the selection sequence",
                text: "For a measurement task, first describe what must be measured and the conditions in which it will be measured. Next decide what output the system needs. Then compare possible sensors against the factors listed on slide 8."
            },
            {
                heading: "What the slides do not define",
                text: "The nine performance terms are not defined in the supplied lecture slides. Do not memorise textbook or internet definitions as if they were printed in this course source. The slide does provide the three-step selection criteria in detail."
            }
        ],
        keyPoints: [
            "Chapter 6 Part 1 slide 7 lists nine sensor performance terms but gives no definitions.",
            "Sensor selection follows three steps: understand the measurement, determine the required output, then identify possible sensors.",
            "Selection factors include range, accuracy, linearity, response speed, reliability, maintainability, life, power, ruggedness, availability and cost."
        ],
        question: {
            prompt: "What is the correct first step in the sensor-selection process on slide 8?",
            options: [
                "Choose the cheapest available sensor.",
                "Consider the nature of the measurement required.",
                "Select a sensor before defining the output.",
                "Ignore the environmental conditions."
            ],
            answer: 1,
            explanation: "Correct. The first step is to consider the measurement variable, nominal value, range, accuracy, speed, reliability and operating environment."
        }
    },
    {
        title: "Static and Dynamic Characteristics",
        source: "Chapter 6 Part 1 | Slides 9–11",
        introduction: "Static characteristics describe values after a transducer has settled. Dynamic characteristics describe its behaviour while it is responding to a change.",
        sections: [
            {
                heading: "Static characteristics",
                text: "The slide defines static characteristics as the values given when steady-state conditions occur, meaning the values given when the transducer has settled down after receiving an input."
            },
            {
                heading: "Dynamic characteristics",
                text: "The slide defines dynamic characteristics as the behaviour between the time that the input value changes and the time that the value given by the transducer settles down to the steady state."
            },
            {
                heading: "Inputs used to describe dynamic response",
                text: "Chapter 6 Part 1 slide 10 says dynamic characteristics are stated in terms of the transducer's response to inputs in particular forms:",
                points: ["Ramp input.", "Step input.", "Sinusoidal input."]
            },
            {
                heading: "Dynamic measures named in the slides",
                text: "The slides list four measures:",
                points: ["Response time.", "Time constant.", "Rise time.", "Settling time."]
            },
            {
                heading: "The time-constant statement",
                text: "The exact statement printed on slide 10 is: “Time constant: 63.2% of response time”. The slides do not provide an equation, define response time, state which input form the 63.2% refers to, or show a worked example. Slide 11 is figure-only and its graph could not be read in the source report."
            }
        ],
        keyPoints: [
            "Static characteristics refer to values after the transducer has settled at steady state.",
            "Dynamic characteristics refer to behaviour between an input change and the output settling.",
            "The slides name ramp, step and sinusoidal inputs.",
            "Response time, time constant, rise time and settling time are listed as dynamic measures.",
            "The source's only time-constant explanation is “63.2% of response time”; further detail is not supplied."
        ],
        question: {
            prompt: "Which statement best matches the lecture-slide definition of dynamic characteristics?",
            options: [
                "Values after the transducer has settled.",
                "Behaviour between an input change and the output settling to steady state.",
                "The cost of maintaining a sensor.",
                "The number of contacts on a switch."
            ],
            answer: 1,
            explanation: "Correct. Dynamic characteristics describe the transducer's behaviour from the time the input changes until its output settles to steady state."
        }
    },
    {
        title: "Sensor Transfer Functions",
        source: "Chapter 6 Part 1 | Slide 12; Test 1 (2025)",
        introduction: "A transfer function expresses the relationship between the physical stimulus entering a sensor and the signal produced at its output.",
        sections: [
            {
                heading: "Definition from the lecture slide",
                text: "Chapter 6 Part 1 slide 12 defines a transfer function as the relationship between the input physical stimulus and the signal value produced by the sensor. It also describes it as the relationship between the input and output of a control system."
            },
            {
                heading: "General form",
                text: "The slide gives the expression S = f(s). It defines S as the output signal, such as voltage or current, and s as the input stimulus. The form of the function f is not specified."
            },
            {
                heading: "Ideal function",
                text: "The slide also prints S = C + ms and labels it the “Ideal function”. The slide does not define C or m, and does not provide units or a worked example."
            },
            {
                heading: "Exam-derived quadratic example",
                text: "The 2025 Test 1 Q2.2 gives three calibration points for a sensor measuring fluid height in a parabolic tank. The question describes a nonlinear, quadratic relationship between height h in metres and output voltage V in volts. The following solution is derived algebraically from the printed data. It is not an official marking memo.",
                points: [
                    "At h = 0 m, V = 0.5 V.",
                    "At h = 2 m, V = 3.3 V.",
                    "At h = 4 m, V = 9.7 V.",
                    "Find the quadratic transfer function, then calculate the output at h = 3 m."
                ]
            },
            {
                heading: "Worked calculation",
                text: "Assume the quadratic form V = ah² + bh + c, as required by the question's description of a quadratic relationship.",
                points: [
                    "At h = 0: c = 0.5.",
                    "At h = 2: 4a + 2b + 0.5 = 3.3, therefore 2a + b = 1.4.",
                    "At h = 4: 16a + 4b + 0.5 = 9.7, therefore 4a + b = 2.3.",
                    "Subtract the equations: 2a = 0.9, so a = 0.45.",
                    "Then b = 1.4 − 0.9 = 0.5.",
                    "Transfer function: V = 0.45h² + 0.5h + 0.5.",
                    "At h = 3: V = 0.45(9) + 0.5(3) + 0.5 = 6.05 V."
                ]
            },
            {
                heading: "Exam limitation to remember",
                text: "Test 1 Q1.3 asks how a transfer function is implemented in control logic. The supplied lecture slides explain the concept and equations but do not explain implementation in control logic. The quadratic form is used in the 2025 test but is not taught in the supplied Chapter 6 Part 1 slides. The equation printed on the test paper was not readable in the report extraction, so the quadratic form above is an explicitly stated assumption based on the question wording."
            }
        ],
        keyPoints: [
            "A transfer function relates an input physical stimulus to an output signal.",
            "The slide gives S = f(s), where S is output voltage/current and s is input stimulus.",
            "The slide's ideal function is S = C + ms. C and m are not defined in the slides.",
            "The 2025 Test 1 quadratic example gives V = 0.45h² + 0.5h + 0.5 and V = 6.05 V at h = 3 m.",
            "The quadratic solution is derived from exam data, not an official memo."
        ],
        question: {
            prompt: "A sensor's quadratic calibration data are (h,V): (0,0.5), (2,3.3) and (4,9.7). Using the derived function V = 0.45h² + 0.5h + 0.5, what is V at h = 3 m?",
            options: ["4.50 V", "5.50 V", "6.05 V", "9.70 V"],
            answer: 2,
            explanation: "Correct. V = 0.45(3²) + 0.5(3) + 0.5 = 4.05 + 1.5 + 0.5 = 6.05 V. This is the report's derived solution, not an official memo."
        }
    },
    {
        title: "Mechanical Switches and Switch Bounce",
        source: "Chapter 6 Part 1 | Slides 13–15",
        introduction: "Mechanical switches transmit a 0 or 1 signal by opening or closing a switch. The lecture introduces poles, throws and the switch-bounce problem.",
        sections: [
            {
                heading: "Opening and closing a switch",
                text: "Chapter 6 Part 1 slide 13 states that 0 or 1 signals can be transmitted by the act of opening or closing a switch."
            },
            {
                heading: "Poles and throws",
                text: "The slide defines poles as the number of separate circuits that can be completed by the same switching action. Throws are the number of individual contacts for each pole."
            },
            {
                heading: "Switch types named in the slides",
                text: "The slide names three mechanical switch types:",
                points: [
                    "SPST: single pole–single throw.",
                "SPDT: single pole–double throw.",
                "DPDT: double pole–double throw."
            ]
        },
        {
            heading: "Understanding the names",
            text: "The abbreviations tell you the pole and throw counts. SPST has one pole and one throw; SPDT has one pole and two throws; DPDT has two poles and two throws. The symbol figures in the source were not readable in the report."
        },
        {
            heading: "Switch bounce",
            text: "The slides explain that a mechanical switch can bounce while opening or closing. A microprocessor might interpret the bouncing as two or more separate switch actions."
        },
        {
            heading: "Debouncing",
            text: "The slides say either hardware or software can be used to overcome switch bounce. The hardware method named is flip-flops, with the clock set to more than the bounce time. The software method is mentioned but not explained."
        },
        {
            heading: "Related contact terminology",
            text: "The 2026 PLC Assignment Brief uses normally open (NO) and normally closed (NC) push buttons. The Chapter 6 Part 1 slides do not define NO or NC, so those definitions are not added as lecture-slide content here."
        }
    ],
        keyPoints: [
            "Poles are separate circuits completed by the same switching action.",
            "Throws are the individual contacts for each pole.",
            "SPST = one pole, one throw; SPDT = one pole, two throws; DPDT = two poles, two throws.",
            "Switch bounce can make a microprocessor detect multiple actions from one physical operation.",
            "The hardware solution named in the slides uses flip-flops with the clock set to more than the bounce time."
        ],
            question: {
        prompt: "What does “throws” mean in the Chapter 6 mechanical-switch definition?",
            options: [
                "The number of separate circuits completed by one switching action.",
                "The number of individual contacts for each pole.",
                "The time taken for a sensor to settle.",
                "The number of motors connected to a controller."
            ],
                answer: 1,
                    explanation: "Correct. Throws are the number of individual contacts for each pole. Poles count the separate circuits."
    }
},
{
    title: "Actuators and Rotary-to-Linear Motion",
        source: "Chapter 6 Part 1 | Slides 15–18",
            introduction: "An actuator converts energy into a force that creates linear or rotary motion. The lecture names three actuator families and three mechanical motion-conversion methods.",
                sections: [
                    {
                        heading: "Actuator definition and families",
                        text: "Chapter 6 Part 1 slide 15 defines an actuator as a device that converts a form of energy into a force to create a linear/rotary motion. The three families listed are:",
                        points: ["Electrical.", "Pneumatic.", "Hydraulic."]
                    },
                    {
                        heading: "Motors named in the lecture",
                        text: "The slide lists these motor types:",
                        points: [
                            "DC motors, including brushless motors. Examples given for brushless motors are drones and e-bikes.",
                            "Stepper motors.",
                            "Servo motors.",
                            "AC motors: induction and synchronous.",
                            "Linear motors."
                        ]
                    },
                    {
                        heading: "Pumps and pneumatic actuators",
                        text: "The slide names peristaltic pumps and lobe pumps. It describes a pneumatic actuator as air driven, using compressed air or vacuum to drive rotary/linear motion. The operating principles of the listed motor and pump types are not explained in the supplied slides."
                    },
                    {
                        heading: "Discrete-process actuators",
                        text: "Chapter 9 slide 3 gives examples of discrete-process actuators and their states:",
                        points: [
                            "Motor: On/Off.",
                            "Valve: Open/Closed.",
                            "Clutch: Engaged/Not engaged."
                        ]
                    },
                    {
                        heading: "Robot joint drive systems",
                        text: "Industrial Robotics Chapter 8 Part 1 slide 18 describes three robot joint drive systems:",
                        points: [
                            "Electric: uses electric motors to actuate individual joints and is described as the preferred drive system in today's robots.",
                            "Hydraulic: uses hydraulic pistons and rotary vane actuators; noted for high power and lift capacity.",
                            "Pneumatic: typically limited to smaller robots and simple material-transfer applications."
                        ]
                    },
                    {
                        heading: "Pneumatic actuator examples",
                        text: "Pneumatic Automation slides 13–14 name single-acting cylinders, double-acting cylinders, rodless cylinders and rotary actuators. The report notes that these are shown in pictures, without explanatory text."
                    },
                    {
                        heading: "Three rotary-to-linear conversion methods",
                        text: "Chapter 6 Part 1 slide 17 names three methods:",
                        points: [
                            "Leadscrews, ball-screws and threaded rods: a helical thread with a certain pitch drives the system linearly by a certain displacement with one revolution.",
                            "Pulleys and belts: pulleys rigidly connect the motor to the mechanical system, usually with timing belts.",
                            "Rack and pinion: a gear connected to the motor drives along a linear rack with equal tooth spacing."
                        ]
                    },
                    {
                        heading: "What is not supplied",
                        text: "The lecture slides do not explain the operating principles of the motor and pump types, actuator specifications such as torque/speed/power, applications for the three rotary-to-linear mechanisms, or a formula for their linear displacement."
                    }
                ],
                    keyPoints: [
                        "An actuator converts a form of energy into a force that creates linear or rotary motion.",
                        "The three actuator families are electrical, pneumatic and hydraulic.",
                        "Motors listed include DC, brushless, stepper, servo, AC induction, AC synchronous and linear motors.",
                        "The three rotary-to-linear methods are screw mechanisms, pulleys and belts, and rack and pinion.",
                        "The 2025 Test 1 asks learners to name the three rotary-to-linear methods."
                    ],
                        question: {
        prompt: "Which option lists the three rotary-to-linear motion conversion methods from Chapter 6 Part 1 slide 17?",
            options: [
                "Hydraulic, pneumatic and electrical",
                "Leadscrews/ball-screws, pulleys and belts, rack and pinion",
                "DC, AC and linear motors",
                "Peristaltic pumps, lobe pumps and valves"
            ],
                answer: 1,
                    explanation: "Correct. The three methods are screw mechanisms, pulleys and belts, and rack and pinion."
    }
},
{
    title: "Examination Practice and Unit 2 Review",
        source: "IAUT202 Test 1 (2025) | Questions 1.3, 1.5 and 2.2",
            introduction: "The supplied 2025 Test 1 contains three questions directly linked to Unit 2, totalling 11 of 55 marks. This lesson consolidates the examinable material and distinguishes verified content from gaps.",
                sections: [
                    {
                        heading: "Question 1.3: transfer function (2 marks)",
                        text: "The question asks learners to discuss the concept of a transfer function and how it is implemented in control logic. The slides support the definition and the expressions S = f(s) and S = C + ms. The supplied slides do not explain implementation in control logic, so a complete answer to that part cannot be built from these PDFs alone."
                    },
                    {
                        heading: "Question 1.5: rotary-to-linear conversion (3 marks)",
                        text: "Name the three methods and give the short descriptions from Chapter 6 Part 1 slide 17:",
                        points: [
                            "Leadscrews, ball-screws and threaded rods: helical thread and pitch produce linear displacement.",
                            "Pulleys and belts: pulleys connect the motor to the mechanical system, usually with timing belts.",
                            "Rack and pinion: a motor-connected gear drives along a linear rack with equal tooth spacing."
                        ]
                    },
                    {
                        heading: "Question 2.2: quadratic sensor transfer function (6 marks)",
                        text: "The report derives the quadratic relationship from the three calibration points. The derived function is V = 0.45h² + 0.5h + 0.5. At h = 3 m, the output is 6.05 V. This is algebra worked from the question data, not an official marking memo."
                    },
                    {
                        heading: "Definitions to revise",
                        text: "Use the source wording for these definitions:",
                        points: [
                            "Sensor: a transducer that converts a physical stimulus from one form into a more useful form to measure the stimulus.",
                            "Active sensor: produces a voltage from an external stimulus without external power.",
                            "Passive sensor: requires an external power supply for correct operation.",
                            "Static characteristics: values once steady-state conditions occur.",
                            "Dynamic characteristics: behaviour between the input changing and the output settling to steady state.",
                            "Transfer function: relationship between the input physical stimulus and the signal value produced by the sensor.",
                            "Actuator: a device that converts a form of energy into a force to create linear/rotary motion."
                        ]
                    },
                    {
                        heading: "High-priority revision order",
                        text: "The report ranks rotary-to-linear conversion and transfer functions highest because they appear directly in the supplied 2025 test. Then revise sensor and actuator definitions and active/passive classification. Other slide topics include switch poles/throws, switch bounce, static/dynamic characteristics, sensor selection, performance terminology, motors and pumps."
                    },
                    {
                        heading: "Source limitations",
                        text: "No marking memo was supplied. The nine sensor performance terms are listed but not defined. C and m are not defined in S = C + ms. The time-constant statement is not expanded. Software debouncing, NO/NC definitions and detailed sensor/actuator operating principles are absent from the readable lecture material."
                    }
                ],
                    keyPoints: [
                        "Unit 2 appears in the 2025 Test 1 as Q1.3 (2 marks), Q1.5 (3 marks) and Q2.2 (6 marks).",
                        "These questions total 11 of 55 marks in that paper.",
                        "Know the three rotary-to-linear methods and the transfer-function concept.",
                        "Practise the derived quadratic calibration calculation, while remembering that no official memo was supplied.",
                        "Do not mistake a topic being named in a slide for a full explanation of that topic."
                    ],
                        question: {
        prompt: "How many marks do the three directly Unit 2-linked questions (Q1.3, Q1.5 and Q2.2) total in the supplied 2025 Test 1?",
            options: ["5 marks", "8 marks", "11 marks", "20 marks"],
                answer: 2,
                    explanation: "Correct. Q1.3 is 2 marks, Q1.5 is 3 marks and Q2.2 is 6 marks: 2 + 3 + 6 = 11 marks."
    }
}
];

const lessonSets = {
    0: unitOneLessons,
    1: unitTwoLessons
};

function getLessonsForUnit(unitIndex) {
    return lessonSets[unitIndex] || [];
}

function getLessonProgressKey(unitIndex, lessonIndex) {
    // Preserve Unit 1's original numeric keys in localStorage.
    return unitIndex === 0 ? String(lessonIndex) : `unit${unitIndex + 1}_${lessonIndex}`;
}

function isLessonComplete(unitIndex, lessonIndex) {
    return lessonProgress[getLessonProgressKey(unitIndex, lessonIndex)] === true;
}

function getCompletedLessonCount(unitIndex) {
    const unitLessons = getLessonsForUnit(unitIndex);
    return unitLessons.filter((_, index) => isLessonComplete(unitIndex, index)).length;
}

function isUnitLessonEngineComplete(unitIndex) {
    const unitLessons = getLessonsForUnit(unitIndex);
    return unitLessons.length > 0 && getCompletedLessonCount(unitIndex) === unitLessons.length;
}


/* ============================================================
   INOS202 LESSON CONTENT
   Based on the two supplied Cisco slide-deck content reports.
   Lesson 1: LAN Security Concepts.
   Lesson 2: Network Security Concepts.
   Source gaps are labelled instead of being filled with guesses.
   ============================================================ */

const inosLessons = [
    {
        title: "LAN Security Concepts",
        source: "INOS202 | Topic 1 | SRWE Module 10",
        sourceFile: "Topic_1_-_LAN_Security_Concepts_-_SRWE_Module_10_-_Slides_Only.pptx",
        introduction: "A LAN must protect its devices, users and data. This lesson explains endpoint protection, access control and common Layer 2 attacks that can weaken a local network.",
        sections: [
            {
                heading: "1. Endpoint security",
                text: "An endpoint is a device connected to a network. Examples include laptops, desktops, servers, IP phones and employee devices. Endpoints are common targets because users interact with email, websites and files.",
                points: [
                    "Antivirus and antimalware software detect or remove malicious software.",
                    "A host firewall controls network traffic entering or leaving an endpoint.", "Host Intrusion Prevention Systems (HIPS) help detect and prevent suspicious activity on a host.",
                    "A layered approach can also use Network Access Control (NAC), Advanced Malware Protection (AMP), Email Security Appliance (ESA) and Web Security Appliance (WSA)."
                ]
            },
            {
                heading: "2. Network security devices and access control",
                text: "A VPN-enabled router can provide protected remote connectivity. A Next-Generation Firewall (NGFW) adds capabilities such as stateful inspection, application visibility and control, intrusion prevention, malware protection and URL filtering.",
                points: [
                    "Authentication asks: who are you?",
                    "Authorization asks: what are you allowed to do?",
                    "Accounting records: what did you do?",
                    "Together, these three functions are called AAA.",
                    "Local authentication stores usernames and passwords on each network device. It can suit a small network, but accounts must be repeated on devices and there is no central fallback.",
                    "Server-based AAA centralises authentication for multiple routers and switches. RADIUS and TACACS+ are examples of AAA protocols."
                ]
            },
            {
                heading: "3. 802.1X port-based access control",
                text: "802.1X controls access to a switch port until the connecting device or user is authenticated.",
                points: [
                    "Supplicant: the client requesting network access.",
                    "Authenticator: usually the switch controlling the port.",
                    "Authentication server: checks the supplied identity information.",
                    "The three roles work together to decide whether the client may access the network."
                ]
            },
            {
                heading: "4. Layer 2 security threats",
                text: "Layer 2 operates at the data-link layer. If an attacker compromises Layer 2, communication at higher network layers can also be affected. Common Layer 2 attack categories include MAC table attacks, VLAN attacks, DHCP attacks, ARP attacks, address spoofing and STP attacks.",
                points: [
                    "MAC flooding: an attacker sends many fake source MAC addresses to fill a switch's MAC address table. Unknown unicast traffic may then be flooded to ports in the same VLAN.",
                    "VLAN hopping: an attacker attempts to gain access to VLANs they should not reach, for example by impersonating a switch and negotiating a trunk.",
                    "Double-tagging: an attacker places two 802.1Q VLAN tags in a frame. The first switch removes the outer native-VLAN tag, allowing the inner tag to be processed farther along the path.",
                    "DHCP starvation: fake clients request leases until the DHCP address pool is exhausted.",
                    "DHCP spoofing: a rogue DHCP server offers incorrect network settings, such as a malicious default gateway or DNS server.",
                    "ARP spoofing or poisoning: false ARP information can associate an attacker's MAC address with another device's IP address, enabling a man-in-the-middle position.",
                    "IP or MAC spoofing: an attacker falsifies an IP or MAC address to impersonate another device.",
                    "STP attack: an attacker sends BPDUs with a lower bridge priority to try to become the root bridge."
                ]
            },
            {
                heading: "5. Matching attacks with the listed protections",
                text: "The slide deck identifies these protective technologies and their intended uses:",
                points: [
                    "Port Security: helps protect against MAC flooding and DHCP starvation.",
                    "DHCP Snooping: helps protect against DHCP starvation and rogue DHCP server activity.",
                    "Dynamic ARP Inspection (DAI): helps protect against ARP spoofing and poisoning.",
                    "IP Source Guard (IPSG): helps protect against IP and MAC address spoofing.",
                    "BPDU Guard: protects access ports against unexpected spanning-tree BPDUs.",
                    "Secure management: use secure protocols such as SSH, SFTP, SSL and TLS; consider a dedicated management VLAN, access control lists (ACLs) and out-of-band management."
                ]
            },
            {
                heading: "6. CDP and LLDP information exposure",
                text: "Cisco Discovery Protocol (CDP) is a Cisco Layer 2 discovery protocol. The slides state that it is enabled by default and can disclose information such as device IP address, IOS version, platform, capabilities and native VLAN. LLDP can also expose device information.",
                points: [
                    "Limit discovery-protocol use to interfaces and environments where it is needed.",
                    "The slides list commands including `no cdp run`, `no cdp enable`, `no lldp run`, `no lldp transmit` and `no lldp receive`.",
                    "The command `show mac address-table dynamic` displays dynamically learned MAC address-table entries."
                ]
            }
        ],
        keyPoints: [
            "Protect endpoints with layered controls such as antimalware, host firewalls and HIPS.",
            "AAA means Authentication, Authorization and Accounting.",
            "802.1X uses a supplicant, authenticator and authentication server.",
            "Know the difference between MAC flooding, VLAN hopping, DHCP attacks, ARP poisoning, spoofing and STP attacks.",
            "Match Port Security, DHCP Snooping, DAI, IPSG and BPDU Guard to the threats listed in the slides.",
            "Secure network-device management and limit unnecessary CDP or LLDP exposure."
        ],
        note: "Source boundary: The deck names several protections but does not fully teach their configuration or internal operation. Detailed Port Security violation modes, sticky secure MAC configuration, DHCP Snooping rate limits, DAI validation commands, PortFast and BPDU Guard configuration, and the differences between RADIUS and TACACS+ are not fully covered in this slide deck. Treat these as additional revision topics, not as explanations supplied by this lesson.",
        question: {
            prompt: "Which technology is listed as a mitigation for ARP spoofing and ARP poisoning?",
            options: ["Dynamic ARP Inspection (DAI)", "BPDU Guard", "Port Security", "IP Source Guard (IPSG)"],
            answer: 0,
            explanation: "Correct. The Topic 1 slides map Dynamic ARP Inspection (DAI) to ARP spoofing and poisoning."
        }
    },
    {
        title: "Network Security Concepts",
        source: "INOS202 | Topic 2 | ENSA Module 3",
        sourceFile: "Topic_2_-_Network_Security_Concepts_-_ENSA_Module_3_-_Slides_Only.pptx",
        introduction: "Network security is about protecting assets and reducing the risk created by vulnerabilities, threats and exploits. This lesson introduces threat actors, common attacks, protocol weaknesses and security best practices.",
        sections: [
            {
                heading: "1. Cybersecurity foundations",
                text: "An asset is something valuable that must be protected. A vulnerability is a weakness. A threat is a possible danger that could exploit a weakness. An exploit is the method or action used to take advantage of a vulnerability. Mitigation reduces the likelihood or impact of a threat.",
                points: [
                    "Risk considers both the probability of an event and its consequences.",
                    "An attack vector is the path used to reach a target. It can originate inside or outside an organisation.",
                    "Internal threats can be especially damaging because an insider may already have legitimate access.",
                    "Data loss or theft can harm reputation, competitive advantage, customers, revenue and create legal or recovery costs.",
                    "Common data-loss paths include email and social engineering, unencrypted devices, cloud storage, removable media, printed documents and weak access controls."
                ]
            },
            {
                heading: "2. Threat actors and their tools",
                text: "Threat actors are people or groups who attempt to compromise systems. The slides classify hackers as white-hat, gray-hat and black-hat, and also identify script kiddies, vulnerability brokers, hacktivists, cybercriminals and state-sponsored actors.",
                points: [
                    "Password-cracking tools: John the Ripper and Ophcrack.",
                    "Wireless tools: Aircrack-ng and Kismet.",
                    "Network scanning tools: Nmap and SuperScan.",
                    "Packet crafting tools: Hping and Scapy.",
                    "Packet sniffers: Wireshark and Tcpdump.",
                    "Vulnerability scanners: Nessus and OpenVAS.",
                    "Exploit tools: Metasploit and Sqlmap.",
                    "Other tool categories in the slides include rootkit detectors, fuzzers, forensics tools, debuggers, encryption tools and security-focused operating systems such as Kali Linux and BackBox."
                ]
            },
            {
                heading: "3. Malware and common network attacks",
                text: "Malware is software designed to perform harmful or unwanted actions. The slides cover viruses, Trojan horses, adware, ransomware, rootkits, spyware and worms.",
                points: [
                    "A virus attaches to a host and generally requires human action to spread. Examples of types include boot-sector, firmware, macro, program and script viruses.",
                    "A worm can self-propagate without attaching itself to another program.",
                    "A Trojan disguises itself as legitimate software. The slides list types such as remote-access, data-sending, destructive, proxy, FTP, security-software-disabling, DoS and keylogger Trojans.",
                    "Ransomware encrypts or blocks access to data and demands payment.",
                    "Common network attack categories include reconnaissance, access and denial of service (DoS).",
                    "Reconnaissance may progress through information queries, ping sweeps, port scans, vulnerability scans and exploit tools.",
                    "Access attacks listed include password attacks, spoofing, trust exploitation, port redirection, man-in-the-middle attacks and buffer overflows."
                ]
            },
            {
                heading: "4. Social engineering",
                text: "Social engineering manipulates people into revealing information or allowing access. The slides list several techniques:",
                points: [
                    "Phishing: deceptive messages sent broadly to trick recipients.",
                    "Spear phishing: a targeted phishing attempt aimed at a particular person or group.",
                    "Pretexting: using a fabricated situation or identity to gain trust.",
                    "Baiting: tempting a person with something attractive to trigger an unsafe action.",
                    "Quid pro quo: offering a benefit in exchange for information or access.",
                    "Other examples include impersonation, tailgating, shoulder surfing, spam and dumpster diving.",
                    "The deck recommends user education and identity validation as protective measures."
                ]
            },
            {
                heading: "5. IP, ICMP and address-spoofing threats",
                text: "IP does not independently verify that a packet's source address is genuine. Attackers can therefore attempt IP spoofing, man-in-the-middle attacks and session hijacking. ICMP can also be misused for reconnaissance or denial of service.",
                points: [
                    "ICMP supports functions such as echo request/reply, destination unreachable, address-mask reply, redirects and router discovery.",
                    "A Smurf attack is an amplification/reflection attack: the attacker sends ICMP echo requests using the victim's address as the forged source, causing multiple hosts to send replies to the victim.",
                    "IP spoofing can be blind or non-blind, depending on whether the attacker can observe responses.",
                    "The slides also identify session hijacking as a threat involving taking over an existing communication session."
                ]
            }, {
                heading: "6. TCP vulnerabilities",
                text: "TCP is connection-oriented and provides reliable delivery, flow control and stateful communication. A TCP header is at least 20 bytes. Important control flags include ACK, RST, SYN and FIN.",
                points: [
                    "The TCP three-way handshake establishes a connection: SYN, SYN-ACK, then ACK.",
                    "A SYN flood sends many connection requests and leaves many half-open connections, consuming server resources.",
                    "A TCP reset attack sends a forged RST segment in an attempt to terminate a connection.",
                    "TCP connection termination is shown as a four-step exchange: FIN, ACK, FIN, ACK.",
                    "Session hijacking may involve spoofing an address, predicting sequence information and sending packets into a session. The slides note that an attacker may be able to send data without receiving the legitimate responses."
                ]
            },
            {
                heading: "7. UDP vulnerabilities",
                text: "UDP is connectionless and has an 8-byte header. It has lower overhead than TCP but does not provide TCP-style reliable delivery or connection establishment.",
                points: [
                    "The slides list DNS, TFTP, NFS and SNMP as services that use UDP.",
                    "UDP is also used for applications such as streaming and Voice over IP.",
                    "A UDP flood sends large volumes of UDP traffic, potentially causing systems to spend resources processing packets.",
                    "The deck describes UDP Unicorn and LOIC as tools associated with UDP flooding.",
                    "A host receiving traffic for a closed UDP port may return an ICMP port-unreachable message."
                ]
            },
            {
                heading: "8. IP services: ARP, DNS and DHCP",
                text: "Core network services can be attacked if their trust assumptions are abused.",
                points: [
                    "ARP cache poisoning uses false ARP information, including gratuitous ARP messages, to associate an attacker's MAC address with another device's IP address.",
                    "Passive ARP attacks aim to observe or steal data. Active attacks may modify or inject data.",
                    "DNS threats in the slides include open-resolver abuse, cache poisoning, amplification/reflection, resource exhaustion, fast flux, double flux, domain shadowing, domain-generation algorithms and DNS tunnelling.",
                    "DNS tunnelling carries non-DNS data inside DNS traffic. The slides suggest filtering unusually long or suspicious DNS queries.",
                    "DHCP uses DORA: Discover, Offer, Request and Acknowledge (ACK). A rogue DHCP server may respond first and provide an incorrect IP address, gateway or DNS server."
                ]
            },
            {
                heading: "9. Security best practices",
                text: "The CIA triad describes three important security goals:",
                points: [
                    "Confidentiality: prevent unauthorised disclosure. The slides give AES encryption as an example.",
                    "Integrity: protect data from unauthorised changes. The slides give SHA hashing as an example.",
                    "Availability: keep services accessible, supported by redundancy such as backup services, gateways and links.",
                    "Defense in depth uses multiple layers, including VPNs, firewalls, intrusion prevention, email and web security, AAA servers, and hardened network devices, servers and hosts.",
                    "A firewall applies rules to allow or deny traffic.",
                    "An Intrusion Detection System (IDS) analyses traffic and alerts. An Intrusion Prevention System (IPS) can operate inline and block or drop traffic.",
                    "The slides distinguish IDS, which analyses a copy of traffic, from inline IPS, which can intercept traffic before it reaches its destination."
                ]
            }
        ],
        keyPoints: [
            "Know the difference between an asset, vulnerability, threat, exploit, mitigation, risk and attack vector.",
            "Recognise common threat actors, malware families, reconnaissance, access attacks and DoS.",
            "Social engineering targets people, not only technical systems.",
            "IP spoofing, ICMP misuse, SYN floods, TCP resets, session hijacking and UDP floods target different protocol behaviours.",
            "Remember DORA for DHCP and the main ARP and DNS attack types.",
            "CIA means Confidentiality, Integrity and Availability.",
            "Defense in depth uses several security layers. IDS detects and alerts; inline IPS can block traffic."
        ],
        note: "Source boundary: This lesson follows the Topic 2 slide deck. Several attacks are named but not fully explained or mitigated in the slides, including buffer overflows, trust exploitation, port redirection, sequence-number prediction, many ARP/DHCP/TCP/UDP mitigations and detailed DNS infrastructure terms. The deck also does not teach IPsec, VPN implementation, REST, SDN, cloud computing or virtualisation in depth. These should be checked against the relevant additional lecture material.",
        question: {
            prompt: "Which statement correctly describes the difference between an IDS and an inline IPS in the supplied slides?",
            options: [
                "An IDS analyses a copy of traffic, while an inline IPS can intercept and drop traffic.",
                "An IDS encrypts traffic, while an IPS assigns IP addresses.",
                "An IDS replaces a firewall, while an IPS replaces a switch.",
                "There is no difference between an IDS and an IPS."
            ],
            answer: 0,
            explanation: "Correct. The slides describe IDS as analysing a copy of traffic and inline IPS as being able to intercept, log and drop traffic."
        }
    }
];

const INOS_LESSON_KEYS = inosLessons.map((_, index) => `inos202_lesson_${index}`);

function isInosLessonComplete(index) {
    return lessonProgress[INOS_LESSON_KEYS[index]] === true;
}

function getInosCompletedCount() {
    return inosLessons.filter((_, index) => isInosLessonComplete(index)).length;
}

let activeInosLessonIndex = null;
let currentInosQuizAnswer = null;

function ensureInosPage() {
    let page = document.getElementById("inos-page");
    if (page) return page;

    page = document.createElement("section");
    page.id = "inos-page";
    page.className = "page hidden";
    page.innerHTML = `
        <div class="section-heading">
            <div>
                <h2>INOS202 | Network Optimization and Security</h2>
                <p>Two focused lessons are available. Study the concepts, test your understanding and track completion.</p>
            </div>
        </div>
        <div id="inos-overview"></div>
        <div id="inos-workspace"></div>
    `;

    const footer = document.querySelector("main.main-content footer");
    const main = document.querySelector("main.main-content");
    if (footer) main.insertBefore(page, footer);
    else main.appendChild(page);
    return page;
}

function openInosModule() {
    ensureInosPage();
    activeInosLessonIndex = null;
    currentInosQuizAnswer = null;
    showPage("inos");
}


function renderInosOverview() {
    ensureInosPage();

    const overview = document.getElementById("inos-overview");
    const workspace = document.getElementById("inos-workspace");

    workspace.innerHTML = "";
    overview.innerHTML = "";

    // Learning progress summary
    const summary = document.createElement("div");
    summary.className = "lesson-placeholder";

    const summaryHeading = document.createElement("h3");
    summaryHeading.textContent = "Your INOS202 learning space";

    const summaryText = document.createElement("p");
    summaryText.textContent =
        `${getInosCompletedCount()} of ${inosLessons.length} lessons completed. ` +
        "Your lesson progress is saved separately from IAUT202.";

    summary.append(summaryHeading, summaryText);
    overview.appendChild(summary);

    // Two existing lessons
    inosLessons.forEach((lesson, index) => {
        const card = document.createElement("article");
        card.className = "unit-card";

        const number = document.createElement("div");
        number.className = "unit-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const info = document.createElement("div");
        info.className = "unit-info";

        const title = document.createElement("h3");
        title.textContent = lesson.title;

        const description = document.createElement("p");
        description.textContent = lesson.introduction;

        info.append(title, description);

        const source = document.createElement("span");
        source.className = "lesson-counter";
        source.textContent = lesson.source;

        const status = document.createElement("span");
        status.className = "lesson-complete-status";
        status.textContent = isInosLessonComplete(index)
            ? "Completed"
            : "Not completed";

        const open = document.createElement("button");
        open.className = "lesson-action-button primary";
        open.textContent = isInosLessonComplete(index)
            ? "Review lesson"
            : "Open lesson";

        open.addEventListener("click", () => openInosLesson(index));

        card.append(number, info, source, status, open);
        overview.appendChild(card);
    });

    // Practice Zone heading
    const practiceHeading = document.createElement("div");
    practiceHeading.className = "section-heading";
    practiceHeading.style.marginTop = "35px";

    const headingContent = document.createElement("div");

    const practiceTitle = document.createElement("h2");
    practiceTitle.textContent = "INOS202 Practice Zone";

    const practiceDescription = document.createElement("p");
    practiceDescription.textContent =
        "Test your understanding using the original interactive quizzes.";

    headingContent.append(practiceTitle, practiceDescription);
    practiceHeading.appendChild(headingContent);
    overview.appendChild(practiceHeading);

    // Original HTML quizzes
    const quizzes = [
        {
            title: "INOS202 Exam 1",
            description: "Practice examination questions.",
            file: "/inos202/quizzes/INOS202%20Exam%201.html",
            number: "01"
        },
        {
            title: "INOS202 100 Mark Test",
            description: "A full 100-mark assessment.",
            file: "/inos202/quizzes/INOS202%20%C2%B7%20100%20Mark%20Test.html",
            number: "02"
        },
        {
            title: "INOS202 T2 Network Security Quiz",
            description: "Test your knowledge of network security.",
            file: "/inos202/quizzes/INOS202%20%C2%B7%20T2%20Network%20Security%20Quiz.html",
            number: "03"
        },
        {
            title: "INOS202 Topic 8 Vault Edition",
            description: "Topic 8 revision and examination practice.",
            file: "/inos202/quizzes/INOS202%20Quiz%20%E2%80%94%20Topic%208%20(Vault%20edition).html",
            number: "04"
        }
    ];

    const quizGrid = document.createElement("div");
    quizGrid.className = "unit-grid";

    quizzes.forEach(quiz => {
        const card = document.createElement("article");
        card.className = "unit-card";

        const number = document.createElement("div");
        number.className = "unit-number";
        number.textContent = quiz.number;

        const info = document.createElement("div");
        info.className = "unit-info";

        const title = document.createElement("h3");
        title.textContent = quiz.title;

        const description = document.createElement("p");
        description.textContent = quiz.description;

        info.append(title, description);

        const launch = document.createElement("button");
        launch.className = "lesson-action-button primary";
        launch.textContent = "Start quiz";

        launch.addEventListener("click", () => {
            window.open(quiz.file, "_blank", "noopener");
        });

        card.append(number, info, launch);
        quizGrid.appendChild(card);
    });

    overview.appendChild(quizGrid);
}

function openInosLesson(index) {
    if (index < 0 || index >= inosLessons.length) return;
    activeInosLessonIndex = index;
    currentInosQuizAnswer = null;
    renderInosLesson();
}

function returnToInosOverview() {
    activeInosLessonIndex = null;
    currentInosQuizAnswer = null;
    renderInosOverview();
}

function appendFormattedText(element, text) {
    const input = String(text ?? "");
    const pattern = /<red>([\s\S]*?)<\/red>|\*\*([\s\S]*?)\*\*|\*([^*]+)\*/g;

    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(input)) !== null) {
        if (match.index > lastIndex) {
            element.appendChild(
                document.createTextNode(input.slice(lastIndex, match.index))
            );
        }

        let node;

        if (match[1] !== undefined) {
            node = document.createElement("span");
            node.className = "lesson-red";
            node.textContent = match[1];
        } else if (match[2] !== undefined) {
            node = document.createElement("strong");
            node.textContent = match[2];
        } else {
            node = document.createElement("em");
            node.textContent = match[3];
        }

        element.appendChild(node);
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < input.length) {
        element.appendChild(
            document.createTextNode(input.slice(lastIndex))
        );
    }
}


function renderInosLesson() {
    installLessonStyles();
    ensureInosPage();

    const overview = document.getElementById("inos-overview");
    const workspace = document.getElementById("inos-workspace");
    const lesson = inosLessons[activeInosLessonIndex];

    if (!lesson) {
        renderInosOverview();
        return;
    }

    overview.innerHTML = "";
    workspace.innerHTML = "";
    workspace.className = "lesson-workspace";

    const sidebar = document.createElement("aside");
    sidebar.className = "lesson-sidebar";

    const sidebarTitle = document.createElement("h3");
    sidebarTitle.textContent = "INOS202 lessons";

    const sidebarDescription = document.createElement("p");
    sidebarDescription.textContent =
        `${getInosCompletedCount()} of ${inosLessons.length} lessons completed`;

    const navList = document.createElement("div");
    navList.className = "lesson-nav-list";

    inosLessons.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "lesson-nav-button";

        if (index === activeInosLessonIndex) button.classList.add("active");
        if (isInosLessonComplete(index)) button.classList.add("completed");

        button.textContent = `${index + 1}. ${item.title}`;

        const status = document.createElement("span");
        status.textContent = isInosLessonComplete(index)
            ? "Completed"
            : "Not completed";

        button.appendChild(status);
        button.addEventListener("click", () => openInosLesson(index));
        navList.appendChild(button);
    });

    const back = document.createElement("button");
    back.className = "lesson-action-button";
    back.style.width = "100%";
    back.style.marginTop = "18px";
    back.textContent = "Back to INOS202 overview";
    back.addEventListener("click", returnToInosOverview);

    sidebar.append(sidebarTitle, sidebarDescription, navList, back);

    const content = document.createElement("article");
    content.className = "lesson-content";

    const topLine = document.createElement("div");
    topLine.className = "lesson-topline";

    const source = document.createElement("span");
    source.className = "lesson-source";
    source.textContent = lesson.source;

    const counter = document.createElement("span");
    counter.className = "lesson-counter";
    counter.textContent =
        `Lesson ${activeInosLessonIndex + 1} of ${inosLessons.length}`;

    topLine.append(source, counter);

    const title = document.createElement("h2");
    title.textContent = lesson.title;

    const introduction = document.createElement("div");
    introduction.className = "lesson-intro";
    appendFormattedText(introduction, lesson.introduction);

    content.append(topLine, title, introduction);

    lesson.sections.forEach(section => {
        const sectionElement = document.createElement("section");
        sectionElement.className = "lesson-section";

        const heading = document.createElement("h3");
        appendFormattedText(heading, section.heading);

        const paragraph = document.createElement("p");
        appendFormattedText(paragraph, section.text);

        sectionElement.append(heading, paragraph);

        if (section.points) {
            const list = document.createElement("ul");

            section.points.forEach(point => {
                const item = document.createElement("li");
                appendFormattedText(item, point);
                list.appendChild(item);
            });

            sectionElement.appendChild(list);
        }

        content.appendChild(sectionElement);
    });

    const sourceNote = document.createElement("div");
    sourceNote.className = "lesson-note";
    appendFormattedText(
        sourceNote,
        `Source file: ${lesson.sourceFile}. ${lesson.note}`
    );

    content.appendChild(sourceNote);

    const keyPoints = document.createElement("div");
    keyPoints.className = "lesson-keypoints";

    const keyHeading = document.createElement("h3");
    keyHeading.textContent = "Key points to remember";

    const keyList = document.createElement("ul");

    lesson.keyPoints.forEach(point => {
        const item = document.createElement("li");
        appendFormattedText(item, point);
        keyList.appendChild(item);
    });

    keyPoints.append(keyHeading, keyList);
    content.append(keyPoints, renderInosKnowledgeCheck(lesson));

    const actions = document.createElement("div");
    actions.className = "lesson-actions";

    const previous = document.createElement("button");
    previous.className = "lesson-action-button";
    previous.textContent = "Previous lesson";
    previous.disabled = activeInosLessonIndex === 0;
    previous.addEventListener(
        "click",
        () => openInosLesson(activeInosLessonIndex - 1)
    );

    const complete = document.createElement("button");
    complete.className = "lesson-action-button primary";
    complete.textContent = isInosLessonComplete(activeInosLessonIndex)
        ? "Lesson completed"
        : "Mark lesson complete";

    complete.disabled = isInosLessonComplete(activeInosLessonIndex);

    complete.addEventListener("click", () => {
        lessonProgress[INOS_LESSON_KEYS[activeInosLessonIndex]] = true;
        saveLessonProgress();
        renderProgress();
        updateDashboardStats();
        renderInosLesson();
    });

    const next = document.createElement("button");
    next.className = "lesson-action-button";
    next.textContent =
        activeInosLessonIndex === inosLessons.length - 1
            ? "Finish module"
            : "Next lesson";

    next.addEventListener("click", () => {
        if (activeInosLessonIndex < inosLessons.length - 1) {
            openInosLesson(activeInosLessonIndex + 1);
        } else {
            returnToInosOverview();
        }
    });

    const status = document.createElement("span");
    status.className = "lesson-complete-status";
    status.textContent = isInosLessonComplete(activeInosLessonIndex)
        ? "Completed"
        : "";

    actions.append(previous, complete, next);
    content.append(actions, status);

    workspace.append(sidebar, content);
}
 function renderInosKnowledgeCheck(lesson) {
    const quiz = document.createElement("section");
    quiz.className = "lesson-quiz";

    const heading = document.createElement("h3");
    heading.textContent = "Knowledge check";
    const question = document.createElement("p");
    question.className = "lesson-question";
    question.textContent = lesson.question.prompt;
    const options = document.createElement("div");
    options.className = "lesson-options";

    lesson.question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "lesson-option";
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;

        if (currentInosQuizAnswer !== null) {
            button.disabled = true;
            if (index === lesson.question.answer) button.classList.add("correct");
            else if (index === currentInosQuizAnswer) button.classList.add("incorrect");
        }

        button.addEventListener("click", () => {
            if (currentInosQuizAnswer !== null) return;
            currentInosQuizAnswer = index;
            const attempts = Number(localStorage.getItem("inos202-quiz-attempts") || 0);
            localStorage.setItem("inos202-quiz-attempts", String(attempts + 1));
            updateDashboardStats();
            renderInosLesson();
        });
        options.appendChild(button);
    });

    quiz.append(heading, question, options);

    if (currentInosQuizAnswer !== null) {
        const correct = currentInosQuizAnswer === lesson.question.answer;
        const feedback = document.createElement("div");
        feedback.className = `lesson-feedback ${correct ? "correct" : "incorrect"}`;
        feedback.textContent = correct ? lesson.question.explanation : `Not quite. ${lesson.question.explanation}`;
        quiz.appendChild(feedback);
    }
    return quiz;
}


/* ============================================================
   PAGE NAVIGATION
   ============================================================ */

function showPage(page) {
    const pages = {
        dashboard: "dashboard-page",
        modules: "modules-page",
        iaut: "iaut-page",
        inos: "inos-page",
        progress: "progress-page"
    };

    Object.values(pages).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.classList.add("hidden");
    });

    const target = document.getElementById(pages[page]);
    if (!target) return;

    target.classList.remove("hidden");

    const headings = {
        dashboard: "Dashboard",
        modules: "My Modules",
        iaut: "IAUT202",
        inos: "INOS202",
        progress: "My Progress"
    };

    document.getElementById("page-heading").textContent = headings[page] || "Learning Hub";

    document.querySelectorAll(".nav-link").forEach(button => {
        button.classList.toggle("active", button.dataset.page === page);
    });

    if (page === "progress") renderProgress();
    if (page === "iaut") {
        if (activeUnitIndex === null) renderUnits();
        else renderLessonWorkspace();
    }
    if (page === "inos") {
        if (activeInosLessonIndex === null) renderInosOverview();
        else renderInosLesson();
    }

    updateDashboardStats();
}

/* ============================================================
   LESSON ENGINE STYLES
   Added dynamically so the existing CSS file stays untouched.
   ============================================================ */

function installLessonStyles() {
    if (document.getElementById("lesson-engine-styles")) return;

    const style = document.createElement("style");
    style.id = "lesson-engine-styles";

    style.textContent = `
        .lesson-workspace {
            margin-top: 24px;
            display: grid;
            grid-template-columns: minmax(210px, 270px) minmax(0, 1fr);
            gap: 18px;
            align-items: start;
        }
        .lesson-sidebar, .lesson-content {
            background: #fff;
            border: 1px solid #e7ebf1;
            border-radius: 13px;
            padding: 20px;
            min-width: 0;
        }
        .lesson-sidebar h3 { margin: 0 0 6px; font-size: 15px; }
        .lesson-sidebar > p { color: #78869b; font-size: 11px; margin: 0 0 16px; }
        .lesson-nav-list { display: grid; gap: 7px; }
        .lesson-nav-button {
            width: 100%; border: 1px solid transparent; background: #f6f8fb;
            border-radius: 8px; padding: 11px; text-align: left; color: #34445a;
            font-size: 11px; line-height: 1.5; cursor: pointer;
        }
        .lesson-nav-button.active { border-color: #1688c9; background: #eaf5fc; color: #126a9e; font-weight: 700; }
        .lesson-nav-button.completed { border-color: #c8ead9; }
        .lesson-nav-button span { display: block; color: #78869b; font-size: 10px; }
        .lesson-topline { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; align-items: center; margin-bottom: 16px; }
        .lesson-source { display: inline-block; border-radius: 20px; padding: 6px 10px; background: #eaf5fc; color: #126a9e; font-size: 10px; font-weight: 800; }
        .lesson-counter { color: #78869b; font-size: 11px; }
        .lesson-content h2 { font-size: 23px; margin: 0 0 12px; color: #172338; }
        .lesson-intro { color: #53647a; line-height: 1.7; font-size: 13px; padding: 14px; background: #f5f9fc; border-left: 3px solid #1688c9; border-radius: 7px; margin-bottom: 22px; }
        .lesson-section { margin: 20px 0; }
        .lesson-section h3 { font-size: 15px; margin: 0 0 8px; }
        .lesson-section p, .lesson-section li { color: #53647a; font-size: 12px; line-height: 1.8; }
        .lesson-section ul { padding-left: 20px; }
.lesson-red {
    color: #dc2626;
    font-weight: 800;
}

.lesson-section strong,
.lesson-keypoints strong,
.lesson-quiz strong {
    color: #172338;
    font-weight: 800;
}

.lesson-section em,
.lesson-keypoints em,
.lesson-quiz em {
    color: #52647a;
    font-style: italic;
}
        .lesson-keypoints { background: #f3f8fc; border: 1px solid #e0edf6; border-radius: 10px; padding: 15px; margin-top: 24px; }
        .lesson-keypoints h3 { margin: 0 0 8px; font-size: 14px; }
        .lesson-keypoints li { font-size: 12px; color: #53647a; line-height: 1.7; margin: 5px 0; }
        .lesson-quiz { border: 1px solid #e7ebf1; border-radius: 11px; padding: 17px; margin-top: 22px; }
        .lesson-quiz h3 { margin: 0 0 12px; font-size: 15px; }
        .lesson-question { font-size: 13px; font-weight: 700; line-height: 1.6; }
        .lesson-options { display: grid; gap: 8px; margin-top: 13px; }
        .lesson-option { text-align: left; border: 1px solid #e1e7ee; background: #fff; border-radius: 8px; padding: 11px; color: #34445a; font-size: 12px; cursor: pointer; }
        .lesson-option:hover:not(:disabled) { border-color: #1688c9; background: #f6fbff; }
        .lesson-option:disabled { cursor: default; opacity: 1; }
        .lesson-option.correct { border-color: #2aaf78; background: #eaf8f1; }
        .lesson-option.incorrect { border-color: #d77b7b; background: #fff1f1; }
        .lesson-feedback { margin-top: 12px; padding: 11px; border-radius: 8px; font-size: 12px; line-height: 1.6; }
        .lesson-feedback.correct { color: #176b49; background: #eaf8f1; }
        .lesson-feedback.incorrect { color: #9a3f3f; background: #fff1f1; }
        .lesson-actions { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; margin-top: 22px; padding-top: 16px; border-top: 1px solid #e7ebf1; }
        .lesson-action-button { border: 0; border-radius: 8px; padding: 11px 14px; background: #eaf5fc; color: #126a9e; font-size: 11px; font-weight: 700; cursor: pointer; }
        .lesson-action-button.primary { background: #1688c9; color: white; }
        .lesson-action-button:disabled { opacity: .45; cursor: not-allowed; }
        .lesson-complete-status { color: #16885c; font-size: 11px; font-weight: 700; }
        .lesson-note { border: 1px solid #f0dfb5; background: #fff9e9; color: #76591d; padding: 12px 14px; border-radius: 8px; margin: 16px 0; font-size: 11px; line-height: 1.65; }
        .lesson-placeholder { background: #fff; border: 1px solid #e7ebf1; border-radius: 12px; padding: 22px; margin-top: 15px; }
        .lesson-placeholder p { color: #78869b; font-size: 12px; line-height: 1.7; }
        @media (max-width: 760px) {
            .lesson-workspace { grid-template-columns: 1fr; }
            .lesson-nav-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .lesson-content h2 { font-size: 20px; }
        }
        @media (max-width: 420px) { .lesson-nav-list { grid-template-columns: 1fr; } }
    `;

    document.head.appendChild(style);
}

/* ============================================================
   LESSON WORKSPACE
   ============================================================ */

let activeUnitIndex = null;
let activeLessonIndex = 0;
let currentQuizAnswer = null;

function getLessonWorkspace() {
    let workspace = document.getElementById("lesson-workspace");

    if (!workspace) {
        workspace = document.createElement("div");
        workspace.id = "lesson-workspace";
        workspace.className = "lesson-workspace";

        const unitList = document.getElementById("unit-list");
        unitList.parentNode.insertBefore(workspace, unitList);
    }

    return workspace;
}

function hideUnitSections() {
    const unitList = document.getElementById("unit-list");
    if (!unitList) return;

    const unitHeading = unitList.previousElementSibling;
    const resourceHeading = document.querySelector(".resource-heading");
    const resourceGrid = document.querySelector(".resource-grid");

    unitList.classList.add("hidden");
    if (unitHeading) unitHeading.classList.add("hidden");
    if (resourceHeading) resourceHeading.classList.add("hidden");
    if (resourceGrid) resourceGrid.classList.add("hidden");
}

function showUnitSections() {
    const unitList = document.getElementById("unit-list");
    if (!unitList) return;

    const unitHeading = unitList.previousElementSibling;
    const resourceHeading = document.querySelector(".resource-heading");
    const resourceGrid = document.querySelector(".resource-grid");

    unitList.classList.remove("hidden");
    if (unitHeading) unitHeading.classList.remove("hidden");
    if (resourceHeading) resourceHeading.classList.remove("hidden");
    if (resourceGrid) resourceGrid.classList.remove("hidden");

    const workspace = document.getElementById("lesson-workspace");
    if (workspace) workspace.remove();

    activeUnitIndex = null;
    currentQuizAnswer = null;
}

function openUnit(unitIndex) {
    const unitLessons = getLessonsForUnit(unitIndex);
    if (!unitLessons.length) return;

    activeUnitIndex = unitIndex;
    activeLessonIndex = 0;
    currentQuizAnswer = null; hideUnitSections();
    renderLessonWorkspace();
}

function returnToUnitList() {
    showUnitSections();
    renderUnits();
}

function renderLessonWorkspace() {
    installLessonStyles();

    const unitLessons = getLessonsForUnit(activeUnitIndex);
    if (!unitLessons.length) return;

    if (activeLessonIndex < 0) activeLessonIndex = 0;
    if (activeLessonIndex >= unitLessons.length) activeLessonIndex = unitLessons.length - 1;

    const workspace = getLessonWorkspace();
    const lesson = unitLessons[activeLessonIndex];
    const unitNumber = activeUnitIndex + 1;

    workspace.innerHTML = "";

    const sidebar = document.createElement("aside");
    sidebar.className = "lesson-sidebar";

    const sidebarTitle = document.createElement("h3");
    sidebarTitle.textContent = `Unit ${unitNumber} lessons`;

    const sidebarDescription = document.createElement("p");
    sidebarDescription.textContent =
        `${getCompletedLessonCount(activeUnitIndex)} of ${unitLessons.length} lessons completed`;

    const navList = document.createElement("div");
    navList.className = "lesson-nav-list";

    unitLessons.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "lesson-nav-button";

        if (index === activeLessonIndex) button.classList.add("active");
        if (isLessonComplete(activeUnitIndex, index)) button.classList.add("completed");

        const status = isLessonComplete(activeUnitIndex, index) ? "Completed" : "Not completed";
        button.textContent = `${index + 1}. ${item.title}`;

        const statusLabel = document.createElement("span");
        statusLabel.textContent = status;
        button.appendChild(statusLabel);

        button.addEventListener("click", () => {
            activeLessonIndex = index;
            currentQuizAnswer = null;
            renderLessonWorkspace();
        });

        navList.appendChild(button);
    });

    const backButton = document.createElement("button");
    backButton.className = "lesson-action-button";
    backButton.style.width = "100%";
    backButton.style.marginTop = "18px";
    backButton.textContent = "Back to all units";
    backButton.addEventListener("click", returnToUnitList);

    sidebar.append(sidebarTitle, sidebarDescription, navList, backButton);

    const content = document.createElement("article");
    content.className = "lesson-content";

    const topLine = document.createElement("div");
    topLine.className = "lesson-topline";

    const source = document.createElement("span");
    source.className = "lesson-source";
    source.textContent = lesson.source;

    const counter = document.createElement("span");
    counter.className = "lesson-counter";
    counter.textContent = `Unit ${unitNumber} • Lesson ${activeLessonIndex + 1} of ${unitLessons.length}`;

    topLine.append(source, counter);

    const title = document.createElement("h2");
    title.textContent = lesson.title;

    const introduction = document.createElement("div");
    introduction.className = "lesson-intro";
    introduction.textContent = lesson.introduction;

    content.append(topLine, title, introduction);

    lesson.sections.forEach(section => {
        const sectionElement = document.createElement("section");
        sectionElement.className = "lesson-section";

        const heading = document.createElement("h3");
        heading.textContent = section.heading;

        const paragraph = document.createElement("p");
        paragraph.textContent = section.text;

        sectionElement.append(heading, paragraph);

        if (section.points) {
            const list = document.createElement("ul");
            section.points.forEach(point => {
                const item = document.createElement("li");
                item.textContent = point;
                list.appendChild(item);
            });
            sectionElement.appendChild(list);
        }

        content.appendChild(sectionElement);
    });

    if (activeUnitIndex === 1) {
        const note = document.createElement("div");
        note.className = "lesson-note";
        note.textContent = "Source note: Content is based on Claude's IAUT202 Unit 2 Content Report (22 November 2026). Where the report identifies a lecture-slide gap, this lesson labels it rather than filling it with an unsupported definition.";
        content.appendChild(note);
    }

    const keyPoints = document.createElement("div");
    keyPoints.className = "lesson-keypoints";

    const keyHeading = document.createElement("h3");
    keyHeading.textContent = "Key points to remember";

    const keyList = document.createElement("ul");
    lesson.keyPoints.forEach(point => {
        const item = document.createElement("li");
        item.textContent = point;
        keyList.appendChild(item);
    });

    keyPoints.append(keyHeading, keyList);
    content.appendChild(keyPoints);
    content.appendChild(renderKnowledgeCheck(lesson));

    const actions = document.createElement("div");
    actions.className = "lesson-actions";

    const previousButton = document.createElement("button");
    previousButton.className = "lesson-action-button";
    previousButton.textContent = "Previous lesson";
    previousButton.disabled = activeLessonIndex === 0;

    previousButton.addEventListener("click", () => {
        if (activeLessonIndex > 0) {
            activeLessonIndex--;
            currentQuizAnswer = null;
            renderLessonWorkspace();
        }
    });

    const completeButton = document.createElement("button");
    completeButton.className = "lesson-action-button primary";
    completeButton.textContent = isLessonComplete(activeUnitIndex, activeLessonIndex)
        ? "Lesson completed"
        : "Mark lesson complete";
    completeButton.disabled = isLessonComplete(activeUnitIndex, activeLessonIndex);

    completeButton.addEventListener("click", () => {
        const key = getLessonProgressKey(activeUnitIndex, activeLessonIndex);
        lessonProgress[key] = true;
        saveLessonProgress();

        if (isUnitLessonEngineComplete(activeUnitIndex)) {
            progress[activeUnitIndex] = true;
            saveProgress();
        }

        updateDashboardStats();
        renderProgress();
        renderLessonWorkspace();
    });

    const nextButton = document.createElement("button");
    nextButton.className = "lesson-action-button";
    nextButton.textContent = activeLessonIndex === unitLessons.length - 1 ? "Finish unit" : "Next lesson";

    nextButton.addEventListener("click", () => {
        if (activeLessonIndex < unitLessons.length - 1) {
            activeLessonIndex++;
            currentQuizAnswer = null;
            renderLessonWorkspace();
        } else {
            returnToUnitList();
        }
    });

    const completedStatus = document.createElement("span");
    completedStatus.className = "lesson-complete-status";
    completedStatus.textContent = isLessonComplete(activeUnitIndex, activeLessonIndex) ? "Completed" : "";

    actions.append(previousButton, completeButton, nextButton);
    content.append(actions, completedStatus);
    workspace.append(sidebar, content);
}

function renderKnowledgeCheck(lesson) {
    const quiz = document.createElement("section");
    quiz.className = "lesson-quiz";

    const heading = document.createElement("h3");
    heading.textContent = "Knowledge check";

    const question = document.createElement("p");
    question.className = "lesson-question";
    question.textContent = lesson.question.prompt;

    const options = document.createElement("div");
    options.className = "lesson-options";

    lesson.question.options.forEach((option, index) => {
        const button = document.createElement("button"); button.className = "lesson-option";
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;

        if (currentQuizAnswer !== null) {
            button.disabled = true;
            if (index === lesson.question.answer) button.classList.add("correct");
            else if (index === currentQuizAnswer) button.classList.add("incorrect");
        }

        button.addEventListener("click", () => {
            if (currentQuizAnswer !== null) return;

            currentQuizAnswer = index;
            const attempts = Number(localStorage.getItem("iaut202-quiz-attempts") || 0);

            localStorage.setItem("iaut202-quiz-attempts", String(attempts + 1));
            updateDashboardStats();
            renderLessonWorkspace();
        });

        options.appendChild(button);
    });

    quiz.append(heading, question, options);

    if (currentQuizAnswer !== null) {
        const correct = currentQuizAnswer === lesson.question.answer;
        const feedback = document.createElement("div");
        feedback.className = `lesson-feedback ${correct ? "correct" : "incorrect"}`;
        feedback.textContent = correct
            ? lesson.question.explanation
            : `Not quite. ${lesson.question.explanation}`;
        quiz.appendChild(feedback);
    }

    return quiz;
}

/* ============================================================
   UNIT LIST
   ============================================================ */

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
        article.append(number, info);

        const unitLessons = getLessonsForUnit(index);

        if (unitLessons.length) {
            const openButton = document.createElement("button");
            openButton.className = "lesson-action-button primary";
            openButton.textContent = "Open lessons";
            openButton.addEventListener("click", () => openUnit(index));
            article.appendChild(openButton);

            const completed = document.createElement("span");
            completed.className = "lesson-complete-status";
            completed.textContent = `${getCompletedLessonCount(index)}/${unitLessons.length} lessons`;
            article.appendChild(completed);
        } else {
            const placeholder = document.createElement("span");
            placeholder.className = "lesson-counter";
            placeholder.textContent = "Content coming soon";
            article.appendChild(placeholder);
        }

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

        article.appendChild(checkbox);
        container.appendChild(article);
    });
}

/* ============================================================
   MODULES
   ============================================================ */

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
            : code === "INOS202"
                ? "Two lessons covering LAN security concepts and network security concepts."
                : "This module workspace will be added in a future release.";

        card.append(top, title, description);

        if (code === "IAUT202" || code === "INOS202") {
            const open = document.createElement("button");
            open.className = "primary-button";
            open.textContent = "Open module ->";
            open.addEventListener("click", () => {
                if (code === "IAUT202") showPage("iaut");
                else openInosModule();
            });
            card.appendChild(open);
        }

        container.appendChild(card);
    });
}

/* ============================================================
   PROGRESS
   ============================================================ */

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
        const unitLessons = getLessonsForUnit(index);

        if (unitLessons.length) {
            status.textContent = `${getCompletedLessonCount(index)}/${unitLessons.length} lessons`;
        } else {
            status.textContent = progress[index] === true ? "Completed" : "Not completed";
        }

        row.append(name, status);
        container.appendChild(row);
    });

    const inosPanel = document.createElement("div");
    inosPanel.className = "progress-row";
    const inosName = document.createElement("span");
    inosName.textContent = "INOS202 | Network Optimization and Security";
    const inosStatus = document.createElement("span");
    inosStatus.textContent = `${getInosCompletedCount()}/${inosLessons.length} lessons completed`;
    inosPanel.append(inosName, inosStatus);
    container.appendChild(inosPanel);
}

function updateDashboardStats() {
    document.getElementById("completed-count").textContent = completedCount();

    const attempts = Number(localStorage.getItem("iaut202-quiz-attempts") || 0);
    document.getElementById("saved-score").textContent = attempts;
}

/* ============================================================
   INITIALISE APPLICATION
   ============================================================ */

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