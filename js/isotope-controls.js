var $grid = $(".filter-grid").isotope({
  itemSelector: ".filter-item",
  layoutMode: "fitRows",
});
var filterFns = {
  // show if number is greater than 50
  greaterThan: function () {
    var maxPrice = $("#maxPrice").html();
    var price = $(this).find(".price").text();
    return parseInt(price, 10) > maxPrice;
  },
  // show if name ends with -ium
  ium: function () {
    var name = $(this).find(".name").text();
    return name.match(/ium$/);
  },
};
// bind filter button click
$(".filters-button-group, range-filter-input").on(
  "click",
  "button",
  function () {
    var filterValue = $(this).attr("data-filter");
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  }
);
// change is-checked class on buttons
$(".button-group").each(function (i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on("click", "button", function () {
    $buttonGroup.find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
  });
});
