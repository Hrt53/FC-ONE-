// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.fade-in-up, .problem__item, .point-card, .feature-card, .gallery-item, .event-card, .step-item, .info-list li, .faq-item');
    
    animatedElements.forEach((el) => {
        // Add base class if not already there
        if (!el.classList.contains('fade-in-up')) {
            el.classList.add('fade-in-up');
        }
        observer.observe(el);
    });

    // 2. Smooth scrolling for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Fixed CTA display logic (Hide when near footer)
    const fixedCta = document.getElementById('fixedCta');
    const footer = document.querySelector('.final-cta');
    
    if(fixedCta && footer) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // Hide fixed CTA when final CTA is highly visible
                    fixedCta.style.opacity = '0';
                    fixedCta.style.pointerEvents = 'none';
                    fixedCta.style.transition = 'opacity 0.3s';
                } else {
                    // Show it again
                    fixedCta.style.opacity = '1';
                    fixedCta.style.pointerEvents = 'auto';
                }
            });
        }, { threshold: 0.2 });
        
        ctaObserver.observe(footer);
    }
});
