function saveUserProfile() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const age = document.getElementById("userAge").value;

  if (!name || !email || !age) {
    alert("Please enter name, email, and age.");
    return;
  }

  localStorage.setItem("userProfile", JSON.stringify({ name, email, age }));
  alert("Profile saved!");
}

function bookAppointment() {
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!date || !time) {
    alert("Please select both date and time.");
    return;
  }

  const confirmation = document.getElementById("confirmation");
  confirmation.innerHTML = `
    <h3>Appointment Confirmed!</h3>
    <p>You have booked an appointment with <strong>${doctor}</strong> on <strong>${date}</strong> at <strong>${time}</strong>.</p>
  `;

  scheduleReminder(doctor, date, time);
}

function scheduleReminder(doctor, date, time) {
  const appointmentTime = new Date(`${date}T${time}`);
  const now = new Date();
  const timeUntilReminder = appointmentTime - now - 3600000; // 1 hour before

  if (timeUntilReminder > 0) {
    setTimeout(() => {
      alert(`Reminder: Your appointment with ${doctor} is in 1 hour.`);
    }, timeUntilReminder);
  }
}
