document.addEventListener("DOMContentLoaded", () => {
    let currentProject = null;
    let currentImageIndex = 0;
    let images = [];
    let insights = [];

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxInsight = document.getElementById("lightbox-insight");
    const closeBtn = document.getElementById("close-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const thumbnailContainer = document.getElementById("thumbnail-container");

    document.querySelectorAll(".project").forEach(project => {
        const coverImg = project.querySelector(".cover-img");
        const galleryImages = project.querySelectorAll(".gallery img");

        coverImg.addEventListener("click", () => {
            images = [coverImg.src, ...Array.from(galleryImages).map(img => img.src)];
            insights = [coverImg.dataset.insight || "Cover image of this project", 
                        ...Array.from(galleryImages).map(img => img.dataset.insight || "")];

            currentProject = project;
            currentImageIndex = 0;
            showImage();
            lightbox.classList.add("active");
            generateThumbnails();
        });
    });

    closeBtn.addEventListener("click", () => {
        closeLightbox();
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    prevBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage();
    });

    nextBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage();
    });

    function showImage() {
        lightboxImg.src = images[currentImageIndex];
        lightboxInsight.textContent = insights[currentImageIndex];
        updateThumbnails();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    function generateThumbnails() {
        thumbnailContainer.innerHTML = "";
        images.forEach((src, index) => {
            const thumb = document.createElement("img");
            thumb.src = src;
            thumb.classList.add("thumbnail");
            thumb.addEventListener("click", (event) => {
                event.stopPropagation();
                currentImageIndex = index;
                showImage();
            });
            thumbnailContainer.appendChild(thumb);
        });
        updateThumbnails();
    }

    function updateThumbnails() {
        document.querySelectorAll("#thumbnail-container img").forEach((thumb, index) => {
            thumb.classList.toggle("active", index === currentImageIndex);
        });
    }

    // Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextBtn.click();
        } else if (touchEndX > touchStartX + 50) {
            prevBtn.click();
        }
    }
});
