document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step, header, footer'); // รวมทุกส่วน
    const navLinks = document.querySelectorAll('.side-nav a');

    const observerOptions = {
        threshold: 0.4
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // สำหรับ Step Animation
                if (entry.target.classList.contains('step')) {
                    entry.target.classList.add('is-active');
                }

                // สำหรับ Active Menu Highlight
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active'); // ถ้าจะใช้ class CSS
                    link.style.color = link.getAttribute('href') === `#${id}` 
                        ? 'var(--accent-blue)' 
                        : 'var(--dim-text)';
                });
            }
        });
    }, observerOptions);

    steps.forEach(step => stepObserver.observe(step));
    fetchLastUpdate();
});

// Fetch function (Keep your existing code)
async function fetchLastUpdate() {
    const username = 'kowframe'; 
    const repo = 'kowframe.github.io';
    const timestampElement = document.getElementById('last-updated-timestamp');
    if (!timestampElement) return;

    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=1`);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const lastCommitDate = new Date(data[0].commit.committer.date);
        timestampElement.textContent = `Last updated on ${lastCommitDate.toLocaleString()}`;
    } catch (e) {
        timestampElement.style.display = 'none';
    }
}