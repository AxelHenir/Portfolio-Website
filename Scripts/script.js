document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript loaded correctly!");

    document.querySelectorAll(".insight-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            let container = button.closest(".photo-container");
            let insight = container.querySelector(".insight-overlay");

            if (!container.classList.contains("active")) {
                console.log("Opening insight...");
                container.classList.add("active");
                button.textContent = "✖"; // Change "?" to "X"
            } else {
                console.log("Closing insight...");
                container.classList.remove("active");
                button.textContent = "?";
            }

            event.stopPropagation(); // Prevents closing when clicking inside
        });
    });

    // Close insights when clicking outside
    document.addEventListener("click", () => {
        document.querySelectorAll(".photo-container").forEach(container => {
            container.classList.remove("active");
            container.querySelector(".insight-btn").textContent = "?";
        });
    });

    // Prevent closing when clicking inside an active insight
    document.querySelectorAll(".photo-container").forEach(container => {
        container.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });
});