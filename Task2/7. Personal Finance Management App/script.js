const expenses = [
  { desc: "Groceries", amount: 150, category: "Food" },
  { desc: "Bus Pass", amount: 50, category: "Transport" },
  { desc: "Netflix", amount: 20, category: "Entertainment" },
  { desc: "Electricity Bill", amount: 100, category: "Bills" }
];

function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";
  expenses.forEach(exp => {
    list.innerHTML += `<li>${exp.desc} – ₹${exp.amount} (${exp.category})</li>`;
  });
}

function addExpense() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (desc && amount && category) {
    expenses.push({ desc, amount, category });
    renderExpenses();
    updateChart();
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
  }
}

function updateChart() {
  const categories = ["Food", "Transport", "Entertainment", "Bills"];
  const totals = categories.map(cat =>
    expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  );

  chart.data.datasets[0].data = totals;
  chart.update();
}

const ctx = document.getElementById("budgetChart").getContext("2d");
const chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Food", "Transport", "Entertainment", "Bills"],
    datasets: [{
      label: "Expenses",
      data: [150, 50, 20, 100],
      backgroundColor: ["#e74c3c", "#3498db", "#9b59b6", "#f1c40f"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

window.onload = () => {
  renderExpenses();
};
