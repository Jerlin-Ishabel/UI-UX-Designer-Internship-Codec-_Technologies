const screenTimeHours = [2.5, 3.2, 4.0, 3.8, 5.1, 4.6, 3.9];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ctx = document.getElementById("screenTimeChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: days,
    datasets: [{
      label: "Hours per Day",
      data: screenTimeHours,
      backgroundColor: "#60a5fa"
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `📊 Avg Daily Screen Time: ${average(screenTimeHours)} hrs`
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

function average(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  return (sum / arr.length).toFixed(1);
}

const insights = [
  "📈 You spent 5.1 hrs on your phone yesterday.",
  "🧘‍♀️ Consider a 30-min offline break today.",
  "🌙 Screen time after 10 PM increased this week.",
  "📵 Try a no-phone hour during meals.",
  "🎯 You met your goal of <4 hrs/day twice this week!"
];

const insightList = document.getElementById("insightList");
insights.forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  insightList.appendChild(li);
});

const insightForm = document.getElementById("insightForm");
const insightInput = document.getElementById("insightInput");

insightForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const userInsight = insightInput.value.trim();
  if (userInsight) {
    const li = document.createElement("li");
    li.textContent = `📝 ${userInsight}`;
    insightList.appendChild(li);
    insightInput.value = "";
  }
});

const reminderText = document.getElementById("reminderText");
function sendReminder() {
  const messages = [
    "🔔 Time to stretch and rest your eyes!",
    "💡 Take a 15-min walk without your phone.",
    "🛌 Wind down — avoid screens before bed.",
    "📚 Try reading a book instead of scrolling.",
    "☕ Enjoy a mindful break — no devices!"
  ];
  const random = messages[Math.floor(Math.random() * messages.length)];
  reminderText.textContent = random;
}
