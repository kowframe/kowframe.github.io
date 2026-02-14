document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const projectVisual = document.getElementById('project-visual');
    const body = document.body;

    if (!steps.length || !projectVisual) {
        console.error("Scrollytelling elements not found. Check your HTML IDs and classes.");
        return;
    }

    const stepObserver = new IntersectionObserver((entries) => {
        let isAnyStepActive = false;

        entries.forEach(entry => {
            const stepElement = entry.target;
            
            if (entry.isIntersecting) {
                stepElement.classList.add('is-active');
                
                const newImgSrc = stepElement.dataset.img;
                if (newImgSrc && projectVisual.src !== newImgSrc) {
                    projectVisual.style.opacity = 0;
                    setTimeout(() => {
                        projectVisual.src = newImgSrc;
                        projectVisual.style.opacity = 1;
                    }, 400);
                }
                isAnyStepActive = true;
            } else {
                stepElement.classList.remove('is-active');
            }
        });

        if (isAnyStepActive) {
            body.classList.add('is-scrolling');
        } else {
            body.classList.remove('is-scrolling');
        }

    }, { 
        threshold: 0.6 
    });

    steps.forEach(step => {
        stepObserver.observe(step);
    });
});