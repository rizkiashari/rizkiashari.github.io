document.getElementById("menu").addEventListener("click", function () {
  let nav = document.getElementById("nav");

  if (nav.classList.contains("nav")) {
    nav.classList.add("show");
    nav.classList.remove("nav");
  } else {
    nav.classList.remove("show");
    nav.classList.add("nav");
  }
});
