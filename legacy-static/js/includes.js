// JavaScript function to include header and footer
function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  elements.forEach(async (el) => {
      const file = el.getAttribute('data-include');
      try {
          const response = await fetch(file);
          if (response.ok) {
              el.innerHTML = await response.text();
          }
      } catch (error) {
          console.error("Error loading file:", file);
      }
  });
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', includeHTML);
