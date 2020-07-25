// global variables

let currentSelectedCountry = "Bangladesh";
let currentSelectedDataType = "New Cases";
let currentSelectedGraphType = "bar";
let currentSelectedCompare;

let chart;

// chart menu controls
// prettier-ignore
const countryNames = [
  {"id": "default", "text": ""},{"id":1,"text":"Afghanistan"},{"id":2,"text":"Albania"},{"id":3,"text":"Algeria"},{"id":4,"text":"Andorra"},{"id":5,"text":"Angola"},{"id":6,"text":"Anguilla"},{"id":7,"text":"Antigua and Barbuda"},{"id":8,"text":"Argentina"},{"id":9,"text":"Armenia"},{"id":10,"text":"Aruba"},{"id":11,"text":"Australia"},{"id":12,"text":"Austria"},{"id":13,"text":"Azerbaijan"},{"id":14,"text":"Bahamas"},{"id":15,"text":"Bahrain"},{"id":16,"text":"Bangladesh"},{"id":17,"text":"Barbados"},{"id":18,"text":"Belarus"},{"id":19,"text":"Belgium"},{"id":20,"text":"Belize"},{"id":21,"text":"Benin"},{"id":22,"text":"Bermuda"},{"id":23,"text":"Bhutan"},{"id":24,"text":"Bolivia (Plurinational State of)"},{"id":25,"text":"Bonaire-Sint Eustatius and Saba"},{"id":26,"text":"Bosnia and Herzegovina"},{"id":27,"text":"Botswana"},{"id":28,"text":"Brazil"},{"id":29,"text":"British Virgin Islands"},{"id":30,"text":"Brunei Darussalam"},{"id":31,"text":"Bulgaria"},{"id":32,"text":"Burkina Faso"},{"id":33,"text":"Burundi"},{"id":34,"text":"Cabo Verde"},{"id":35,"text":"Cambodia"},{"id":36,"text":"Cameroon"},{"id":37,"text":"Canada"},{"id":38,"text":"Cayman Islands"},{"id":39,"text":"Central African Republic"},{"id":40,"text":"Chad"},{"id":41,"text":"Chile"},{"id":42,"text":"China"},{"id":43,"text":"Colombia"},{"id":44,"text":"Comoros"},{"id":45,"text":"Congo"},{"id":46,"text":"Costa Rica"},{"id":47,"text":"Côte d’Ivoire"},{"id":48,"text":"Croatia"},{"id":49,"text":"Cuba"},{"id":50,"text":"Curacao"},{"id":51,"text":"Cyprus"},{"id":52,"text":"Czechia"},{"id":53,"text":"Democratic Republic of the Congo"},{"id":54,"text":"Denmark"},{"id":55,"text":"Djibouti"},{"id":56,"text":"Dominica"},{"id":57,"text":"Dominican Republic"},{"id":58,"text":"Ecuador"},{"id":59,"text":"Egypt"},{"id":60,"text":"El Salvador"},{"id":61,"text":"Equatorial Guinea"},{"id":62,"text":"Eritrea"},{"id":63,"text":"Estonia"},{"id":64,"text":"Eswatini"},{"id":65,"text":"Ethiopia"},{"id":66,"text":"Falkland Islands (Malvinas)"},{"id":67,"text":"Faroe Islands"},{"id":68,"text":"Fiji"},{"id":69,"text":"Finland"},{"id":70,"text":"France"},{"id":71,"text":"French Guiana"},{"id":72,"text":"French Polynesia"},{"id":73,"text":"Gabon"},{"id":74,"text":"Gambia"},{"id":75,"text":"Georgia"},{"id":76,"text":"Germany"},{"id":77,"text":"Ghana"},{"id":78,"text":"Gibraltar"},{"id":79,"text":"Greece"},{"id":80,"text":"Greenland"},{"id":81,"text":"Grenada"},{"id":82,"text":"Guadeloupe"},{"id":83,"text":"Guam"},{"id":84,"text":"Guatemala"},{"id":85,"text":"Guernsey"},{"id":86,"text":"Guinea"},{"id":87,"text":"Guinea-Bissau"},{"id":88,"text":"Guyana"},{"id":89,"text":"Haiti"},{"id":90,"text":"Holy See"},{"id":91,"text":"Honduras"},{"id":92,"text":"Hungary"},{"id":93,"text":"Iceland"},{"id":94,"text":"India"},{"id":95,"text":"Indonesia"},{"id":96,"text":"Iran (Islamic Republic of)"},{"id":97,"text":"Iraq"},{"id":98,"text":"Ireland"},{"id":99,"text":"Isle of Man"},{"id":100,"text":"Israel"},{"id":101,"text":"Italy"},{"id":102,"text":"Jamaica"},{"id":103,"text":"Japan"},{"id":104,"text":"Jersey"},{"id":105,"text":"Jordan"},{"id":106,"text":"Kazakhstan"},{"id":107,"text":"Kenya"},{"id":108,"text":"Kosovo[1]"},{"id":109,"text":"Kuwait"},{"id":110,"text":"Kyrgyzstan"},{"id":111,"text":"Lao People's Democratic Republic"},{"id":112,"text":"Latvia"},{"id":113,"text":"Lebanon"},{"id":114,"text":"Lesotho"},{"id":115,"text":"Liberia"},{"id":116,"text":"Libya"},{"id":117,"text":"Liechtenstein"},{"id":118,"text":"Lithuania"},{"id":119,"text":"Luxembourg"},{"id":120,"text":"Madagascar"},{"id":121,"text":"Malawi"},{"id":122,"text":"Malaysia"},{"id":123,"text":"Maldives"},{"id":124,"text":"Mali"},{"id":125,"text":"Malta"},{"id":126,"text":"Martinique"},{"id":127,"text":"Mauritania"},{"id":128,"text":"Mauritius"},{"id":129,"text":"Mayotte"},{"id":130,"text":"Mexico"},{"id":131,"text":"Monaco"},{"id":132,"text":"Mongolia"},{"id":133,"text":"Montenegro"},{"id":134,"text":"Montserrat"},{"id":135,"text":"Morocco"},{"id":136,"text":"Mozambique"},{"id":137,"text":"Myanmar"},{"id":138,"text":"Namibia"},{"id":139,"text":"Nepal"},{"id":140,"text":"Netherlands"},{"id":141,"text":"New Caledonia"},{"id":142,"text":"New Zealand"},{"id":143,"text":"Nicaragua"},{"id":144,"text":"Niger"},{"id":145,"text":"Nigeria"},{"id":146,"text":"North Macedonia"},{"id":147,"text":"Northern Mariana Islands (Commonwealth of the)"},{"id":148,"text":"Norway"},{"id":149,"text":"occupied Palestinian territory(including east Jerusalem)"},{"id":150,"text":"Oman"},{"id":151,"text":"Other"},{"id":152,"text":"Pakistan"},{"id":153,"text":"Panama"},{"id":154,"text":"Papua New Guinea"},{"id":155,"text":"Paraguay"},{"id":156,"text":"Peru"},{"id":157,"text":"Philippines"},{"id":158,"text":"Poland"},{"id":159,"text":"Portugal"},{"id":160,"text":"Puerto Rico"},{"id":161,"text":"Qatar"},{"id":162,"text":"Republic of Korea"},{"id":163,"text":"Republic of Moldova"},{"id":164,"text":"Réunion"},{"id":165,"text":"Romania"},{"id":166,"text":"Russian Federation"},{"id":167,"text":"Rwanda"},{"id":168,"text":"Saint Barthélemy"},{"id":169,"text":"Saint Kitts and Nevis"},{"id":170,"text":"Saint Lucia"},{"id":171,"text":"Saint Martin"},{"id":172,"text":"Saint Pierre and Miquelon"},{"id":173,"text":"Saint Vincent and the Grenadines"},{"id":174,"text":"San Marino"},{"id":175,"text":"Sao Tome and Principe"},{"id":176,"text":"Saudi Arabia"},{"id":177,"text":"Senegal"},{"id":178,"text":"Serbia"},{"id":179,"text":"Seychelles"},{"id":180,"text":"Sierra Leone"},{"id":181,"text":"Singapore"},{"id":182,"text":"Sint Maarten"},{"id":183,"text":"Slovakia"},{"id":184,"text":"Slovenia"},{"id":185,"text":"Somalia"},{"id":186,"text":"South Africa"},{"id":187,"text":"South Sudan"},{"id":188,"text":"Spain"},{"id":189,"text":"Sri Lanka"},{"id":190,"text":"Sudan"},{"id":191,"text":"Suriname"},{"id":192,"text":"Sweden"},{"id":193,"text":"Switzerland"},{"id":194,"text":"Syrian Arab Republic"},{"id":195,"text":"Tajikistan"},{"id":196,"text":"Thailand"},{"id":197,"text":"The United Kingdom"},{"id":198,"text":"Timor-Leste"},{"id":199,"text":"Togo"},{"id":200,"text":"Trinidad and Tobago"},{"id":201,"text":"Tunisia"},{"id":202,"text":"Turkey"},{"id":203,"text":"Turks and Caicos Islands"},{"id":204,"text":"Uganda"},{"id":205,"text":"Ukraine"},{"id":206,"text":"United Arab Emirates"},{"id":207,"text":"United Republic of Tanzania"},{"id":208,"text":"United States of America"},{"id":209,"text":"United States Virgin Islands"},{"id":210,"text":"Uruguay"},{"id":211,"text":"Uzbekistan"},{"id":212,"text":"Venezuela (Bolivarian Republic of)"},{"id":213,"text":"Viet Nam"},{"id":214,"text":"Yemen"},{"id":215,"text":"Zambia"},{"id":216,"text":"Zimbabwe"}]

