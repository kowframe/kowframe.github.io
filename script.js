document.addEventListener('DOMContentLoaded', () => {

    const steps = document.querySelectorAll('.step');

    if (!steps.length) {
        return;
    }

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the step is on screen, add the 'is-active' class
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            } else {
                // Optional: remove class when it's off-screen to re-animate if scrolled back
                // entry.target.classList.remove('is-active'); 
            }
        });
    }, { 
        threshold: 0.3 // Trigger when 30% of the step is visible
    });

    // Observe each step
    steps.forEach(step => {
        stepObserver.observe(step);
    });

    fetchLastUpdate();
    autoplaySlider()

});

// This function fetches the last commit date from the GitHub API
async function fetchLastUpdate() {
    // --- IMPORTANT: CONFIGURE YOUR DETAILS HERE ---
    const username = 'kowframe'; 
    const repo = 'kowframe.github.io'; // <-- Make sure this is your repository name
    // ---------------------------------------------

    const timestampElement = document.getElementById('last-updated-timestamp');
    if (!timestampElement) return;

    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=1`);
        
        if (!response.ok) {
            throw new Error(`GitHub API returned a ${response.status} error.`);
        }

        const data = await response.json();
        const lastCommitDate = new Date(data[0].commit.committer.date);

        // Format the date AND time into a readable string
        const formattedDateTime = lastCommitDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        timestampElement.textContent = `Last updated on ${formattedDateTime}`;

    } catch (error) {
        console.error('Error fetching last update time:', error);
        timestampElement.style.display = 'none';
    }
}

async function autoplaySlider() {
    let slideIndex = 1;
    let slideInterval;
    
    function showSlide(n) {
        const slides = document.getElementsByClassName('slide');
        const dots = document.getElementsByClassName('dot');
        
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        
        slides[slideIndex - 1].classList.add('active');
        dots[slideIndex - 1].classList.add('active');
    }
    
    function autoPlay() {
        slideInterval = setInterval(() => {
            showSlide(slideIndex += 1);
        }, 5000);
    }
    
    // Attach click events to dots
    const dots = document.getElementsByClassName('dot');
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(slideIndex = i + 1);
            autoPlay();
        });
    }
    
    // Start autoplay
    autoPlay();
}