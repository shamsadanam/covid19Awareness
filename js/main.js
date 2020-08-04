// ::: tooltip init :::
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// ::: copyright year :::
document.getElementById("year").innerHTML = new Date().getFullYear();

//::: side menu control
document.querySelector("#menu-button").addEventListener("click", () => {
  document.querySelector("#side-menu").classList.toggle("js-marginRight");
});

const graph = document.querySelector("#chart");
if (window.innerWidth < 576) {
  graph.height = 150;
} else if (window.innerWidth <= 991) {
  graph.height = 100;
} else if (window.innerWidth > 991) {
  graph.height = 100;
}
