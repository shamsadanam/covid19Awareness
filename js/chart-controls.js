// global variables
let currentSelectedCountry = "BD";
let currentSelectedDataType = "Cumulative Cases";
let currentSelectedGraphType = "bar";
let currentSelectedCompare;

let chart;

let acronyms = {};

$(document).ready(() => {
  initSelect2();
  drawChart();
  getDiffData();
});
// select2 initialization
function initSelect2() {
  getCountryNames()
    .then((response) => {
      $(".js-select2").select2({
        data: response,
        templateSelection: function (data) {
          if (data.id === "default") {
            // adjust for custom placeholder values
            return "Bangladesh";
          }

          return data.text;
        },
      });
      $(".js-select2-2").select2({
        data: response,
        templateSelection: function (data) {
          if (data.id === "default") {
            // adjust for custom placeholder values
            return "Select a Country";
          }
          return data.text;
        },
      });
    })
    .catch((error) => {
      console.log("Some Error Happned");
      console.error(error);
    });

  $(".js-graphType").select2();
  $(".js-dataType").select2();
  $(".js-graphType-sm").select2();
  $(".js-dataType-sm").select2();

  // chart menu controls - events when an option is selected
  //first list of country selection
  $(".js-select2").on("select2:select", function (e) {
    currentSelectedCountry = acronyms[e.params.data.text.trim()];
    getData(currentSelectedCountry, currentSelectedDataType).then(
      (response) => {
        chart.data.datasets[0].data = response.ys.slice(-60);
        chart.data.datasets[0].label = `${currentSelectedDataType} (${currentSelectedCountry})`;
        chart.update();
        getDiffData(currentSelectedCountry);
      }
    );
  });

  //data type selection
  $(".js-dataType").on("select2:select", function (e) {
    currentSelectedDataType = e.params.data.text.trim();
    getData(currentSelectedCountry, currentSelectedDataType).then(
      (response) => {
        chart.data.datasets[0].data = response.ys.slice(-60);
        chart.data.datasets[0].backgroundColor = currentSelectedDataType.includes(
          "Death"
        )
          ? "#ee6c4d"
          : "#00b4d8";
        chart.data.datasets[0].hoverBackgroundColor = currentSelectedDataType.includes(
          "Death"
        )
          ? "#da5204"
          : "#0077b6";
        chart.data.datasets[0].borderColor = currentSelectedDataType.includes(
          "Death"
        )
          ? "#ee6c4d"
          : "#00b4d8";
        chart.data.datasets[0].label = `${currentSelectedDataType} (${currentSelectedCountry})`;
        chart.reset();
        chart.update();
      }
    );
  });
  $(".js-dataType-sm").on("select2:select", function (e) {
    currentSelectedDataType = e.params.data.text.trim();
    getData(currentSelectedCountry, currentSelectedDataType).then(
      (response) => {
        chart.data.datasets[0].data = response.ys.slice(-60);
        chart.data.datasets[0].backgroundColor = currentSelectedDataType.includes(
          "Death"
        )
          ? "#ee6c4d"
          : "#00b4d8";
        chart.data.datasets[0].hoverBackgroundColor = currentSelectedDataType.includes(
          "Death"
        )
          ? "#da5204"
          : "#0077b6";
        chart.data.datasets[0].borderColor = currentSelectedDataType.includes(
          "Death"
        )
          ? "#ee6c4d"
          : "#00b4d8";
        chart.data.datasets[0].label = `${currentSelectedDataType} (${currentSelectedCountry})`;
        chart.reset();
        chart.update();
      }
    );
  });

  //graph type selection
  //need to destroy old graph and draw a new one to change the type
  $(".js-graphType").on("select2:select", function (e) {
    currentSelectedGraphType = e.params.data.text.trim().toLowerCase();
    let currentGraph = {};
    currentGraph = Object.assign(currentGraph, chart.data);
    chart.destroy();
    let ctx = document.querySelector("#chart");
    chart = new Chart(ctx, {
      type: currentSelectedGraphType,
      data: currentGraph,
    });
  });
  $(".js-graphType-sm").on("select2:select", function (e) {
    currentSelectedGraphType = e.params.data.text.trim().toLowerCase();
    console.log(e.params.data.text.trim().toLowerCase());
    let currentGraph = {};
    currentGraph = Object.assign(currentGraph, chart.data);
    chart.destroy();
    let ctx = document.querySelector("#chart");
    chart = new Chart(ctx, {
      type: currentSelectedGraphType,
      data: currentGraph,
    });
  });
}

//GETTING DATA USING API

//setting up firsl list of country names
async function getCountryNames() {
  let id = 0;
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let select2data = [
    {
      id: "default",
      text: "",
    },
  ];

  const response = await fetch(
    "https://covid19-api.org/api/countries",
    requestOptions
  );
  const data = await response.json();
  data.forEach((datum) => {
    select2data.push({
      id: id++,
      text: datum.name,
    });
    acronyms[datum.name] = datum.alpha2;
  });
  return select2data;
}

//GET TIMELINE BY COUNTRY
async function getData(getCountry = "BD", dataType = "Cumulative Cases") {
  const xs = [];
  const ys = [];

  // this url provides cumulative cases and deathss
  const url = `https://covid19-api.org/api/timeline/${getCountry}`;
  const response = await fetch(url);
  const data = await response.json();

  if (dataType.includes("Cases")) {
    data.forEach((datum) => {
      //putting the data in arrays to plot it in the graph
      xs.unshift(datum.last_update.split("T")[0]);
      ys.unshift(datum.cases);
    });
  } else if (dataType.includes("Deaths")) {
    data.forEach((datum) => {
      //putting the data in arrays to plot it in the graph
      xs.unshift(datum.last_update.split("T")[0]);
      ys.unshift(datum.deaths);
    });
  }

  //count card data
  document.querySelector(
    "#cumulativeCases"
  ).innerHTML = data[0].cases.toLocaleString("en-IN");

  document.querySelector(
    "#cumulativeDeaths"
  ).innerHTML = data[0].deaths.toLocaleString("en-IN");
  document.querySelector(
    "#cumulativeRecovered"
  ).innerHTML = data[0].recovered.toLocaleString("en-IN");
  document.querySelector("#lastUpdate").innerHTML = data[0].last_update.split(
    "T"
  )[0];

  return { xs, ys };
}

async function getDiffData(getCountry = currentSelectedCountry) {
  const urlNew = `https://covid19-api.org/api/diff/${getCountry}`;
  const responseNew = await fetch(urlNew);
  const dataNew = await responseNew.json();
  // console.log(dataNew);

  document.querySelector(
    "#newCases"
  ).innerHTML = dataNew.new_cases.toLocaleString("en-IN");
  document.querySelector(
    "#newDeaths"
  ).innerHTML = dataNew.new_deaths.toLocaleString("en-IN");
}

// ::: drawing the chart :::
async function drawChart(graphType = "bar", plotData) {
  if (!plotData) {
    plotData = await getData().catch((error) => {
      console.log("Some Error Happened");
      console.error(error);
    });
  }

  let ctx2 = document.getElementById("chart");

  chart = new Chart(ctx2, {
    type: graphType.toLowerCase(),
    data: {
      labels: plotData.xs.slice(-60),
      datasets: [
        {
          label: `${currentSelectedDataType} (${currentSelectedCountry})`,
          data: plotData.ys.slice(-60),
          backgroundColor: "#00b4d8",
          borderColor: "#00b4d8",
          hoverBackgroundColor: "#0077b6",
          fill: false,
        },
      ],
    },
  });
}
