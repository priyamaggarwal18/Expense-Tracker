document.addEventListener('DOMContentLoaded', function () {
    class User {
        constructor(username, password) {
            this.username = username;
            this.password = password;
            this.transactions = [];
            this.income = 0;
            this.expense = 0;
        }

        addTransaction(amount, category, reason) {
            const date = new Date().toLocaleString();

            if (amount < 0 && (this.getBalance() + amount) < 0) {
                return false;
            }

            if (amount > 0) {
                this.income += amount;
            } else {
                this.expense += Math.abs(amount);
            }

            this.transactions.push({ amount, category, reason, date });
            this.saveToLocalStorage();
            return true;
        }

        getBalance() {
            return this.income - this.expense;
        }

        clearHistory() {
            this.transactions = [];
            this.income = 0;
            this.expense = 0;
            this.saveToLocalStorage();
        }

        saveToLocalStorage() {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex(u => u.username === this.username);
            if (userIndex !== -1) {
                users[userIndex] = this;
                localStorage.setItem("users", JSON.stringify(users));
            }
        }

        static loadFromLocalStorage(username) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userData = users.find(user => user.username === username);
            if (userData) {
                const user = new User(userData.username, userData.password);
                Object.assign(user, userData);
                return user;
            }
            return null;
        }
    }

    const currentUsername = localStorage.getItem("currentUser");
    let currentUser = User.loadFromLocalStorage(currentUsername);

    if (!currentUser) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('welcome-user').textContent = `Hi 👋, ${currentUser.username}`;
        updateDashboard();
    }

    function updateDashboard() {
        document.getElementById('balance').textContent = currentUser.getBalance().toFixed(2);
        document.getElementById('income').textContent = currentUser.income.toFixed(2);
        document.getElementById('expense').textContent = currentUser.expense.toFixed(2);
        updateHistoryTable();
    }

    function updateHistoryTable() {
        const historyTableBody = document.getElementById('history-table-body');
        historyTableBody.innerHTML = '';

        const sortedTransactions = currentUser.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedTransactions.forEach(transaction => {
            const row = document.createElement('tr');

            const amountCell = document.createElement('td');
            amountCell.textContent = transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount;

            const categoryCell = document.createElement('td');
            categoryCell.textContent = transaction.category;

            const reasonCell = document.createElement('td');
            reasonCell.textContent = transaction.reason;

            const dateCell = document.createElement('td');
            dateCell.textContent = transaction.date;

            row.appendChild(amountCell);
            row.appendChild(categoryCell);
            row.appendChild(reasonCell);
            row.appendChild(dateCell);

            historyTableBody.appendChild(row);
        });
    }

    document.getElementById('transaction-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value.trim();
        const reason = document.getElementById('reason').value.trim();
        const warningMessage = document.getElementById('warning');

        if (amount && category && reason) {
            const transactionSuccess = currentUser.addTransaction(amount, category, reason);
            if (transactionSuccess) {
                this.reset();
                warningMessage.textContent = "";
                updateDashboard();
            } else {
                warningMessage.textContent = "Transaction cannot be processed. Balance would go negative.";
            }
        } else {
            warningMessage.textContent = "Please fill all fields.";
        }
    });

    document.getElementById('clear-history').addEventListener('click', function () {
        currentUser.clearHistory();
        updateDashboard();
    });

    document.getElementById('logout-button').addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    updateDashboard();
});
