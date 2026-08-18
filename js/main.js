/*
 * Main JS File
 * Called by script tag in index.html
 */

console.log("Dhruv's Workshop loaded.");

/* Static portfolio data */
const sectionContent = {
    about: {
        kicker: "Profile",
        title: "About",
        intro:
            "I'm a Computer Science and Artificial Intelligence student at Purdue who likes building software where ambitious engineering meets real human problems.",

        items: [
            {
                eyebrow: "Focus",
                title: "Software · AI · Systems",
                meta: "Purdue University",
                description:
                    "My interests span software engineering, machine learning, systems, information retrieval, and human-centered applications of AI."
            },

            {
                eyebrow: "Current",
                title: "Building and learning",
                meta: "2026",
                description:
                    "I'm currently continuing my work at Johns Hopkins APL, building CravingChef, developing a RISC-V virtual machine from first principles, and exploring machine learning and robotics."
            }
        ],

        actions: []
    },

    experience: {
        kicker: "Field Work",
        title: "Experience",
        intro:
            "I've worked across applied AI, search and information retrieval, platform engineering, and product development.",

        items: [
            {
                eyebrow:
                    "Johns Hopkins Applied Physics Laboratory",

                title:
                    "Software Engineering Intern",

                meta:
                    "May 2026 – Present",

                description:
                    "Human-machine engineering work spanning an MCP-based AI information-retrieval system, offline document search, citation-backed ticket automation, testing, and geospatial tooling."
            },

            {
                eyebrow:
                    "CravingChef",

                title:
                    "Co-Founder & Platform Lead Engineer",

                meta:
                    "Nov. 2025 – Present",

                description:
                    "Leading backend and platform development for a mobile recipe product, including APIs, content ingestion, analytics, AI recommendations, Redis caching, and Firestore-backed workflows."
            },

            {
                eyebrow:
                    "Software Developers Inc.",

                title:
                    "Software Engineering Intern",

                meta:
                    "May 2025 – Aug. 2025",

                description:
                    "Built proof-of-concept agentic AI workflows and tools that transformed interface mockups into working database-backed applications."
            }
        ],

        actions: []
    },

    projects: {
        kicker: "Project Systems",
        title: "Projects",
        intro:
            "I learn best by building things that are slightly more ambitious than I initially know how to build.",

        items: [
            {
                eyebrow:
                    "Systems",

                title:
                    "RISC-V Virtual Machine",

                meta:
                    "C17 · RV32I · Linux/Unix",

                description:
                    "A learn-while-building systems project progressing from first principles toward RV32I execution and, eventually, Linux boot."
            },

            {
                eyebrow:
                    "AI Career Tools",

                title:
                    "Applihero",

                meta:
                    "Next.js · TypeScript · PostgreSQL · RAG",

                description:
                    "A full-stack career-coaching application using persistent data, vector embeddings, semantic retrieval, and human-in-the-loop review."
            },

            {
                eyebrow:
                    "Education",

                title:
                    "CourseMate",

                meta:
                    "Next.js · PostgreSQL · AWS",

                description:
                    "A course-management proof of concept combining planning, progress tracking, calendar workflows, and RAG-based micro-learning."
            }
        ],

        actions: []
    },

    "side-quests": {
        kicker: "Side Quests",
        title: "Outside the Terminal",
        intro:
            "A suspicious amount of my free time also involves trying to get better at activities that are difficult to get good at.",

        items: [
            {
                eyebrow:
                    "Leadership",

                title:
                    "Purdue Squash Club",

                meta:
                    "President & Founding Member",

                description:
                    "I helped build the club to more than 100 members and captain our competitive team at CSA Club Team Nationals."
            },

            {
                eyebrow:
                    "Currently grinding",

                title:
                    "Squash · Climbing · Running",

                meta:
                    "Usually unnecessarily competitive",

                description:
                    "When I'm away from a computer, there's a good chance I'm on a squash court, climbing wall, or trying to convince myself a run was a good idea."
            }
        ],

        actions: []
    },

    resume: {
        kicker: "Personnel File",
        title: "Resume",
        intro:
            "The compact version of the Workshop: experience, projects, education, leadership, and technical skills in one page.",

        items: [],

        actions: [
            {
                label: "View resume (Last updated August 16, 2026)",
                href:
                    "assets/Dhruv_Nemani_Resume_Fall_2026.pdf",
                external: true
            }
        ]
    },

    contact: {
        kicker: "Communications",
        title: "Contact",
        intro:
            "Want to talk about software, AI, systems, startups, research, squash, football (both kinds), or something completely unrelated? Feel free to reach out via email or LinkedIn, or check out my GitHub for some of my work.",

        items: [],

        actions: [
            {
                label: "Email me",
                href:
                    "mailto:dhruvnemani@gmail.com",
                external: false
            },

            {
                label: "LinkedIn",
                href:
                    "https://linkedin.com/in/dhruv-nemani",
                external: true
            },

            {
                label: "GitHub",
                href:
                    "https://github.com/Dnemni",
                external: true
            }
        ]
    },
};

