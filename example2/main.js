// Content for Section 2
const section2Content = {
	"/": "<p>Welcome to the Home page!<br>Only this part is updated.</p>",
	"/profile": "<p>This is the Profile page.<br>Content changes here.</p>",
    "/settings": "<p>This is the Settings page.<br>Modify your preferences here.</p>",
};

// Counter for Section 1 (always updated)
let section1Counter = 0;

// Function to render sections
function renderSections() {

    // Update Section 1
    const section1 = document.getElementById("section1");
    section1.innerHTML = `
        <h2>Section 1</h2>
        <p>This part is always updated.</p>
        <p>Update count: ${++section1Counter}</p>
    `;

    // Update Section 2
    const section2 = document.getElementById("section2");
    const hash = location.hash || "#/";
    const path = hash.slice(1); // "#/" → "/"
    section2.innerHTML = `
        <h2>Section 2</h2>
        ${section2Content[path] || "<p>404 - Page not found.</p>"}
    `;

    // Highlight the active link
    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === hash);
    });
}

// Initial rendering and event listener setup
window.addEventListener("hashchange", renderSections);
window.addEventListener("load", renderSections);
