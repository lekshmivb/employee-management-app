# StaffSync - Employee Data CRUD Management System

A modern, fast, and responsive React application built with Vite for managing employee records with complete CRUD (Create, Read, Update, Delete) capabilities.

---

## 🚀 Features

- **Full CRUD Operations**:
  - **Create**: Add new employees with complete personal, role, department, salary, and contact details with real-time form validation.
  - **Read**: Browse employees via responsive **Data Table** or **Card Grid** views, or open a detailed **Profile ID Card modal**.
  - **Update**: Edit existing employee records with pre-filled inputs and instant state synchronization.
  - **Delete**: Safe single-record and batch-deletion workflows with confirmation dialogs to prevent accidental data loss.
- **Data Persistence**:
  - Automatically saves all changes to the browser's `localStorage` so data is preserved across page refreshes.
  - Pre-loaded with realistic sample employee records.
  - One-click **"Reset Data"** button to restore initial sample data anytime.
- **Search, Filtering & Sorting**:
  - Real-time search across names, job titles, emails, departments, and IDs.
  - Multi-criteria filtering by **Department**, **Employment Type** (Full-time, Part-time, Contract, Intern), and **Status** (Active, On Leave, Inactive).
  - Multi-parameter sorting (Name A-Z/Z-A, Salary High-Low/Low-High, Newest/Oldest Hires).
- **Data Export**:
  - One-click **"Export CSV"** function to download the employee database to a spreadsheet file.
- **KPI Metrics Dashboard**:
  - Dynamic summary counters for Total Staff, Active Employees, On Leave, Department Count, and Average Annual Salary.
- **Premium UI & Modern Styling**:
  - Clean dark theme with glassmorphism accents, color-coded status badges, custom avatars, and toast alert notifications.

---

## 🛠️ Project Structure

```text
EMPLOYEEDATA/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── mockEmployees.js      # Sample records & select constants
    ├── utils/
    │   └── helpers.js            # Currency, date, initials & CSV export helpers
    └── components/
        ├── Navbar.jsx            # Top bar with Add, Export, and Reset actions
        ├── MetricsHeader.jsx     # KPI summary cards
        ├── EmployeeToolbar.jsx   # Search, filters, sort & view switcher
        ├── EmployeeTable.jsx     # Responsive tabular view with selection
        ├── EmployeeGrid.jsx      # Card-based grid layout view
        ├── EmployeeFormModal.jsx # Add/Edit modal form with validations
        ├── EmployeeDetailModal.jsx # Detailed ID profile view modal
        ├── DeleteConfirmModal.jsx # Deletion confirmation dialog
        └── Toast.jsx             # Action feedback notifications
```

---

## 🏃 Running the Application

### 1. Start Development Server
```bash
npm run dev
```

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```
