document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;
  const desc = document.getElementById("eventDesc").value;

  if (!name || !date) return alert("Please fill all required fields!");

  const list = document.getElementById("eventList");

  const li = document.createElement("li");
  li.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Date:</strong> ${date}</p>
    <p>${desc}</p>
    <div class="event-actions">
      <button class="share-btn" onclick="shareEvent('${name}', '${date}', '${desc}')">Share</button>
      <button class="delete-btn" onclick="this.parentElement.parentElement.remove()">Delete</button>
    </div>
  `;

  list.appendChild(li);

  // Clear the form
  document.getElementById("eventForm").reset();
});

function shareEvent(name, date, desc) {
  const message = `📅 Event: ${name}\n🗓 Date: ${date}\n📝 Details: ${desc}`;
  navigator.clipboard.writeText(message)
    .then(() => alert("Event copied to clipboard!"))
    .catch(() => alert("Could not copy event details."));
}
