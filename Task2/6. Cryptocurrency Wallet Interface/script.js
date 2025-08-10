const balances = {
  Bitcoin: 0.75,
  Ethereum: 3.2,
  Solana: 120,
  Cardano: 500
};

const transactions = [
  { type: "Received", currency: "Bitcoin", amount: 0.25, date: "2025-08-10" },
  { type: "Sent", currency: "Ethereum", amount: 1.0, date: "2025-08-09" },
  { type: "Received", currency: "Solana", amount: 60, date: "2025-08-08" },
  { type: "Sent", currency: "Cardano", amount: 100, date: "2025-08-07" }
];

function displayBalances() {
  const list = document.getElementById("balances");
  list.innerHTML = "";
  for (const [currency, amount] of Object.entries(balances)) {
    list.innerHTML += `<li><strong>${currency}:</strong> ${amount}</li>`;
  }
}

function displayTransactions() {
  const list = document.getElementById("transactions");
  list.innerHTML = "";
  transactions.forEach(tx => {
    list.innerHTML += `<li>${tx.date} – ${tx.type} ${tx.amount} ${tx.currency}</li>`;
  });
}

function showSecurityPrompt() {
  document.getElementById("securityPrompt").classList.remove("hidden");
}

function closePrompt() {
  document.getElementById("securityPrompt").classList.add("hidden");
}

function enable2FA() {
  alert("✅ Two-Factor Authentication Enabled!");
  closePrompt();
}

window.onload = () => {
  displayBalances();
  displayTransactions();
};
