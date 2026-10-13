
    const sliderTrack = document.getElementById("slider-track");
    const slides = document.querySelectorAll(".slide-img");
    let index = 0;

    function autoSlide() {
        index++;
        if (index > slides.length - 1) {
            index = 0;
        }

        // Width of one image
        const slideWidth = slides[0].clientWidth;

        // Move the track
        sliderTrack.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    // Slide every 2 seconds
    setInterval(autoSlide, 2000);

