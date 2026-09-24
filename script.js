const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

document.querySelectorAll('.mobile-menu .nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    if (track && slides.length > 0) {
        const prevBtn = document.querySelector('.carousel-button.prev');
        const nextBtn = document.querySelector('.carousel-button.next');

        let currentIndex = 0;
        let isTransitioning = false;
        let perView = window.innerWidth <= 768 ? 1 : 2;

        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        const realSlides = slides.length;
        currentIndex = perView === 1 ? 1 : 0;
        track.style.transform = `translateX(-${currentIndex * (100 / perView)}%)`;

        function moveSlide(direction) {
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex += direction;
            track.style.transition = 'transform 0.5s ease';
            track.style.transform = `translateX(-${currentIndex * (100 / perView)}%)`;

            setTimeout(() => {
                if (currentIndex <= 0 && perView === 1) {
                    track.style.transition = 'none';
                    currentIndex = realSlides;
                    track.style.transform = `translateX(-${currentIndex * 100}%)`;
                } else if (currentIndex >= realSlides + 1 && perView === 1) {
                    track.style.transition = 'none';
                    currentIndex = 1;
                    track.style.transform = `translateX(-100%)`;
                }
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease';
                }, 50);
                isTransitioning = false;
            }, 500);
        }

        prevBtn.addEventListener('click', () => moveSlide(-1));
        nextBtn.addEventListener('click', () => moveSlide(1));
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(other => other.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
});

const formFrame = document.getElementById('google-form-iframe');
if (formFrame) {
    window.addEventListener('message', (event) => {
        if (event.origin.indexOf('docs.google.com') === -1) return;
        const data = event.data;
        if (!data) return;
        const height = data.frameHeight || (data.type === 'setHeight' && data.height);
        if (height) {
            formFrame.style.height = height + 'px';
        }
    });
}
