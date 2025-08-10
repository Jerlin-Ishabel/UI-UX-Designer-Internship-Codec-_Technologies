let map;

function saveTrip() {
  const destination = document.getElementById("destination").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const transportMode = document.getElementById("transportMode").value;
  const budgetEstimate = document.getElementById("budgetEstimate").value;
  const collaborators = document.getElementById("collaborators").value.split(",").map(email => email.trim());
  const activities = document.getElementById("activities").value;
  const notes = document.getElementById("notes").value;

  if (!destination || !startDate || !endDate) {
    alert("Please fill in destination and dates.");
    return;
  }

  const trip = {
    destination,
    startDate,
    endDate,
    transportMode,
    budgetEstimate,
    collaborators,
    activities,
    notes,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("tripPlan", JSON.stringify(trip));
  displayTripSummary(trip);
  updateMap(destination);
}

function displayTripSummary(trip) {
  const summary = document.getElementById("trip-summary");
  summary.innerHTML = `
    <h3>Your Trip to ${trip.destination}</h3>
    <p><strong>Dates:</strong> ${trip.startDate} to ${trip.endDate}</p>
    <p><strong>Transport:</strong> ${trip.transportMode}</p>
    <p><strong>Budget:</strong> ${trip.budgetEstimate}</p>
    <p><strong>Activities:</strong><br>${trip.activities.replace(/\n/g, "<br>")}</p>
    <p><strong>Collaborators:</strong> ${trip.collaborators.join(", ")}</p>
    <p><strong>Notes:</strong> ${trip.notes}</p>
    <p><em>Created at: ${new Date(trip.createdAt).toLocaleString()}</em></p>
  `;
}

function updateMap(destination) {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];

        if (!map) {
          map = L.map('map').setView([lat, lon], 10);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
        } else {
          map.setView([lat, lon], 10);
        }

        L.marker([lat, lon]).addTo(map)
          .bindPopup(`Your destination: ${display_name}`)
          .openPopup();
      } else {
        alert("Location not found!");
      }
    })
    .catch(() => alert("Error loading map"));
}

window.onload = () => {
  const storedTrip = localStorage.getItem("tripPlan");
  if (storedTrip) {
    const trip = JSON.parse(storedTrip);
    displayTripSummary(trip);
    updateMap(trip.destination);
  } else {
    updateMap("Kerala");
  }
};
