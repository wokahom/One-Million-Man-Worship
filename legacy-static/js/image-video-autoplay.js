
  const introImage = document.getElementById("intro-image");
  const mainVideo = document.getElementById("main-video");

  function showImageThenVideo() {
    introImage.style.display = "block";
    mainVideo.style.display = "none";
    mainVideo.pause();
    mainVideo.currentTime = 0;

    // Show image for 3 seconds
    setTimeout(() => {
      introImage.style.display = "none";
      mainVideo.style.display = "block";
      mainVideo.play();
    }, 3000);
  }

  // When the video ends, restart the cycle
  mainVideo.addEventListener("ended", showImageThenVideo);

  // Start the first cycle
  showImageThenVideo();