/* Define application state */
const state = {
    curiosity: 0,
    activeSection: null,
    exploredSections: []
};

/* Define the constant reward for exploring a new section */
const explorationReward = 25;

/* Define the milestones for the Workshop based on exploration and curiosity thresholds */
const milestoneDefinitions = [
    {
        id: "first-signal",

        label:
            "First Signal",

        description:
            "Explore your first Workshop system.",

        /* Define function to check if the milestone is unlocked based on the number of explored sections */
        isUnlocked:
            (currentState) =>
                currentState
                    .exploredSections
                    .length >= 1
    },

    {
        id: "network-forming",

        label:
            "Network Forming",

        description:
            "Explore three Workshop systems.",

        isUnlocked:
            (currentState) =>
                currentState
                    .exploredSections
                    .length >= 3
    },

    {
        id: "full-survey",

        label:
            "Full Survey",

        description:
            "Explore every Workshop system.",

        isUnlocked:
            (currentState) =>
                currentState
                    .exploredSections
                    .length >= 6
    },

    {
        id: "power-reserve",

        label:
            "Power Reserve",

        description:
            "Reach 100 curiosity.",

        isUnlocked:
            (currentState) =>
                currentState
                    .curiosity >= 100
    },

    {
        id: "overclocked",

        label:
            "Overclocked",

        description:
            "Reach 250 curiosity.",

        isUnlocked:
            (currentState) =>
                currentState
                    .curiosity >= 250
    }
];

/* Define the workshop stages based on curiosity thresholds */
const workshopStages = [
    {
        id: "standby",
        label: "Standby",
        minCuriosity: 0
    },

    {
        id: "signal",
        label: "Signal Acquired",
        minCuriosity: 25
    },

    {
        id: "warming",
        label: "Systems Warming",
        minCuriosity: 75
    },

    {
        id: "online",
        label: "Workshop Online",
        minCuriosity: 150
    },

    {
        id: "overclocked",
        label: "Overclocked",
        minCuriosity: 250
    }
];

/* Get the current workshop stage based on the curiosity value */
function getWorkshopStage() {
    let currentStage =
        workshopStages[0];

    /* Iterate through the workshop stages and update the current stage based on the curiosity value */
    workshopStages.forEach((stage) => {
        if (
            state.curiosity
            >= stage.minCuriosity
        ) {
            currentStage = stage;
        }
    });

    return currentStage;
}

/* Get the next workshop stage based on the current stage */
function getNextWorkshopStage(currentStage) {
    const currentIndex = workshopStages.indexOf(currentStage);

    return (workshopStages[currentIndex + 1] ?? null);
}

/* Get the progress percentage between the current and next workshop stages based on the curiosity value */
function getWorkshopStageProgress(currentStage, nextStage) {
    if (nextStage === null) {
        return 100;
    }

    const stageRange = nextStage.minCuriosity - currentStage.minCuriosity;

    const stageProgress = state.curiosity - currentStage.minCuriosity;

    const percentage = (stageProgress / stageRange) * 100;

    return Math.min(100, Math.max(0, percentage));
}

/* Define the key used for storing progress in localStorage */
const STORAGE_KEY = "dhruv-workshop-progress-v1";

