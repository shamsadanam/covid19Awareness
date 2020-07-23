// ::: tooltip init :::
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// ::: filter btn active class toggles :::
const filterBtn = document.querySelectorAll(".filter-btn");
let currentActiveFilterBtn = document.querySelector(".filter-btn.active");

filterBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.target.classList.add("active");
    currentActiveFilterBtn.classList.remove("active");
    currentActiveFilterBtn = e.target;
    console.log(e.target);
  });
});

// :::filter range price show:::
const filterRange = document.querySelector("#filterRange");
const minPrice = document.querySelector("#minPrice");
const maxPrice = document.querySelector("#maxPrice");

if (filterRange) {
  filterRange.addEventListener("click", (e) => {
    maxPrice.innerHTML = e.target.value;
  });
}

// ::: copyright year :::
document.getElementById("year").innerHTML = new Date().getFullYear();
