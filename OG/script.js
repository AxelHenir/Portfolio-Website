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

document.addEventListener("DOMContentLoaded", () => {
    let currentProject = null;
    let currentImageIndex = 0;
    let images = [];

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxInsight = document.getElementById("lightbox-insight");
    const closeBtn = document.getElementById("close-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    document.querySelectorAll(".project").forEach(project => {
        const coverImg = project.querySelector(".cover-img");
        const gallery = project.querySelectorAll(".gallery img");

        coverImg.addEventListener("click", () => {
            images = [coverImg.src, ...Array.from(gallery).map(img => img.src)];
            currentProject = project;
            currentImageIndex = 0;
            showImage();
            lightbox.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    prevBtn.addEventListener("click", () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            showImage();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            showImage();
        }
    });

    function showImage() {
        lightboxImg.src = images[currentImageIndex];
        lightboxInsight.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
    }
});
