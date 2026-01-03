// DOM Elements
const totalBal = document.getElementById("total-bal");
const income = document.getElementById("income-balance");
const expense = document.getElementById("expense-balance");
const historyList = document.getElementById("history-list");
const amountInput = document.getElementById("amount-input");
const purposeInput = document.getElementById("purpose-input");
const dateInput = document.getElementById("date-input");
const addButton = document.querySelector(".add-btn");
const currentMonthDisplay = document.getElementById("current-month");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const typeButtons = document.querySelectorAll(".type-btn");

// State
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedType = "income"; // 'income' or 'expense'

// Initialize date input to today
dateInput.valueAsDate = new Date();

// Load data from localStorage
function loadData() {
  const data = localStorage.getItem("expenseTrackerData");
  return data ? JSON.parse(data) : {};
}

// Save data to localStorage
function saveData(data) {
  localStorage.setItem("expenseTrackerData", JSON.stringify(data));
}

// Get month key (YYYY-MM format)
function getMonthKey(year, month) {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

// Get current month key
function getCurrentMonthKey() {
  return getMonthKey(currentYear, currentMonth);
}

// Format currency
function formatCurrency(amount) {
  return `$${Math.abs(amount).toFixed(2)}`;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Update month display
function updateMonthDisplay() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

// Calculate monthly totals
function calculateMonthlyTotals(transactions) {
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      incomeTotal += transaction.amount;
    } else {
      expenseTotal += transaction.amount;
    }
  });

  return {
    income: incomeTotal,
    expense: expenseTotal,
    balance: incomeTotal - expenseTotal,
  };
}

// Update balance display
function updateBalanceDisplay() {
  const data = loadData();
  const monthKey = getCurrentMonthKey();
  const transactions = data[monthKey] || [];
  const totals = calculateMonthlyTotals(transactions);

  totalBal.textContent = formatCurrency(totals.balance);
  income.textContent = formatCurrency(totals.income);
  expense.textContent = formatCurrency(totals.expense);

  // Update color based on balance
  if (totals.balance >= 0) {
    totalBal.style.color = "#34d399";
  } else {
    totalBal.style.color = "#f87171";
  }
}

// Display transactions
function displayTransactions() {
  const data = loadData();
  const monthKey = getCurrentMonthKey();
  const transactions = data[monthKey] || [];

  // Sort by date (newest first)
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  historyList.innerHTML = "";

  if (transactions.length === 0) {
    const li = document.createElement("li");
    li.className = "history-item";
    li.textContent = "No transactions for this month";
    li.style.opacity = "0.6";
    historyList.appendChild(li);
    return;
  }

  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    const leftDiv = document.createElement("div");
    leftDiv.style.display = "flex";
    leftDiv.style.flexDirection = "column";
    leftDiv.style.gap = "4px";

    const purposeSpan = document.createElement("span");
    purposeSpan.textContent = transaction.purpose || "No description";
    purposeSpan.style.fontWeight = "500";
    purposeSpan.style.color = "#f8fafc";

    const dateSpan = document.createElement("span");
    dateSpan.textContent = formatDate(transaction.date);
    dateSpan.style.fontSize = "12px";
    dateSpan.style.opacity = "0.7";
    dateSpan.style.color = "#cbd5e1";

    leftDiv.appendChild(purposeSpan);
    leftDiv.appendChild(dateSpan);

    const amountSpan = document.createElement("span");
    const sign = transaction.type === "income" ? "+" : "-";
    amountSpan.textContent = `${sign}${formatCurrency(transaction.amount)}`;
    amountSpan.style.fontWeight = "600";
    amountSpan.style.color =
      transaction.type === "income" ? "#34d399" : "#f87171";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.border = "none";
    deleteBtn.style.color = "#f87171";
    deleteBtn.style.fontSize = "24px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.padding = "0 8px";
    deleteBtn.style.marginLeft = "12px";
    deleteBtn.onclick = () => deleteTransaction(transaction.id);

    const rightDiv = document.createElement("div");
    rightDiv.style.display = "flex";
    rightDiv.style.alignItems = "center";
    rightDiv.appendChild(amountSpan);
    rightDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    historyList.appendChild(li);
  });
}

// Add transaction
function addTransaction() {
  const amount = parseFloat(amountInput.value);
  const purpose = purposeInput.value.trim();
  const date = dateInput.value;

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  if (!date) {
    alert("Please select a date");
    return;
  }

  const transactionDate = new Date(date);
  const transactionMonth = transactionDate.getMonth();
  const transactionYear = transactionDate.getFullYear();
  const monthKey = getMonthKey(transactionYear, transactionMonth);

  const data = loadData();
  if (!data[monthKey]) {
    data[monthKey] = [];
  }

  const transaction = {
    id: Date.now(),
    type: selectedType,
    amount: amount,
    purpose: purpose || "No description",
    date: date,
  };

  data[monthKey].push(transaction);
  saveData(data);

  // Clear inputs
  amountInput.value = "";
  purposeInput.value = "";
  dateInput.valueAsDate = new Date();

  // Update display if viewing the same month
  if (monthKey === getCurrentMonthKey()) {
    updateBalanceDisplay();
    displayTransactions();
  } else {
    alert(`Transaction added to ${new Date(transactionYear, transactionMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`);
  }
}

// Delete transaction
function deleteTransaction(id) {
  const data = loadData();
  const monthKey = getCurrentMonthKey();
  const transactions = data[monthKey] || [];

  const index = transactions.findIndex((t) => t.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
    data[monthKey] = transactions;
    saveData(data);
    updateBalanceDisplay();
    displayTransactions();
  }
}

// Change month
function changeMonth(direction) {
  if (direction === "prev") {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
  } else {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }
  updateMonthDisplay();
  updateBalanceDisplay();
  displayTransactions();
}

// Transaction type selection
typeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    typeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedType = btn.dataset.type;
  });
});

// Event listeners
addButton.addEventListener("click", addTransaction);
prevMonthBtn.addEventListener("click", () => changeMonth("prev"));
nextMonthBtn.addEventListener("click", () => changeMonth("next"));

// Allow Enter key to submit
amountInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTransaction();
});
purposeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTransaction();
});

// Initialize
updateMonthDisplay();
updateBalanceDisplay();
displayTransactions();
