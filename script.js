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
    initNavigationHighlighter();

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

/**
 * ฟังก์ชันสำหรับทำ Scroll Highlight และ Animation
 */
function initNavigationHighlighter() {
    const sections = document.querySelectorAll('header, section, footer');
    const navLinks = document.querySelectorAll('.side-nav a');

    const observerOptions = {
        threshold: 0.4 // ทำงานเมื่อเห็นพื้นที่ 40% ของ Section
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // เพิ่ม Animation Class ให้กับ Step (ตาม Logic เดิมของคุณ)
                if (entry.target.classList.contains('step')) {
                    entry.target.classList.add('is-active');
                }

                // อัปเดตสถานะเมนู
                const targetId = entry.target.getAttribute('id');
                updateNavMenu(targetId, navLinks);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * ฟังก์ชันสำหรับเปลี่ยนสี/สถานะของ Link ใน Menu
 */
function updateNavMenu(activeId, links) {
    links.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === activeId) {
            link.style.color = 'var(--accent-blue)'; // สีตอน Active
            link.style.fontWeight = '700';
        } else {
            link.style.color = 'var(--dim-text)'; // สีปกติ
            link.style.fontWeight = '400';
        }
    });
}