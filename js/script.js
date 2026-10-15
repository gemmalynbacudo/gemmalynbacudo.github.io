// 1. Load Projects from JSON
document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.getElementById("project-container");

    fetch("data/projects.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load projects.");
            return response.json();
        })
        .then(projects => {
            projectContainer.innerHTML = "";
            projects.forEach(project => {
                const card = document.createElement("div");
                card.className = "project-card";
                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p><strong>Tech:</strong> ${project.technologies.join(", ")}</p>
                    <p><strong>Role:</strong> ${project.role}</p>
                    <a href="${project.link}" target="_blank" class="cta-btn">View Code</a>
                `;
                projectContainer.appendChild(card);
            });
        })
        .catch(error => {
            projectContainer.innerHTML = "<p>Sorry, projects could not be loaded at this time.</p>";
            console.error(error);
        });

    // 3. Contact Form Submission Handling
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        formFeedback.textContent = "Thank you! Your message has been sent successfully.";
        formFeedback.className = "";
        formFeedback.style.color = "green";
        contactForm.reset();
    });

    // 4. Custom Feature: Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggleBtn.textContent = "☀️ Light Mode";
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.textContent = "🌙 Dark Mode";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.textContent = "☀️ Light Mode";
        }
    });
});
      
