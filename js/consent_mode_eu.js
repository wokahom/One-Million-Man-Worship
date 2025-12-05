
  // Only show banner for EU/EEA users
  gtag('get', 'G-KGCY1P8LVH', 'geographical_region', region => {

    // EU/EEA region codes start with 'E'
    const isEU = region && region.startsWith('E');

    // Show banner ONLY if user is in EU and has not chosen yet
    if (isEU && !localStorage.getItem("cookieConsent")) {
      document.getElementById("cookie-banner").style.display = "block";
    }

  });

  // Accept cookies
  document.getElementById("accept-cookies").onclick = function() {
    localStorage.setItem("cookieConsent", "accepted");

    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });

    document.getElementById("cookie-banner").style.display = "none";
  };

  // Decline cookies
  document.getElementById("decline-cookies").onclick = function() {
    localStorage.setItem("cookieConsent", "denied");

    gtag('consent', 'update', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied'
    });

    document.getElementById("cookie-banner").style.display = "none";
  };