/* Save persistent Workshop progress to localStorage */
function saveProgress() {
    /* Create a progress object containing the current curiosity and explored sections only from the state */
    const progress = {
        curiosity:
            state.curiosity,

        exploredSections:
            state.exploredSections
    };

    /* Save the serialized progress (JSON text representation of the progress object) to localStorage */
    const serializedProgress =
        JSON.stringify(progress);

    localStorage.setItem(
        STORAGE_KEY,
        serializedProgress
    );
}

/* Load progress from localStorage if it exists */
function loadProgress() {
    /* Retrieve the saved progress from localStorage via the STORAGE_KEY */
    const savedProgress =
        localStorage.getItem(
            STORAGE_KEY
        );

    /* If there is no saved progress, do nothing */
    if (savedProgress === null) {
        return;
    }

    /* Attempt to parse and load the saved progress */
    try {
        const parsedProgress =
            JSON.parse(savedProgress);

        /* Validate and load the curiosity value from the parsed progress */
        if (
            Number.isFinite(parsedProgress.curiosity)
            && parsedProgress.curiosity >= 0
        ) {
            state.curiosity =
                parsedProgress.curiosity;
        }

        /* Validate and load the explored sections array from the parsed progress */
        if (
            Array.isArray(
                parsedProgress.exploredSections
            )
        ) {
            state.exploredSections =
                parsedProgress.exploredSections.filter(
                    (sectionId) =>
                        sectionContent[sectionId]
                        !== undefined
                );
        }
    } catch (error) {
        /* If an error occurs while parsing or loading, log a warning and remove the corrupted progress */
        console.warn(
            "Saved Workshop progress could not be loaded.",
            error
        );

        localStorage.removeItem(
            STORAGE_KEY
        );
    }
}

/* Reference the browser elements by querying the DOM */
const elements = {
    /* document represents current webpage and query selects css selectors */
    core: document.querySelector(".workshop-core"),

    curiosityCount:
        document.querySelector("#curiosity-count"),

    siteStatus:
        document.querySelector(".site-status"),

    worldEmpty:
        document.querySelector("[data-world-empty]"),

    worldDetail:
        document.querySelector("[data-world-detail]"),

    detailKicker:
        document.querySelector("[data-detail-kicker]"),

    detailTitle:
        document.querySelector("[data-detail-title]"),

    detailIntro:
        document.querySelector("[data-detail-intro]"),

    detailItems:
        document.querySelector("[data-detail-items]"),

    detailActions:
        document.querySelector("[data-detail-actions]"),

    resetProgress:
        document.querySelector("[data-reset-progress]"),

    workshopStageLabel:
        document.querySelector("[data-workshop-stage-label]"),

    workshopMeter:
        document.querySelector("[data-workshop-meter]"),

    workshopNext:
        document.querySelector("[data-workshop-next]"),

    milestoneList:
        document.querySelector("[data-milestone-list]"),

    milestoneCount:
        document.querySelector("[data-milestone-count]"),

    /* querySelector returns first matching element while querySelectorAll returns all matching elements */
    exploreButtons:
        document.querySelectorAll("[data-section]"),
    
    stations:
    document.querySelectorAll("[data-station]")
};

/* Render the application state to the DOM */
function render() {
    renderCuriosity();
    renderWorkshopProgression();
    renderWorld();
    renderExploreButtons();
    renderStations();
    renderSystemStatus();
    renderMilestones();
}

/* Render the curiosity count to the DOM */
function renderCuriosity() {
    /* Sets DOM text content to the current curiosity value contained in state */
    elements.curiosityCount.textContent =
        state.curiosity;
}

/* Render the world view to the DOM */
function renderWorld() {
    /* If no section is active, show the empty state */
    if (state.activeSection === null) {
        elements.worldEmpty.hidden = false;
        elements.worldDetail.hidden = true;

        return;
    }

    /* If a section is active, show the detail view */
    const content =
        sectionContent[state.activeSection];

    elements.worldEmpty.hidden = true;
    elements.worldDetail.hidden = false;

    elements.detailKicker.textContent =
        content.kicker;

    elements.detailTitle.textContent =
        content.title;

    elements.detailIntro.textContent =
        content.intro;

    /* Render the detail items for the active section */
    renderDetailItems(
        content.items
    );

    /* Render the detail actions for the active section */
    renderDetailActions(
        content.actions
    );
}

