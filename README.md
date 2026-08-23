# Job Application Tracker

A full-stack web application that helps job seekers organize, manage, and monitor their job applications from one dashboard.

## 🚀 Live Demo

**Live Application:**
https://job-application-tracker-0tmv.onrender.com

**GitHub Repository:**
https://github.com/clinton05onyango/job-application-tracker

---

## 📌 About the Project

Job Application Tracker is a full-stack application designed to help job seekers keep their applications organized in one place.

Users can create an account, securely log in, add job applications, update application statuses, record interview information, search and filter applications, and monitor their progress through a centralized dashboard.

The project demonstrates practical experience with full-stack web development, authentication, REST API integration, CRUD operations, responsive UI development, Git/GitHub workflow, and cloud deployment.

---

## ✨ Features

* User registration and login
* JWT authentication
* Protected user-specific application data
* Add job applications
* Edit job applications
* Delete job applications
* Search by company or position
* Filter applications by status
* Application statistics
* Application pipeline tracking
* Interview tracking
* Job posting links
* Application notes
* Responsive dashboard
* Production deployment

---

## 📊 Application Pipeline

Applications can be organized into the following stages:

* **Saved**
* **Applied**
* **Interview**
* **Offer**
* **Rejected**

This allows users to quickly understand where each application is in the hiring process.

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* Axios
* CSS

### Backend

* Node.js
* REST API
* JWT Authentication

### Development & Deployment

* Git
* GitHub
* Render
* PowerShell

---

## 🏗️ Application Architecture

```text
React + Vite Frontend
        │
        │ REST API
        ▼
Node.js Backend
        │
        ▼
Database
```

The React frontend communicates with the Node.js backend through REST API endpoints for authentication and job application management.

---

## 🔐 Authentication

The application uses JWT-based authentication to protect user data and application management endpoints.

Authentication includes:

1. User registration
2. User login
3. JWT token authentication
4. Protected API endpoints
5. Logout functionality

Authentication tokens are stored locally in the browser and included with protected API requests.

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/clinton05onyango/job-application-tracker.git
```

### 2. Enter the project directory

```bash
cd job-application-tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Create a production build

```bash
npm run build
```

> **Note:** If the project uses separate frontend and backend directories or requires environment variables, configure those according to the project's deployment configuration before running it locally.

---

## 📁 Project Structure

```text
job-application-tracker/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── ...
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 Skills Demonstrated

This project demonstrates practical experience with:

* React component development
* React state management
* React hooks
* REST API integration
* Axios
* JWT authentication
* CRUD operations
* Search and filtering
* Responsive web design
* Frontend/backend integration
* Git and GitHub
* Production deployment
* Debugging deployment issues

---

## 📈 Future Improvements

The current version is focused on the core job application tracking workflow.

Potential future improvements include:

* Dashboard analytics and charts
* Interview reminders
* Application deadline reminders
* Resume and cover letter management
* CSV export
* Dark mode
* Advanced filtering
* Pagination
* Automated job tracking

---

## 👨‍💻 Developer

**Clinton Ochieng Onyango**

Junior Software Developer | Software Engineering Undergraduate

Open to remote software development and contract opportunities.

---

## 📄 License

This project is available for educational and portfolio purposes.
