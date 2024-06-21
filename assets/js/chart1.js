// script.js

// Mengimpor data dari file JSON
const allTimeData = [
  { location: "EB Public Library", total_sales: "6347.75" },
  { location: "Brunswick Sq Mall", total_sales: "3270.0" },
  { location: "Earle Asphalt", total_sales: "1808.75" },
  { location: "GuttenPlans", total_sales: "6904.25" },
];

// Data untuk enam bulan terakhir (dummy data)
const sixMonthData = [
  { location: "Location A", total_sales: "600.20" },
  { location: "Location B", total_sales: "400.30" },
  { location: "Location C", total_sales: "700.50" },
  { location: "Location D", total_sales: "550.80" },
];

// Mengonversi total_sales menjadi float untuk kedua dataset
const allTimeDataFormatted = allTimeData.map((item) => ({
  location: item.location,
  total_sales: parseFloat(item.total_sales),
}));

const sixMonthDataFormatted = sixMonthData.map((item) => ({
  location: item.location,
  total_sales: parseFloat(item.total_sales),
}));

// Set data saat ini ke allTimeDataFormatted secara default
let currentData = allTimeDataFormatted;

// Inisialisasi grafik menggunakan Chart.js
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("barchart").getContext("2d");

  let barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: currentData.map((item) => item.location),
      datasets: [
        {
          label: "Total Sales",
          data: currentData.map((item) => item.total_sales),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Mendengarkan perubahan pada dropdown filter kategori
  document
    .getElementById("categoryFilter")
    .addEventListener("change", function (event) {
      const selectedCategory = event.target.value;
      updateChartData(selectedCategory);
    });

  // Fungsi untuk memperbarui data grafik berdasarkan kategori yang dipilih
  function updateChartData(category) {
    console.log("Selected Category:", category);

    if (category === "alltime") {
      currentData = allTimeDataFormatted;
    } else if (category === "sixmonth") {
      currentData = sixMonthDataFormatted;
    }

    console.log("Current Data:", currentData);

    // Memperbarui label dan data dataset pada grafik
    barChart.data.labels = currentData.map((item) => item.location);
    barChart.data.datasets[0].data = currentData.map(
      (item) => item.total_sales
    );
    barChart.update(); // Memperbarui grafik
  }

  // Fungsi untuk memperbarui urutan data dalam grafik (ascending atau descending)
  function updateChart(order) {
    if (order === "asc") {
      currentData.sort((a, b) => a.total_sales - b.total_sales);
    } else {
      currentData.sort((a, b) => b.total_sales - a.total_sales);
    }

    // Memperbarui label dan data dataset pada grafik setelah disortir
    barChart.data.labels = currentData.map((item) => item.location);
    barChart.data.datasets[0].data = currentData.map(
      (item) => item.total_sales
    );
    barChart.update(); // Memperbarui grafik
  }

  // Mendengarkan klik pada tombol untuk mengurutkan secara ascending
  document
    .getElementById("sortAsc")
    .addEventListener("click", () => updateChart("asc"));

  // Mendengarkan klik pada tombol untuk mengurutkan secara descending
  document
    .getElementById("sortDesc")
    .addEventListener("click", () => updateChart("desc"));

  // Setel dropdown filter kategori ke "All Time" secara default
  document.getElementById("categoryFilter").value = "alltime";
  updateChartData("alltime"); // Memperbarui grafik dengan data "All Time"
});
