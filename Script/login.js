document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-login");
  const emailInput = document.getElementById("user-Email");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      // Add the error class to change placeholder color
      emailInput.classList.add("error");
      emailInput.value = ""; // clear invalid input
      emailInput.placeholder = "Invalid email address!";
      emailInput.focus();
      return;
    }

    // If valid, remove error style
    emailInput.classList.remove("error");
    console.log("Email is valid, continue with login...");
  });
});