function initSelect2() {
  (function () {
    $(".js-select2").select2({
      data: countryNames,
      templateSelection: function (data) {
        if (data.id === "default") {
          // adjust for custom placeholder values
          return "Bangladesh";
        }

        return data.text;
      },
    });
    $(".js-select2-2").select2({
      data: countryNames,
      templateSelection: function (data) {
        if (data.id === "default") {
          // adjust for custom placeholder values
          return "Select a Country";
        }
        return data.text;
      },
    });

    $(".js-graphType").select2();
    $(".js-dataType").select2();
  })();

  //events when an option is selected

  //first list of country selection
  $(".js-select2").on("select2:select", function (e) {
    currentSelectedCountry = e.params.data.text.trim();
    // chart.destroy();
    getData(currentSelectedCountry, currentSelectedDataType).then(
      (response) => {
        // drawChart(currentSelectedGraphType, response);
        chart.data.datasets[0].data = response.ys;
        chart.update();

        // debug logs
        console.log(currentSelectedCountry);
        console.log(currentSelectedDataType);
        console.log(currentSelectedGraphType);
      }
    );
  });

  //adding compared country data
  $(".js-select2-2").on("select2:select", function (e) {
    currentSelectedCompare = e.params.data.text.trim();
    // chart.destroy();
    getData(currentSelectedCompare, currentSelectedDataType).then(
      (response) => {
        // drawChart(currentSelectedGraphType, response);
        const compareData = {
          label: "No. of " + currentSelectedDataType,
          data: response.ys,
          backgroundColor: "#dc3545",
          borderColor: "#dc3545",
          hoverBackgroundColor: "#0077b6",
          fill: false,
        };
        if (chart.data.datasets[1]) {
          chart.data.datasets.pop();
        }
        chart.data.datasets.push(compareData);

        chart.update();
        // debug logs
        // console.log(compareData);
        // console.log(currentSelectedCountry);
        // console.log(currentSelectedDataType);
        // console.log(currentSelectedGraphType);
      }
    );
  });

  //data type selection
  $(".js-dataType").on("select2:select", function (e) {
    currentSelectedDataType = e.params.data.text.trim();
    // chart.destroy();
    getData(currentSelectedCountry, currentSelectedDataType).then(
      (response) => {
        // drawChart(currentSelectedGraphType, response);
        chart.data.datasets[0].data = response.ys;
        chart.data.datasets[0].label = "No. of " + currentSelectedDataType;

        chart.update();
        // debug logs
        // console.log(currentSelectedCountry);
        // console.log(currentSelectedDataType);
        // console.log(currentSelectedGraphType);
      }
    );
  });

  //graph type selection
  //need to destroy old graph and draw a new one to change the type
  $(".js-graphType").on("select2:select", function (e) {
    currentSelectedGraphType = e.params.data.text.trim();
    chart.destroy();
    getData(currentSelectedCountry, currentSelectedDataType).then(
      (response) => {
        drawChart(currentSelectedGraphType.toLowerCase(), response);
        // chart.type = currentSelectedGraphType.trim().toLowerCase();
        // chart.update();
        // debug logs
        // console.log(currentSelectedCountry);
        // console.log(currentSelectedDataType);
        // console.log(chart.type);
      }
    );
    //drawing the compare data
    getData(currentSelectedCompare, currentSelectedDataType).then(
      (response) => {
        // drawChart(currentSelectedGraphType, response);
        const compareData = {
          label: "No. of " + currentSelectedDataType,
          data: response.ys,
          backgroundColor: "#dc3545",
          borderColor: "#dc3545",
          hoverBackgroundColor: "#0077b6",
          fill: false,
        };
        if (chart.data.datasets[1]) {
          chart.data.datasets.pop();
        }
        chart.data.datasets.push(compareData);

        chart.update();
      }
    );
  });
}

