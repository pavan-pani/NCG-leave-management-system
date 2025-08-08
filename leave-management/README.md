````md
# ✅ Leave Management System

🔗 **Live Demo**: [https://ncg-leave-management-system.vercel.app](https://ncg-leave-management-system.vercel.app)

---

## 📦 Project Overview

The Leave Management System is a responsive web application built with **React.js**, **Redux Toolkit**, **React Router**, **shadcn/ui**, and **TailwindCSS**. It provides role-based dashboards and functionalities for Employees, Managers, and Admins to apply for, view, and manage leave requests.

To enhance user experience, a **timer function (1 sec delay)** is used to simulate API calls. This makes the UI feel realistic and allows time to show a loading spinner while data is "fetching."

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/leave-management-system.git
cd leave-management-system
npm install
````

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧠 Features Implemented

### 🔐 Authentication

* Role-based login system with dummy credentials.

### 👤 Employee

* Apply for leave.
* View leave history.

### 🧑‍💼 Manager

* View requests from employees.
* Approve/Reject leave requests.


### 🖥️ UI/UX

* Responsive design using **TailwindCSS** and **shadcn/ui** components.
* Loading spinners for async simulation (1 second delay using `setTimeout`).
* Cards, badges, selects, and other shadcn components integrated.

---

## 🗂️ Project Structure

```
src/
├── components/            # Shared components (Header, Card, etc.)
│   ├── common/            # Header & reusable layout components
│   └── ui/                # Custom UI components using shadcn/ui
│
├── views/                 # Reusable views like LeaveRequestForm, History, etc.
├── pages/                 # Route-level components (Login, ApplyLeave, Dashboard)
├── store/                 # Redux Toolkit setup
│   ├── slices/            # authSlice, userSlice, leaveSlice
│   └── index.js           # Redux store configuration
│
├── utils/                 # Helper functions, constants, validation logic
├── data/                  # Dummy data (users, leaves)
├── hooks/                 # Custom React hooks
├── App.jsx                # Main application file
├── main.jsx               # Entry point
```

---

## 🔧 State Management

* **Redux Toolkit** is used to manage global state.
* `authSlice` → handles login state & current user.
* `userSlice` → holds static user data.
* `leaveSlice` → handles leave form submission, status updates, and history.
* Simulated API behavior using `setTimeout` for async-like experience.

---

## ⚠️ Assumptions & Limitations

* Currently, no real backend/API integration.
* User login is based on hardcoded data.
* The 1-second timer simulates a real API call but is not production behavior.
* Role switching and email matching are mocked for demo purposes.

---

## 🧪 Future Improvements

* Add real backend integration (Node.js + MongoDB/PostgreSQL).
* Role-based protected routes.
* Notification system for status updates.
* Pagination and filtering for large datasets.
* Unit and integration tests using Jest/RTL.

---

## 🧑‍💻 Built With

* [React](https://reactjs.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [React Router](https://reactrouter.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)