/* Render the explore buttons to the DOM */
function renderExploreButtons() {
    /* For each explore button, set the active and explored states based on the application state */
    elements.exploreButtons.forEach((button) => {
        const sectionId =
            button.dataset.section; /* Access the data-section attribute of the button */

        const isActive =
            sectionId === state.activeSection; /* Check if the button's sectionId matches the activeSection in state */

        const isExplored =
            state.exploredSections.includes(sectionId); /* Check if the button's sectionId is in the exploredSections array in state */

        /* Toggle the active and explored classes on the button */
        button.classList.toggle(
            "is-active",
            isActive
        );

        /* Toggle the explored class on the button */
        button.classList.toggle(
            "is-explored",
            isExplored
        );
    });
}

/* Render the system status to the DOM */
function renderSystemStatus() {
    const exploredCount =
        state.exploredSections.length;

    const totalSections =
        elements.exploreButtons.length;

    /* If no sections have been explored, show the early development status */
    if (exploredCount === 0) {
        elements.siteStatus.textContent =
            "System status: early development";

        return;
    }

    /* Update the site status text content to show the number of explored sections out of the total sections */
    elements.siteStatus.textContent =
        `System status: ${exploredCount}/${totalSections} areas explored`;
}

/* Handle a click on the core button to increment the curiosity count by 1 */
function handleCoreClick() {
    state.curiosity += 1;

    /* Save the updated progress to localStorage */
    saveProgress();

    /* Rerender the updated state to the DOM */
    render();
}

/* Calls the handleCoreClick function when the core button is clicked */
elements.core.addEventListener(
    "click",
    handleCoreClick
);

/* Handle a click on an explore button to select the corresponding section */
function selectSection(sectionId) {
    state.activeSection = sectionId;

    const alreadyExplored =
        state.exploredSections.includes(sectionId);

    if (!alreadyExplored) {
        state.exploredSections.push(sectionId);

        /* Increment the curiosity count by the exploration reward when a new section is explored */
        state.curiosity += explorationReward;

        /* Save the updated progress to localStorage */
        saveProgress();
    }

    /* Rerender the updated state to the DOM */
    render();
}

/* Add click event listeners to each explore button to select the corresponding section when clicked */
elements.exploreButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const sectionId =
            button.dataset.section;

        selectSection(sectionId);
    });
});

/* Add click event listeners to each station element to select the corresponding section when clicked */
elements.stations.forEach(
    (station) => {
        station.addEventListener(
            "click",
            () => {
                const sectionId =
                    station.dataset.station;

                selectSection(
                    sectionId
                );
            }
        );
    }
);

/* Render the workshop stations to the DOM */
function renderStations() {
    elements.stations.forEach((station) => {
        const sectionId =
            station.dataset.station;

        /* Check if the station is online (explored) and if it is the active station */
        const isOnline =
            state.exploredSections.includes(sectionId);
        const isActive =
            state.activeSection === sectionId;

        station.classList.toggle(
            "is-online",
            isOnline
        );

        station.classList.toggle(
            "is-active",
            isActive
        );

        /* Update the station status text content to show whether the station is online or offline */
        const status =
            station.querySelector(
                "[data-station-status]"
            );

        status.textContent =
            isOnline ? "Online" : "Offline";
    });
}

/* Render the detail items for the active section to the DOM */
function renderDetailItems(items) {
    /* Clear the existing detail items before rendering new ones */
    elements.detailItems.replaceChildren();

    /* Start with empty container and populate it for each item */
    items.forEach((item) => {
        const itemElement =
            document.createElement("section");

        itemElement.classList.add(
            "detail-item"
        );

        /* Create and populate the eyebrow element for the item */
        const eyebrow =
            document.createElement("p");

        eyebrow.classList.add(
            "detail-item-eyebrow"
        );

        eyebrow.textContent =
            item.eyebrow;

        /* Create and populate the heading element for the item */
        const title =
            document.createElement("h4");
        
        title.textContent =
            item.title;

        /* Create and populate the meta element for the item */
        const meta =
            document.createElement("p");

        meta.classList.add(
            "detail-item-meta"
        );

        meta.textContent =
            item.meta;

        /* Create and populate the description element for the item */
        const description =
            document.createElement("p");

        description.classList.add(
            "detail-item-description"
        );

        description.textContent =
            item.description;

        /* Append children to the corresponding section */
        itemElement.append(
            eyebrow,
            title,
            meta,
            description
        );

        /* Append the populated item element to the detail items container */
        elements.detailItems.append(
            itemElement
        );
    });
}

