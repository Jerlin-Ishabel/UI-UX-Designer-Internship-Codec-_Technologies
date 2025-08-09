const form = document.getElementById("workout-form");
const logBody = document.getElementById("log-body");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("workout-name").value;
  const duration = document.getElementById("duration").value;

  const row = document.createElement("tr");
  row.innerHTML = `<td>${name}</td><td>${duration}</td>`;
  logBody.appendChild(row);

  form.reset();
});
