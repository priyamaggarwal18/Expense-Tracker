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

            this.transactions.push({ id: Date.now(), amount, category, reason, date });
            this.saveToLocalStorage();
            return true;
        }

        editTransaction(id, newAmount, newCategory, newReason) {
            const transaction = this.transactions.find(trans => trans.id === id);
            if (transaction) {
                if (transaction.amount > 0) {
                    this.income -= transaction.amount;
                } else {
                    this.expense -= Math.abs(transaction.amount);
                }

                if (newAmount < 0 && (this.getBalance() + newAmount) < 0) {
                    if (transaction.amount > 0) {
                        this.income += transaction.amount;
                    } else {
                        this.expense += Math.abs(transaction.amount);
                    }
                    return false;
                }

                transaction.amount = newAmount;
                transaction.category = newCategory;
                transaction.reason = newReason;

                if (newAmount > 0) {
                    this.income += newAmount;
                } else {
                    this.expense += Math.abs(newAmount);
                }

                this.saveToLocalStorage();
                return true;
            }
            return false;
        }

        deleteTransaction(id) {
            const transactionIndex = this.transactions.findIndex(trans => trans.id === id);
            if (transactionIndex !== -1) {
                const transaction = this.transactions[transactionIndex];
                if (transaction.amount > 0) {
                    this.income -= transaction.amount;
                } else {
                    this.expense -= Math.abs(transaction.amount);
                }
                this.transactions.splice(transactionIndex, 1);
                this.saveToLocalStorage();
            }
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

            const actionCell = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-button';
            editButton.addEventListener('click', function () {
                showCustomPrompt('Edit Transaction', transaction, (newAmount, newCategory, newReason) => {
                    const editSuccess = currentUser.editTransaction(transaction.id, newAmount, newCategory, newReason);
                    if (editSuccess) {
                        updateDashboard();
                    } else {
                        showCustomAlert('Transaction cannot be processed. Balance would go negative.');
                    }
                });
            });
            actionCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', function () {
                showCustomPrompt('Are you sure you want to delete this transaction?', transaction, () => {
                    currentUser.deleteTransaction(transaction.id);
                    updateDashboard();
                }, true);
            });
            actionCell.appendChild(deleteButton);

            row.appendChild(amountCell);
            row.appendChild(categoryCell);
            row.appendChild(reasonCell);
            row.appendChild(dateCell);
            row.appendChild(actionCell);

            historyTableBody.appendChild(row);
        });
    }

    function showCustomPrompt(title, transaction, callback, isDelete = false) {
        const promptBox = document.createElement('div');
        promptBox.className = 'custom-prompt';

        const promptTitle = document.createElement('h3');
        promptTitle.textContent = title;
        promptBox.appendChild(promptTitle);

        let amountInput, categoryInput, reasonInput;

        if (!isDelete) {
            amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.value = transaction.amount;
            amountInput.placeholder = 'Amount';
            promptBox.appendChild(amountInput);

            categoryInput = document.createElement('input');
            categoryInput.type = 'text';
            categoryInput.value = transaction.category;
            categoryInput.placeholder = 'Category';
            promptBox.appendChild(categoryInput);

            reasonInput = document.createElement('input');
            reasonInput.type = 'text';
            reasonInput.value = transaction.reason;
            reasonInput.placeholder = 'Reason';
            promptBox.appendChild(reasonInput);
        }

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.className = 'custom-prompt-button';
        okButton.addEventListener('click', () => {
            if (isDelete) {
                callback();
            } else {
                const newAmount = parseFloat(amountInput.value);
                const newCategory = categoryInput.value.trim();
                const newReason = reasonInput.value.trim();

                if (!isNaN(newAmount) && newCategory && newReason) {
                    callback(newAmount, newCategory, newReason);
                } else {
                    showCustomAlert('Invalid input. Please fill in all fields.');
                }
            }
            promptBox.remove();
        });
        promptBox.appendChild(okButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.className = 'custom-prompt-button';
        cancelButton.addEventListener('click', () => {
            promptBox.remove();
        });
        promptBox.appendChild(cancelButton);

        document.body.appendChild(promptBox);
    }

    function showCustomAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.className = 'custom-alert';
        alertBox.textContent = message;

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.className = 'custom-alert-button';
        okButton.addEventListener('click', () => {
            alertBox.remove();
        });

        alertBox.appendChild(okButton);
        document.body.appendChild(alertBox);
    }

    document.getElementById('transaction-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value.trim();
        const reason = document.getElementById('reason').value.trim();

        if (amount && category && reason) {
            const transactionSuccess = currentUser.addTransaction(amount, category, reason);
            if (transactionSuccess) {
                this.reset();
                updateDashboard();
            } else {
                showCustomAlert('Transaction cannot be processed. Balance would go negative.');
            }
        } else {
            showCustomAlert('Please fill all fields.');
        }
    });

    document.getElementById('clear-history').addEventListener('click', function () {
        currentUser.clearHistory();
        updateDashboard();
    });

    document.getElementById('logout-button').addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    document.getElementById('download-history').addEventListener('click', function () {
        const historyContent = document.getElementById('history-table').cloneNode(true);
        const actionsHeader = historyContent.querySelector('thead th:last-child');
        if (actionsHeader) actionsHeader.remove();
        
        const actionCells = historyContent.querySelectorAll('tbody td:last-child');
        actionCells.forEach(cell => cell.remove());
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${currentUsername}-history</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            padding: 10px;
                            border: 1px solid #ccc;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>${currentUsername}'s Transaction History</h2>
                    ${historyContent.outerHTML}
                </body>
            </html>
        `);
    
        printWindow.document.close();
        printWindow.print();
        printWindow.onafterprint = function () {
            printWindow.close();
        };
    });
    

    updateDashboard();
});
