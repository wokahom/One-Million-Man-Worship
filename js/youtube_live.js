
  const liveTime = new Date("2025-12-13T16:00:00").getTime(); // SET YOUR LIVE TIME

  const countdownEl = document.getElementById("countdown");
  const liveBadge = document.getElementById("liveBadge");
  const offlineBadge = document.getElementById("offlineBadge");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = liveTime - now;

    if (distance <= 0) {
      countdownEl.style.display = "none";
      liveBadge.style.display = "block";
      offlineBadge.style.display = "none";
      clearInterval(timer);
      return;
    }

    liveBadge.style.display = "none";
    offlineBadge.style.display = "block";

    const hours = Math.floor((distance / (1000 * 60 * 60)));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `Live starts in ${hours}h ${minutes}m ${seconds}s`;
  }

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();

