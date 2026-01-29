const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

// Fullscreen modal functionality for cover images
const coverImages = document.querySelectorAll('.card-image');
coverImages.forEach(img => {
    img.addEventListener('click', () => {
        modalImage.src = img.src;
        imageModal.classList.add('active');
    });
});

// Gallery image functionality - click to set as cover and fullscreen
const galleryImages = document.querySelectorAll('.gallery-image');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const card = img.closest('.content-card');
        const coverImage = card.querySelector('.card-image');

        // Update cover image
        coverImage.src = img.src;
        coverImage.alt = img.alt;

        // Show fullscreen
        modalImage.src = img.src;
        imageModal.classList.add('active');
    });
});

modalClose.addEventListener('click', () => {
    imageModal.classList.remove('active');
});

imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.classList.remove('active');
    }
});

// Intro expand/collapse functionality
const expandIntroBtn = document.querySelector('.expand-intro-btn');
const downloadCvBtn = document.querySelector('.download-cv-btn');
const introExpanded = document.querySelector('.intro-expanded');
const introMain = document.querySelector('.intro-main');
const introHeader = document.querySelector('.intro-header');

if (expandIntroBtn && introExpanded) {
    expandIntroBtn.addEventListener('click', () => {
        const isHidden = introExpanded.style.display === 'none';
        if (isHidden) {
            // Show expanded, hide main
            introExpanded.style.display = 'block';
            introMain.style.display = 'none';
            introHeader.textContent = 'Alex Henri  //  About';
            expandIntroBtn.innerHTML = '<span class="highlight">Less</span>';
        } else {
            // Hide expanded, show main
            introExpanded.style.display = 'none';
            introMain.style.display = 'flex';
            introHeader.textContent = 'Alex Henri  //  Portfolio';
            expandIntroBtn.innerHTML = '<span class="highlight">About Me</span>';
        }
    });
}

// Download CV button functionality
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
        const cvLink = document.createElement('a');
        cvLink.href = 'https://assets.alexhenri.art/cv-download/Alex%20Henri%20CV%20-%20Winter%202025.pdf';
        cvLink.download = 'Alex Henri CV - Winter 2025.pdf';
        document.body.appendChild(cvLink);
        cvLink.click();
        document.body.removeChild(cvLink);
    });
}

// Content card expand/collapse functionality
const expandCardBtns = document.querySelectorAll('.expand-card-btn');

expandCardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.content-card');
        const cardExpanded = card.querySelector('.card-expanded');
        const isActive = cardExpanded.classList.contains('active');
        
        if (!isActive) {
            // Close any other open expanded cards first
            const openExpanded = document.querySelectorAll('.card-expanded.active');
            openExpanded.forEach(open => {
                if (open !== cardExpanded) {
                    open.classList.remove('active');
                    const openCard = open.closest('.content-card');
                    const openBtn = openCard ? openCard.querySelector('.expand-card-btn') : null;
                    if (openBtn) openBtn.textContent = 'More';
                }
            });

            cardExpanded.classList.add('active');
            btn.textContent = 'Less';
        } else {
            cardExpanded.classList.remove('active');
            btn.textContent = 'More';
        }
    });
});

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const contentCards = document.querySelectorAll('.content-grid .content-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter cards
        contentCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});
