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





    /* ===============================
     CREATE TICKET → ADD TO TABLE
  =============================== */

  const ticketForm = document.querySelector("#create-tickets form");
  const ticketTableBody = document.querySelector("#tickets tbody");

  if (ticketForm) {
    ticketForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const taskTitle = document.getElementById("taskTitle").value;
      const owner = document.getElementById("owner").value;
      const status = document.getElementById("status").value;
      const priority = document.getElementById("priority").value;
      const dueDate = document.getElementById("dueDate").value;

      // Get today's date
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      // Create new table row
      const newRow = document.createElement("tr");

      newRow.innerHTML = `
        <td>${taskTitle}</td>
        <td>${owner}</td>
        <td><span class="status new">${status}</span></td>
        <td>${dueDate}</td>
        <td><span class="priority low">${priority}</span></td>
        <td>${today}</td>
        <td class="actions">
          <button class="btn-view"><i class="fa-solid fa-eye"></i></button>
          <button class="btn-edit"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;

      // Add row to table
      ticketTableBody.appendChild(newRow);

      // Reset form
      ticketForm.reset();

      // Switch to Tickets page automatically
      showPage("tickets");

      // Highlight Tickets menu
      const ticketsLink = document.querySelector('.menu a[data-target="tickets"]');
      if (ticketsLink) {
        setActiveLink(ticketsLink);
      }
    });
  }

});
