document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    let slideTimer;
    let isPlaying = true;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const playBtn = document.querySelector('.play-btn');
    
    function showSlide(index) {
        // Hide all slides and remove active from dots
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        // Show current slide and highlight dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoPlay() {
        if (isPlaying) {
            slideTimer = setInterval(nextSlide, 5000);
        }
    }
    
    function stopAutoPlay() {
        clearInterval(slideTimer);
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            if (isPlaying) {
                startAutoPlay();
            }
        });
    });
    
    // Play/Pause button
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            this.innerHTML = '▶';
            startAutoPlay();
        } else {
            this.innerHTML = '❚❚';
            stopAutoPlay();
        }
    });
    
    // Initialize
    showSlide(0);
    startAutoPlay();
});