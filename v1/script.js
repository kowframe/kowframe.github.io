document.addEventListener('DOMContentLoaded', () => {

    // --- General Animate on Scroll ---
    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => generalObserver.observe(el));


    // --- Scrollytelling Logic (Find Closest to Center) ---
    const steps = document.querySelectorAll('.step');
    function updateActiveStep() {
        const viewportCenter = window.innerHeight / 2;
        let closestStep = null;
        let minDistance = Infinity;

        steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - elementCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestStep = step;
            }
        });

        steps.forEach(step => {
            step.classList.toggle('is-active', step === closestStep);
        });
    }
    window.addEventListener('scroll', updateActiveStep);
    updateActiveStep(); // Initial check on load


    // --- Load Projects from JSON ---
    async function loadProjects() {
        try {
            const response = await fetch('projects.json');
            if (!response.ok) throw new Error('Network response was not ok.');
            const projects = await response.json();
            const container = document.getElementById('project-showcase-container');
            if (!container) return;

            let projectsHTML = '';
            projects.forEach(project => {
                projectsHTML += `
                    <div class="project-showcase animate-on-scroll">
                        <div class="project-image">
                            <div class="placeholder-img"></div> 
                        </div>
                        <div class="project-details">
                            <h3>${project.title}</h3>
                            <p class="project-organization">${project.organization}</p>
                            <p>${project.description}</p>
                            <div class="tech-tags">
                                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = projectsHTML;
            
            // Re-observe the newly added elements for animations
            const newElementsToAnimate = container.querySelectorAll('.animate-on-scroll');
            newElementsToAnimate.forEach(el => generalObserver.observe(el));

        } catch (error) {
            console.error('Failed to load projects:', error);
        }
    }

    loadProjects();

});