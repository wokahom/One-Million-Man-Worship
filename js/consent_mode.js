
  if (!localStorage.getItem("cookieConsent")) {
    document.getElementById("cookie-banner").style.display = "block";
  }

  document.getElementById("accept-cookies").onclick = function() {
    localStorage.setItem("cookieConsent", "accepted");

    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });

    document.getElementById("cookie-banner").style.display = "none";
  };

  document.getElementById("decline-cookies").onclick = function() {
    localStorage.setItem("cookieConsent", "denied");

    gtag('consent', 'update', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied'
    });

    document.getElementById("cookie-banner").style.display = "none";
  };

