document.addEventListener('DOMContentLoaded', () => {

    // --- General Animate on Scroll (This part remains the same) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- Scrollytelling Logic (NEW & IMPROVED: Find Closest to Center) ---
    const steps = document.querySelectorAll('.step');

    function updateActiveStep() {
        const viewportCenter = window.innerHeight / 2;
        let closestStep = null;
        let minDistance = Infinity;

        // 1. Find the step closest to the viewport center
        steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            // Calculate the center of the element relative to the viewport
            const elementCenter = rect.top + rect.height / 2;
            // Calculate the absolute distance from the viewport center
            const distance = Math.abs(viewportCenter - elementCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestStep = step;
            }
        });

        // 2. Activate the closest step and deactivate others
        steps.forEach(step => {
            if (step === closestStep) {
                step.classList.add('is-active');
            } else {
                step.classList.remove('is-active');
            }
        });
    }

    // Run the function on scroll
    window.addEventListener('scroll', updateActiveStep);
    
    // Also run it once on load
    updateActiveStep();
});