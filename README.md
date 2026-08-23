# Job Application Tracker

A full-stack web application that helps job seekers organize, manage, and track their job applications from a single dashboard.

## 🚀 Live Demo

**Live Application:**
https://job-application-tracker-0tmv.onrender.com

**GitHub Repository:**
https://github.com/clinton05onyango/job-application-tracker

---

## 📌 About the Project

Job Application Tracker is a full-stack web application designed to help job seekers manage their job search in an organized and efficient way.

Users can create an account, securely log in, add and manage job applications, update application statuses, record interview information, search and filter applications, and monitor their progress through an application pipeline.

The project was built as a practical portfolio project to demonstrate full-stack software development skills, including frontend development, backend API development, authentication, database integration, CRUD operations, responsive UI development, Git/GitHub workflow, and cloud deployment.

---

## ✨ Features

* User registration and login
* JWT-based authentication
* Protected user-specific application data
* Add job applications
* Edit job applications
* Delete job applications
* Search applications by company or position
* Filter applications by status
* Application statistics
* Application pipeline tracking
* Interview tracking
* Interview dates and notes
* Job posting links
* Application notes
* Responsive dashboard
* REST API integration
* Production deployment

---

## 📊 Application Pipeline

Applications can be organized into different stages of the hiring process:

* **Saved** — Jobs the user is interested in
* **Applied** — Applications that have been submitted
* **Interview** — Applications that have progressed to an interview
* **Offer** — Applications where an offer has been received
* **Rejected** — Applications that were not successful

This pipeline allows users to quickly understand the current state of their job search.

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

### Database

* Neon PostgreSQL

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
        │ SQL Queries
        ▼
Neon PostgreSQL Database
```

The React frontend communicates with the Node.js backend through REST API endpoints.

The backend handles authentication, application management, database operations, and protected API requests.

Application data is stored in a Neon PostgreSQL database.

---

## 🔐 Authentication

The application uses JWT-based authentication to protect user accounts and application data.

The authentication flow includes:

1. User registration
2. User login
3. Password authentication
4. JWT token generation
5. Protected API endpoints
6. Authenticated application requests
7. Logout functionality

User authentication ensures that application data is associated with the correct account.

---

## 🔄 CRUD Operations

The application implements the main CRUD operations for job applications:

| Operation | Description                             |
| --------- | --------------------------------------- |
| Create    | Add a new job application               |
| Read      | View saved applications                 |
| Update    | Edit application information and status |
| Delete    | Remove an application                   |

These operations are handled through REST API endpoints and connected to the Neon PostgreSQL database.

---

## 🔎 Search & Filtering

Users can efficiently manage their applications using:

* Company search
* Position search
* Application status filtering
* Application pipeline stages

This makes it easier to find specific applications and monitor progress.

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

### 4. Configure environment variables

Create a `.env` file and add the environment variables required by the application.

For example:

```env
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit your `.env` file or database credentials to GitHub.

### 5. Start the development server

```bash
npm run dev
```

### 6. Create a production build

```bash
npm run build
```

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

> The exact project structure may vary depending on the current frontend and backend implementation.

---

## 🌐 Deployment

The application is deployed to the cloud using **Render**.

The production application connects the frontend, backend API, and Neon PostgreSQL database to provide a working full-stack environment.

### Production Application

https://job-application-tracker-0tmv.onrender.com

---

## 🎯 Skills Demonstrated

This project demonstrates practical experience with:

* Full-stack web development
* React development
* JavaScript
* React components
* React state management
* React hooks
* REST API integration
* Node.js backend development
* JWT authentication
* CRUD operations
* PostgreSQL database integration
* SQL database management
* Axios
* Search and filtering
* Responsive web design
* Frontend/backend integration
* Git version control
* GitHub
* Cloud deployment
* Debugging and troubleshooting

---

## 💡 What I Learned

Building this project provided practical experience in developing and deploying a full-stack application.

Key areas of learning included:

* Designing a frontend application with React
* Connecting a frontend to a REST API
* Building backend API endpoints
* Implementing authentication and protected routes
* Working with PostgreSQL databases
* Managing application state
* Implementing CRUD functionality
* Debugging frontend and backend issues
* Using Git and GitHub for version control
* Deploying a full-stack application to the cloud
* Managing environment variables and production configuration

---

## 📈 Future Improvements

The current version focuses on the core job application tracking workflow.

Possible future improvements include:

* Dashboard analytics and charts
* Interview reminders
* Application deadline reminders
* Resume and cover letter management
* CSV export
* Dark mode
* Advanced filtering
* Pagination
* Automated job tracking

These features may be considered in future versions as the project evolves.

---

## 👨‍💻 Developer

**Clinton Ochieng Onyango**

**Junior Software Developer | Software Engineering Undergraduate**

Interested in building practical software solutions and gaining experience through real-world development projects.

Open to remote software development and contract opportunities.

---

## 📄 License

This project is available for educational and portfolio purposes.
