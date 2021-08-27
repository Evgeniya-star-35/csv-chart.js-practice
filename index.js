var ctx = document.getElementById("myChart").getContext("2d");
const GLOBAL_MEAN_TEMP = 14;

function fetchData() {
  return fetch("./ZonAnn.Ts+dSST.csv").then((response) => response.text());
}
fetchData()
  .then(parseDate)
  .then(getLabelsAndData)
  .then(({ years, temps, southHem, northHem }) => drawChart(years, temps));

function parseDate(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelsAndData(data) {
  return data.reduce(
    (acc, el) => {
      acc.years.push(el.Year);
      acc.temps.push(Number(el.Glob) + GLOBAL_MEAN_TEMP);
      acc.northHem.push(Number(el.NHem) + GLOBAL_MEAN_TEMP);
      acc.southHem.push(Number(el.SHem) + GLOBAL_MEAN_TEMP);
      return acc;
    },
    {
      years: [],
      temps: [],
      southHem: [],
      northHem: [],
    }
  );
}

function drawChart(labels, data) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels, //on the x-axis to the left
      datasets: [
        {
          label: "# Global average temps",
          data, //on the y-axis to the left
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback(value) {
              return value + "°";
            },
          },
        },
      },
    },
  });
}
// const southChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: mapData.years, //on the x-axis to the left
//     datasets: [
//       {
//         label: "# temps in the southern hemisphere",
//         data: mapData.southHem,
//         //on the y-axis to the left borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   },
// });
// });
// }
