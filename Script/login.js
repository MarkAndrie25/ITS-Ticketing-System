const regLink = document.getElementById("link-reg");
const regForm = document.querySelector(".registration-form");

regLink.addEventListener("click", function (e) {
    e.preventDefault(); // para di mag refresh ang page

    regForm.style.display = "block";
});
