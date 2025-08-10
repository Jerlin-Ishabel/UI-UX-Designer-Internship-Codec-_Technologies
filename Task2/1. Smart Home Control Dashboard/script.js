let temperature = 72;

function adjustTemp(change) {
  temperature += change;
  document.getElementById("tempDisplay").textContent = `${temperature}° (Cooling)`;
}

function lockAll() {
  const securityToggles = document.querySelectorAll("#security input[type='checkbox']");
  securityToggles.forEach(toggle => toggle.checked = true);

  const status = document.getElementById("lockStatus");
  status.textContent = "Status: 🔒 Locked";
  status.style.color = "#00796b";
  status.style.fontWeight = "bold";
}

function unlockAll() {
  const securityToggles = document.querySelectorAll("#security input[type='checkbox']");
  securityToggles.forEach(toggle => toggle.checked = false);

  const status = document.getElementById("lockStatus");
  status.textContent = "Status: 🔓 Unlocked";
  status.style.color = "#d32f2f";
  status.style.fontWeight = "bold";
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

function toggleSection(id) {
  document.querySelectorAll(".card").forEach(card => card.style.display = "none");
  const section = document.getElementById(id);
  if (section) {
    section.style.display = "block";

    // If energy section is shown, initialize chart
    if (id === "energy" && !window.energyChartInitialized) {
      const ctx = document.getElementById('energyChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Energy Usage',
            data: [12, 19, 3, 5, 2, 3, 9],
            borderColor: '#00796b',
            backgroundColor: 'rgba(0, 121, 107, 0.2)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
      window.energyChartInitialized = true;
    }
  }
}
