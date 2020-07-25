// ::: tooltip init :::
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// ::: copyright year :::
document.getElementById("year").innerHTML = new Date().getFullYear();
