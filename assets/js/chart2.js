const PercentageSalesByCategory = [
  {
    Category: "Food",
    Total_Sales: 9376.75,
  },
  {
    Category: "Carbonated",
    Total_Sales: 5051.25,
  },
  {
    Category: "Non Carbonated",
    Total_Sales: 2681.5,
  },
  {
    Category: "Water",
    Total_Sales: 1221.25,
  },
];

const PercentageSalesSixMonth = [
  {
    Category: "Food",
    Total_Sales: 3956.75,
  },
  {
    Category: "Carbonated",
    Total_Sales: 2223.25,
  },
  {
    Category: "Non Carbonated",
    Total_Sales: 1125.75,
  },
  {
    Category: "Water",
    Total_Sales: 627.25,
  },
];

const allTimeData6 = PercentageSalesByCategory.map((item) => ({
  Category: item.Category,
  Total_Sales: parseFloat(item.Total_Sales),
}));

const sixMonthData6 = PercentageSalesSixMonth.map((item) => ({
  Category: item.Category,
  Total_Sales: parseFloat(item.Total_Sales),
}));

let allTimeCurrentData6 = allTimeData6;
let sixMonthCurrentData6 = sixMonthData6;

let currentData6 = allTimeCurrentData6;

const ctx = document.getElementById("piechart").getContext("2d");

function getBlueShades() {
  const blueShades = ["#050C9C", "#3572EF", "#3ABEF9", "#A7E6FF"];
  let currentIndex = 0;
  return function () {
    if (currentIndex >= blueShades.length) {
      currentIndex = 0;
    }
    return blueShades[currentIndex++];
  };
}

const getNextBlueShade = getBlueShades();
const backgroundColors = allTimeData6.map(() => getNextBlueShade());

let pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: currentData6.map((item) => item.Category),
    datasets: [
      {
        data: currentData6.map((item) => item.Total_Sales),
        backgroundColor: backgroundColors, // Use dynamic backgroundColors array
        borderColor: backgroundColors.map((color) => color.replace("0.2", "1")), // Adjust borderColor accordingly if needed
        borderWidth: 1,
      },
    ],
  },
});

function updateChart6(data) {
  pieChart.data.labels = data.map((item) => item.Category);
  pieChart.data.datasets[0].data = data.map((item) => item.Total_Sales);
  pieChart.update();
}

updateChart6(allTimeCurrentData6);

document
  .getElementById("categoryFilter")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "alltime") {
      currentData6 = allTimeCurrentData6;
      updateChart6(allTimeCurrentData6);
    } else if (selectedCategory === "sixmonth") {
      currentData6 = sixMonthCurrentData6;
      updateChart6(sixMonthCurrentData6);
    }
  });
