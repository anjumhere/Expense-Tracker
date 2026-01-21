V<div align="center">

  <h1>💰 Monthly Expense Tracker</h1>
  <p>
    A modern, interactive expense tracker built with HTML, CSS, and Vanilla JavaScript to manage your income and expenses effortlessly.
  </p>
  <img src="https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

---

## 📖 Project Overview

The **Monthly Expense Tracker** is a user-friendly web application designed to help you:

- Track your income and expenses month by month.
- View a running balance of your finances.
- Maintain a history of transactions with dates and descriptions.
- Switch between months to see past or future transactions.

The app is fully built in **Vanilla JavaScript** and leverages **localStorage** to store your financial data directly in your browser.

---

## ✨ Features

- **Add Transactions:** Easily add income or expense transactions with amount, purpose, and date.
- **Dynamic Balance:** The total balance automatically updates based on your income and expenses.
- **Monthly View:** Navigate between months to view historical transactions.
- **Color-Coded Totals:**
  - Green for income/positive balance.
  - Red for expenses/negative balance.
- **Transaction History:** Sorted by newest first with clear labels, dates, and delete functionality.
- **Responsive Design:** Works on desktops, tablets, and mobile devices.
- **LocalStorage Support:** All your data is saved automatically in your browser for offline access.

---

## 🛠️ How It Works

1. **Transaction Entry**
   - Enter the amount, purpose, and date.
   - Select **Income** or **Expense**.
   - Click **Add** to record the transaction.
2. **Monthly Overview**
   - Navigate between months using **Previous** and **Next** buttons.
   - View total income, expenses, and net balance for the selected month.
3. **Deleting Transactions**
   - Each transaction has a delete (×) button.
   - Clicking it removes the transaction and updates totals automatically.
4. **Keyboard Shortcuts**
   - Press **Enter** while focused on amount or purpose to quickly add a transaction.

---

## 📂 Project Structure

├── index.html # HTML layout
├── style.css # Styling & responsive design
├── script.js # Core JS logic for transactions & display
└── README.md # Project documentation

yaml
Copy code

---

## 🎨 Design

- **Glassmorphism-inspired UI:** Semi-transparent containers with subtle shadows.
- **Color-coded elements:** Green for income, red for expenses for easy readability.
- **Responsive:** Adjusts layout for mobile, tablet, and desktop.
- **Dynamic month navigation:** Smoothly updates totals and transaction history for selected month.

---

## ⚡ Usage

1. Clone the repository:

```bash
git clone https://github.com/yourusername/expense-tracker.git
```
