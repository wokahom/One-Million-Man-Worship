
/* ===== Lazy Loading with Blur Effect ===== */
    document.addEventListener("DOMContentLoaded", () => {
      const lazyImages = document.querySelectorAll(".lazy-img");

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;

            img.onload = () => {
              img.classList.add("loaded");
            };

            observer.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => observer.observe(img));
    });

    /* ===== Lightbox ===== */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    document.addEventListener("click", e => {
      if (e.target.classList.contains("lazy-img")) {
        lightboxImg.src = e.target.dataset.src;
        lightbox.classList.add("show");
      }
    });

    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("show");
    });

    /* ===== Load More Button ===== */
    let loaded = 6;

    document.getElementById("loadMoreBtn").addEventListener("click", () => {
      const gallery = document.getElementById("gallery");

      for (let i = 1; i <= 6; i++) {
        loaded++;
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerHTML = `
          <img class="lazy-img"
              src="images/placeholder.jpg"
              data-src="images/img${loaded}.jpg">
        `;
        gallery.appendChild(div);
      }
    });