/* Render the detail actions for the active section to the DOM */
function renderDetailActions(actions) {
    /* Clear the existing detail actions before rendering new ones */
    elements.detailActions.replaceChildren();

    actions.forEach((action) => {
        /* Create a link element for each action */
        const link =
            document.createElement("a");

        link.classList.add(
            "detail-action"
        );

        /* Set the text content of the link to the action's label */
        link.textContent =
            action.label;

        /* Set the href attribute of the link to the action's href */
        link.href =
            action.href;

        if (action.external) {
            link.target = "_blank"; // Open external links in a new tab
            link.rel =
                "noopener noreferrer"; // Security best practice for external links
        }

        elements.detailActions.append(
            link
        );
    });
}

/* Render the workshop progression to the DOM */
function renderWorkshopProgression() {
    const currentStage = getWorkshopStage();

    const nextStage =
        getNextWorkshopStage(
            currentStage
        );

    const progress =
        getWorkshopStageProgress(
            currentStage,
            nextStage
        );

    elements.workshopStageLabel
        .textContent =
            currentStage.label;

    elements.workshopMeter.value =
        progress;

    document.body.dataset.workshopStage =
        currentStage.id;

    if (nextStage === null) {
        elements.workshopNext.textContent =
            "Maximum stable output reached.";

        return;
    }

    const curiosityRemaining =
        nextStage.minCuriosity
        - state.curiosity;

    elements.workshopNext.textContent =
        `${curiosityRemaining} curiosity to ${nextStage.label}`;
}

/* Render the milestones to the DOM */
function renderMilestones() {
    /* Clear the existing milestone list before rendering new milestones */
    elements.milestoneList.replaceChildren();

    let unlockedCount = 0;

    /* Iterate through each milestone definition and render its status based on the current application state */
    milestoneDefinitions.forEach(
        (milestone) => {

            const isUnlocked =
                milestone.isUnlocked(
                    state
                );

            if (isUnlocked) {
                unlockedCount += 1;
            }

            const milestoneElement =
                document.createElement(
                    "div"
                );

            milestoneElement
                .classList
                .add("milestone");

            milestoneElement
                .classList
                .toggle(
                    "is-unlocked",
                    isUnlocked
                );

            const label =
                document.createElement(
                    "p"
                );

            label.classList.add(
                "milestone-label"
            );

            label.textContent =
                milestone.label;

            const description =
                document.createElement(
                    "p"
                );

            description.classList.add(
                "milestone-description"
            );

            description.textContent =
                milestone.description;

            const status =
                document.createElement(
                    "span"
                );

            status.classList.add(
                "milestone-status"
            );

            status.textContent =
                isUnlocked
                    ? "Unlocked"
                    : "Locked";

            milestoneElement.append(
                label,
                description,
                status
            );

            elements.milestoneList
                .append(
                    milestoneElement
                );
        }
    );

    /* Update the milestone count text content to show the number of unlocked milestones out of the total milestones */
    elements.milestoneCount.textContent =
        `${unlockedCount}/${milestoneDefinitions.length}`;
}

/* Reset the workshop progress to empty state and clear localStorage */
function resetProgress() {
    /* Reset the runtime reality */
    state.curiosity = 0;
    state.activeSection = null;
    state.exploredSections = [];

    /* Remove the saved progress from localStorage */
    localStorage.removeItem(
        STORAGE_KEY
    );

    /* Rerender the application state to the DOM after resetting progress */
    render();
}

/* Handle a click on the reset progress button to clear and rerender Workshop progress */
elements.resetProgress.addEventListener(
    "click",
    resetProgress
);

const progressModal = document.querySelector("#progress-modal");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

function closeProgressModal() {
    progressModal.remove();
}

modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeProgressModal);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && progressModal) {
        closeProgressModal();
    }
});

/* Load the saved progress from localStorage when the application starts */
loadProgress();

/* Initial render of the application state to the DOM */
render();