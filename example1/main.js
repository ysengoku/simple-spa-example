const routes = {
	"/": "<h1>Home</h1><p>Welcome to my SPA!</p>",
	"/profile": "<h1>Profile</h1><p>My profile</p>",
	"/settings": "<h1>Settings</h1><p>Change settings here</p>",
};

// Update the content based on the current hash
function render() {
	const app = document.getElementById("app");
	const hash = location.hash || "#/";  // default = home
	const path = hash.slice(1);          // parse hash to make path "#/" → "/"
	app.innerHTML = routes[path] || "<h1>404</h1><p>Page not found</p>";

	// Highlight the active link
	document.querySelectorAll("nav a").forEach(link => {
		link.classList.toggle("active", link.getAttribute("href") === hash);
	});
}

// Render the view when the page loads and when the hash changes
window.addEventListener("hashchange", render);  
window.addEventListener("load", render);