$(document).ready(initSelect2);

//::: data from csv

// getting the data async function
async function getData(getCountry = "Bangladesh", dataType = "New Cases") {
  const response = await fetch("assets/csv/global-data.csv");
  const data = await response.text();
  const xs = [];
  const ys = [];

  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const columns = row.split(",");
    const country = columns[2];
    const date = columns[0];
    const newCases = columns[4];
    const totalCases = columns[5];
    const newDeaths = columns[6];
    const totalDeaths = columns[7];

    //putting the data in arrays to plot it in the graph
    if (country == getCountry) {
      xs.push(date);
      if (dataType == "New Cases") {
        ys.push(newCases);
      } else if (dataType == "Cumulative Cases") {
        ys.push(totalCases);
      } else if (dataType == "New Deaths") {
        ys.push(newDeaths);
      } else if (dataType == "Cumulative Deaths") {
        ys.push(totalDeaths);
      }
    }
  });
  return { xs, ys };
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
      labels: plotData.xs,
      datasets: [
        {
          label: "No. of " + currentSelectedDataType,
          data: plotData.ys,
          backgroundColor: "#00b4d8",
          borderColor: "#00b4d8",
          hoverBackgroundColor: "#0077b6",
          fill: false,
        },
      ],
    },
  });
}

// async function printData() {
//   const data = await getData();
//   console.log(data.xs);
//   console.log(data.ys);
// }
// printData();

drawChart();
