document.addEventListener('DOMContentLoaded', () => {

    // --- General Animate on Scroll ---
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


    // --- Scrollytelling Logic (FIXED) ---
    const scrollyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // เมื่อ step เข้ามาในพื้นที่ที่กำหนด ให้ active
            if (entry.isIntersecting) {
                // ลบ active class ออกจากทุก step ก่อน
                document.querySelectorAll('.step').forEach(step => {
                    step.classList.remove('is-active');
                });
                // แล้วค่อยเพิ่ม active class ให้กับ step ปัจจุบัน
                entry.target.classList.add('is-active');
            }
        });
    }, {
        // ให้ observer ทำงานเมื่อ step ผ่านกึ่งกลางจอ (-50%)
        rootMargin: '-50% 0px -50% 0px'
    });
    
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => scrollyObserver.observe(step));
});