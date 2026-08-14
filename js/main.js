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
        body:
            "I'm a Computer Science and Artificial Intelligence student at Purdue interested in software engineering, AI, systems, and building products."
    },

    experience: {
        kicker: "Field Work",
        title: "Experience",
        body:
            "My experience spans human-machine engineering at Johns Hopkins APL, platform engineering for CravingChef, and software engineering work at Software Developers Inc."
    },

    projects: {
        kicker: "Project Systems",
        title: "Projects",
        body:
            "Current and previous projects include a RISC-V virtual machine, Applihero, and CourseMate, alongside whatever side project has distracted me this week."
    },

    "side-quests": {
        kicker: "Side Quests",
        title: "Outside the Terminal",
        body:
            "Outside software, I lead the Purdue Squash Club and spend time playing squash, climbing, running, and finding new things to get unnecessarily competitive about."
    },

    resume: {
        kicker: "Personnel File",
        title: "Resume",
        body:
            "A concise record of my experience, projects, education, leadership, and technical work."
    },

    contact: {
        kicker: "Communications",
        title: "Contact",
        body:
            "Want to talk about software, AI, systems, startups, research, squash, football (both kinds), or something completely unrelated? This will become the fastest way to reach me."
    }
};

/* Define application state */
const state = {
    curiosity: 0,
    activeSection: null,
    exploredSections: []
};

/* Define the constant reward for exploring a new section */
const explorationReward = 25;

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

    detailBody:
        document.querySelector("[data-detail-body]"),

    /* querySelector returns first matching element while querySelectorAll returns all matching elements */
    exploreButtons:
        document.querySelectorAll("[data-section]"),
    
    stations:
    document.querySelectorAll("[data-station]")
};

/* Render the application state to the DOM */
function render() {
    renderCuriosity();
    renderWorld();
    renderExploreButtons();
    renderStations();
    renderSystemStatus();
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

    elements.detailBody.textContent =
        content.body;
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

/* Initial render of the application state to the DOM */
render();