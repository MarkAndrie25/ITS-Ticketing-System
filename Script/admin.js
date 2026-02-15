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

  /* ===============================
   DELETE TICKET
================================ */
document.addEventListener("click", function (e) {
  if (e.target.closest(".btn-delete")) {

    const confirmDelete = confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    const row = e.target.closest("tr");
    if (row) {
      row.remove();
    }
  }
});


/* ===============================
   EDIT TICKET
================================ */
document.addEventListener("click", function (e) {

  const editBtn = e.target.closest(".btn-edit");
  if (!editBtn) return;

  const row = editBtn.closest("tr");
  const cells = row.querySelectorAll("td");

  // If already in edit mode → Save
  if (editBtn.classList.contains("editing")) {

    cells.forEach((cell, index) => {
      const input = cell.querySelector("input");
      if (input) {
        cell.textContent = input.value;
      }
    });

    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.classList.remove("editing");
    return;
  }

  // Switch to edit mode
  cells.forEach((cell, index) => {

    if (index === cells.length - 1) return; // skip action column

    const text = cell.textContent;
    cell.innerHTML = `<input type="text" value="${text}" />`;
  });

  editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  editBtn.classList.add("editing");
});


});
