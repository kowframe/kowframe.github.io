document.addEventListener('DOMContentLoaded', () => {

    // --- General Animate on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- Scrollytelling Logic ---
    const scrollyObserver = new IntersectionObserver((entries) => {
        // Find which step is most visible
        let mostVisibleEntry = null;
        let maxRatio = 0;

        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                mostVisibleEntry = entry;
            }
        });

        // Deactivate all steps
        const allSteps = document.querySelectorAll('.step');
        allSteps.forEach(step => step.classList.remove('is-active'));

        // Activate the most visible one
        if (mostVisibleEntry) {
            mostVisibleEntry.target.classList.add('is-active');
        }

    }, {
        threshold: [0.2, 0.4, 0.6, 0.8] // Create multiple trigger points for accuracy
    });
    
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => scrollyObserver.observe(step));
});