document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".menu a[data-target]");
  const contents = document.querySelectorAll(".content");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // SPA PAGE SWITCHING
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.dataset.target;

      contents.forEach((section) => {
        section.classList.remove("active");
      });

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });

  // DROPDOWN TOGGLE (ANCHOR VERSION)
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault(); // 🔥 REQUIRED
      toggle.parentElement.classList.toggle("open");
    });
  });
});
