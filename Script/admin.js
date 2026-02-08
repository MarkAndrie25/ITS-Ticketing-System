document.addEventListener("DOMContentLoaded", () => {
  const contents = document.querySelectorAll(".content");
  const menuLinks = document.querySelectorAll(".menu a[data-target]");
  const dropdowns = document.querySelectorAll(".dropdown");

  /* ===============================
     SPA PAGE SWITCHING
  =============================== */
  function showPage(targetId) {
    contents.forEach(section => {
      section.classList.remove("active");
    });

    const target = document.getElementById(targetId);
    if (target) target.classList.add("active");
  }

  /* ===============================
     ACTIVE MENU HIGHLIGHT
  =============================== */
  function setActiveLink(activeLink) {
    document.querySelectorAll(".menu a").forEach(link => {
      link.classList.remove("active");
    });

    activeLink.classList.add("active");
  }

  /* ===============================
     CLOSE ALL DROPDOWNS
  =============================== */
  function closeAllDropdowns(except = null) {
    dropdowns.forEach(dropdown => {
      if (dropdown !== except) {
        dropdown.classList.remove("open");
      }
    });
  }

  /* ===============================
     MENU LINK HANDLER
  =============================== */
  menuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const targetId = link.dataset.target;
      showPage(targetId);
      setActiveLink(link);
      closeAllDropdowns();
    });
  });

  /* ===============================
     DROPDOWN TOGGLE
  =============================== */
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    toggle.addEventListener("click", e => {
      e.preventDefault();

      const isOpen = dropdown.classList.contains("open");
      closeAllDropdowns();
      dropdown.classList.toggle("open", !isOpen);
    });
  });
});
