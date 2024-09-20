<div align="center">
  <img src="./static/Images/expenze.png" alt="banner" />
</div>
<div align="center">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/priyamaggarwal18/Expense-Tracker?style=for-the-badge&color=orange">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/priyamaggarwal18/Expense-Tracker?style=for-the-badge&color=orange">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/priyamaggarwal18/Expense-Tracker?style=for-the-badge&color=orange">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/priyamaggarwal18/Expense-Tracker?style=for-the-badge&color=orange">
</div>



# 

**```Expenze```** is a user-friendly and mobile-friendly web application designed to help you monitor your daily expenses, track income, and maintain a detailed transaction history. With a clean and intuitive dashboard, users can easily add, edit, and delete transactions. The application includes features such as login, signup, and a convenient option to print the transaction history, making financial tracking simpler and more accessible.


<br>

## Table of Contents

- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [How To Use this Project](#how-to-use-this-project)
- [Check Responsive](#check-responsive)
- [Local Storage Schema](#local-storage-schema)
- [Concepts Used](#concepts-used)
- [Future Scope](#future-scope)

<br>

## Key Features

- **Track Income and Expenses**: Add income and expenses through a simple form with validation to prevent negative balance transactions.
- **Detailed Transaction History**: View a table of all transactions, sortable and editable, with options to delete individual entries.
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on transactions seamlessly within the app.
- **Login and Signup**: Implemented using local storage, allowing users to manage their own accounts and data.
- **Balance Calculation**: Automatically calculates the balance based on transactions, showing income and expenses separately.
- **Print History**: Provides the ability to print the transaction history directly from the application.
- **Responsive Design**: Built with CSS Grid and media queries to ensure the application looks great on all devices.


[🔝](#table-of-contents)

<br>

## Project Structure 

```bash
Expense-Tracker/
├── Images/                   # Folder containing images for icons , backgrounds etc.
├── Scripts/                  # JavaScript files
│   ├── dashboard.js          # Core functionality (CRUD operations, transaction handling , print history)
│   ├── login.js              # Login, signup, and user validation logic
│   ├── index.js              # Scripts for the landing page
├── Styles/                   # CSS files for styling
│   ├── dashboard.css         # Styles for the dashboard
│   ├── login.css             # Styles for login and signup pages
│   ├── index.css             # Styles for the landing page
├── index.html                # Landing page of the application (entry point)
├── login.html                # Login and signup page
├── dashboard.html            # Main application dashboard
├── README.md                 # Project documentation
```
[🔝](#table-of-contents)

<br>

## How to Use This Project

### Prerequisites:
- Make sure you have [Node.js](https://nodejs.org/en/) installed.
- A GitHub account to clone the repository.
- (Optional) A text editor like [VS Code](https://code.visualstudio.com/).

### Steps to Get Started:

1. **Clone the Repository:**
   Open your terminal and run the following command:
   ```bash
   git clone https://github.com/priyamaggarwal18/Expense-Tracker.git
   ```
   
2. **Navigate to the Project Directory:**
   Once the repository is cloned, navigate to the project folder
   ```bash
   cd Expense-Tracker
   ```
3. **Install Dependencies:**
  The project uses some npm packages such as ```gh-pages``` and ```express```. Install them by running:
   ```bash
   npm install
   ```
4. **Run the Project:**
   ```bash
   npm start
   ```
   This will start the server locally on ```http://localhost:8080```.
5. **Deploy to GitHub Pages (Optional):**
   To deploy the project to GitHub Pages (if you've cloned the repository and made changes), you can run:
   ```bash
   npm run deploy
   ```
   This will deploy the ```static``` folder to the ```gh-pages``` branch, making the website live at your GitHub Pages URL.
   
6. **Deploy to GitHub Pages (Optional):**
    To deploy the project to GitHub Pages (if you've cloned the repository and made changes), you can run:
    ```bash
    npm run deploy
    ```
    this will deploy the ```static``` folder to the ```gh-pages``` branch, making the website live at your ```GitHub Pages URL```.

[🔝](#table-of-contents)

   <br>

## Check Responsive

Expenze is designed with a mobile-first approach, ensuring a seamless experience across all devices. Click the image below to view the app's responsive design in action.

<div align="center">
  <a href="https://ui.dev/amiresponsive?url=https://priyamaggarwal18.github.io/Expense-Tracker/" target="_blank">
    <img src="./static/Images/responsive.png" alt="Responsive design demonstration" />
  </a>
</div>

[🔝](#table-of-contents)

<br>

## Local Storage Schema

The application uses local storage to manage user data and transactions. The schema is structured as follows:

```bash
Local Storage/
├── currentUser                # Stores the username of the currently logged-in user as a string.
├── users                      # An array of user objects.
│   ├── username               # Unique username for the user (string).
│   ├── password               # User's password (string).
│   ├── transactions           # Array of transaction objects.
│   │   ├── amount             # Transaction amount (number).
│   │   ├── category           # Category of the transaction (string).
│   │   ├── reason             # Reason for the transaction (string).
│   │   ├── date               # Date and time of the transaction (string).
│   ├── income                 # Total income for the user (number).
│   ├── expense                # Total expenses for the user (number).
```
Below is a sample structure of the local storage:

<div align="center">
  <img src="./static/Images/local_storage.png" alt="Local Storage Schema Example" />
</div>

[🔝](#table-of-contents)

<br>

## Concepts Used

- **JavaScript Classes**: Utilized to encapsulate user data and transactions, providing a clean and structured approach to managing user operations.
- **Local Storage**: Used for storing user information and transactions securely on the client side.
- **Event Handling**: Handled form submissions, button clicks, and other user interactions to update the UI dynamically.
- **DOM Manipulation**: Implemented using JavaScript to create, update, and delete elements in the DOM based on user actions.
- **Responsive Design**: Built with CSS Grid and Flexbox to ensure a seamless experience across different screen sizes, including desktops, tablets, and mobile devices.
- **Custom Alerts and Prompts**: Created custom modals to handle alerts and prompts for a more engaging user experience.
- **Input Validation**: Added validation to forms to prevent invalid transactions, including checks for negative balances.
- **Print Feature**: Implemented a method to print the transaction history directly using JavaScript.

[🔝](#table-of-contents)

<br>

## Future Scope
To further enhance the **Expense Tracker**, the following features are planned to provide a more personalized and secure user experience:

- **Custom Profile Editing**: Implement a dedicated profile management page where users can update their personal information, including username and email.
- **Upload Profile Picture**: Allow users to upload a profile picture that will be displayed on the dashboard and profile page. The uploaded image will be stored in local storage to retain changes across sessions.
- **Password Update**: Provide a secure mechanism for users to update their passwords, with appropriate validations to ensure strong password policies are followed.
- **Enhanced User Interface**: Introduce additional user interface elements like a dashboard with more customization options and detailed user statistics.
- **Additional Security**: Add features like logout timers and session expiration to further enhance the security of user data stored in local storage.

These features aim to give users more control over their profiles and improve the overall user experience.

<br>

# 
<div>
  <img src="https://contrib.rocks/image?repo=priyamaggarwal18/Game_Hub1" alt="Contributions" align="left">
  <h3 align="left">Maintained By - Priyam Aggarwal (https://github.com/priyamaggarwal18)</h3>
    <a href="https://priyamaggarwal18.github.io/Portfolio2.0/" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/Portfolio-%23000000.svg?style=for-the-badge&logo=web&logoColor=white" alt="Portfolio">
  </a>&nbsp&nbsp;
  <a href="https://www.linkedin.com/in/priyamaggarwal" target="_blank" style="text-decoration: none;">
  <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>&nbsp&nbsp;
</div>
