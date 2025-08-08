# ✅ Leave Management System

🔗 **Live Demo**: [https://ncg-leave-management-system.vercel.app](https://ncg-leave-management-system.vercel.app)

---

## 📦 Project Overview

The **Leave Management System** is a responsive web application built using **React.js**, **Redux Toolkit**, **React Router**, **shadcn/ui**, and **TailwindCSS**. It features role-based dashboards and functionalities for Employees, Managers, and Admins to apply for, view, and manage leave requests.

To simulate API calls and improve user experience, a **1-second delay timer** is implemented. This helps demonstrate a loading spinner during data fetching.

---

## 🚀 Lighthouse Performance Report

<img src="./screenshots/lighthouse-report.png" alt="Lighthouse Report" width="700" />

- **Performance**: 100  
- **Accessibility**: 93  
- **Best Practices**: 96  
- **SEO**: 100  

> Optimized for fast performance and seamless user experience across devices.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/leave-management-system.git
cd leave-management-system
npm install
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧠 Features

### 🔐 Authentication

- Role-based login system using dummy credentials

### 👤 Employee

- Apply for leave
- View leave history

### 🧑‍💼 Manager

- View leave requests from employees
- Approve or reject leave requests

### 🖥️ UI/UX

- Fully responsive design using **TailwindCSS**
- Styled components powered by **shadcn/ui**
- Simulated loading indicators (using `setTimeout`)
- Clean layout with reusable cards, badges, selects, and headers

---

## 🗂️ Project Structure

```
src/
├── components/            # Reusable UI and layout components
│   ├── common/            # Header and layout wrappers
│   └── ui/                # shadcn-based custom components
│
├── views/                 # Shared views (LeaveRequestForm, History, etc.)
├── pages/                 # Route-level components (Login, ApplyLeave, Dashboard)
├── store/                 # Redux Toolkit logic
│   ├── slices/            # authSlice, userSlice, leaveSlice
│   └── index.js           # Store configuration
│
├── utils/                 # Helper functions, constants, validation logic
├── data/                  # Dummy data (users, leaves)
├── hooks/                 # Custom React hooks
├── App.jsx                # Root application component
├── main.jsx               # Entry point
```

---

## ⚙️ State Management

- State is managed using **Redux Toolkit**
- `authSlice`: Manages login and user state
- `userSlice`: Stores static user data
- `leaveSlice`: Handles leave request form, approvals, and history
- Simulated async behavior using `setTimeout` for a realistic feel

---

## ⚠️ Assumptions & Limitations

- No real backend/API integration (only mock data)
- Login is based on hardcoded dummy users
- Timer-based delay is only for simulation, not actual backend latency
- Role-based access is simulated based on selected credentials

---

## 🔮 Future Improvements

- Integrate with a real backend (e.g., Node.js + MongoDB or PostgreSQL)
- Add protected routes based on roles
- Real-time notifications for leave status updates
- Filtering, searching, and pagination for large datasets
- Unit and integration testing with Jest and React Testing Library

---

## 🧑‍💻 Built With

- [React.js](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
