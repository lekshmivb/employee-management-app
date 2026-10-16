import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import MetricsHeader from './components/MetricsHeader';
import EmployeeToolbar from './components/EmployeeToolbar';
import EmployeeTable from './components/EmployeeTable';
import EmployeeGrid from './components/EmployeeGrid';
import EmployeeFormModal from './components/EmployeeFormModal';
import EmployeeDetailModal from './components/EmployeeDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { INITIAL_EMPLOYEES } from './data/mockEmployees';
import { generateNextId, exportToCSV } from './utils/helpers';

const LOCAL_STORAGE_KEY = 'staffsync_employees_v1';

export default function App() {
  // 1. Employee State loaded from LocalStorage or Default
  const [employees, setEmployees] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse localStorage employees:', e);
    }
    return INITIAL_EMPLOYEES;
  });

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
    } catch (e) {
      console.error('Failed to save employees to localStorage:', e);
    }
  }, [employees]);

  // 2. Filters, Search & View states
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('table');
  const [selectedIds, setSelectedIds] = useState([]);

  // 3. Modal Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [employeeToView, setEmployeeToView] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isBatchDelete, setIsBatchDelete] = useState(false);

  // 4. Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Filtered and Sorted employees
  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(emp =>
        (emp.firstName || '').toLowerCase().includes(query) ||
        (emp.lastName || '').toLowerCase().includes(query) ||
        (emp.email || '').toLowerCase().includes(query) ||
        (emp.phone || '').toLowerCase().includes(query) ||
        (emp.role || '').toLowerCase().includes(query) ||
        (emp.id || '').toLowerCase().includes(query) ||
        (emp.department || '').toLowerCase().includes(query)
      );
    }

    // Department filter
    if (departmentFilter !== 'ALL') {
      result = result.filter(emp => emp.department === departmentFilter);
    }

    // Employment type filter
    if (typeFilter !== 'ALL') {
      result = result.filter(emp => emp.employmentType === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      result = result.filter(emp => emp.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB);
        }
        case 'name-desc': {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameB.localeCompare(nameA);
        }
        case 'salary-desc':
          return (Number(b.salary) || 0) - (Number(a.salary) || 0);
        case 'salary-asc':
          return (Number(a.salary) || 0) - (Number(b.salary) || 0);
        case 'date-desc':
          return new Date(b.startDate || 0) - new Date(a.startDate || 0);
        case 'date-asc':
          return new Date(a.startDate || 0) - new Date(b.startDate || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [employees, searchQuery, departmentFilter, typeFilter, statusFilter, sortBy]);

  // Selection handlers
  const handleToggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (filteredEmployees.length === 0) return;
    const allFilteredIds = filteredEmployees.map(e => e.id);
    const isAllSelected = allFilteredIds.every(id => selectedIds.includes(id));

    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !allFilteredIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...allFilteredIds])));
    }
  };

  // CRUD Actions: CREATE & UPDATE
  const handleOpenAddForm = () => {
    setEmployeeToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (emp) => {
    setEmployeeToEdit(emp);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (employeeToEdit) {
      // UPDATE
      setEmployees(prev =>
        prev.map(emp => (emp.id === employeeToEdit.id ? { ...formData, id: employeeToEdit.id } : emp))
      );
      showToast(`Updated ${formData.firstName} ${formData.lastName} successfully.`);
      if (employeeToView && employeeToView.id === employeeToEdit.id) {
        setEmployeeToView({ ...formData, id: employeeToEdit.id });
      }
    } else {
      // CREATE
      const newId = generateNextId(employees);
      const newEmployee = {
        ...formData,
        id: newId
      };
      setEmployees(prev => [newEmployee, ...prev]);
      showToast(`Added new employee ${newEmployee.firstName} ${newEmployee.lastName} (${newId}).`);
    }
    setIsFormOpen(false);
    setEmployeeToEdit(null);
  };

  // READ (Details)
  const handleViewEmployee = (emp) => {
    setEmployeeToView(emp);
    setIsDetailOpen(true);
  };

  // DELETE single
  const handleOpenDeleteConfirm = (emp) => {
    setEmployeeToDelete(emp);
    setIsBatchDelete(false);
    setIsDeleteOpen(true);
  };

  // DELETE batch
  const handleOpenBatchDeleteConfirm = () => {
    if (selectedIds.length === 0) return;
    setEmployeeToDelete(null);
    setIsBatchDelete(true);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isBatchDelete) {
      const count = selectedIds.length;
      setEmployees(prev => prev.filter(emp => !selectedIds.includes(emp.id)));
      setSelectedIds([]);
      showToast(`Deleted ${count} employee records.`, 'info');
    } else if (employeeToDelete) {
      const name = `${employeeToDelete.firstName} ${employeeToDelete.lastName}`;
      setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete.id));
      setSelectedIds(prev => prev.filter(id => id !== employeeToDelete.id));
      showToast(`Deleted ${name} from database.`, 'info');
    }
    setIsDeleteOpen(false);
    setEmployeeToDelete(null);
    setIsBatchDelete(false);
  };

  // RESET
  const handleResetData = () => {
    if (window.confirm('Reset all employee records to default sample data? Any changes will be overwritten.')) {
      setEmployees(INITIAL_EMPLOYEES);
      setSelectedIds([]);
      showToast('Reset data to initial sample employees.', 'info');
    }
  };

  // EXPORT
  const handleExportCSV = () => {
    if (filteredEmployees.length === 0) {
      showToast('No records available to export.', 'error');
      return;
    }
    exportToCSV(filteredEmployees, `employees_${new Date().toISOString().slice(0, 10)}.csv`);
    showToast(`Exported ${filteredEmployees.length} employee records to CSV.`);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        onAddClick={handleOpenAddForm}
        onExportClick={handleExportCSV}
        onResetClick={handleResetData}
        totalEmployees={employees.length}
      />

      <main className="main-content">
        {/* KPI Metrics Summary */}
        <MetricsHeader employees={employees} />

        {/* Search, Filter, Sort and Mode Toolbar */}
        <EmployeeToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          departmentFilter={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedCount={selectedIds.length}
          onDeleteSelected={handleOpenBatchDeleteConfirm}
        />

        {/* Main Employee List (Table or Grid) */}
        {viewMode === 'table' ? (
          <EmployeeTable
            employees={filteredEmployees}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onViewEmployee={handleViewEmployee}
            onEditEmployee={handleOpenEditForm}
            onDeleteEmployee={handleOpenDeleteConfirm}
            onAddFirstEmployee={handleOpenAddForm}
          />
        ) : (
          <EmployeeGrid
            employees={filteredEmployees}
            onViewEmployee={handleViewEmployee}
            onEditEmployee={handleOpenEditForm}
            onDeleteEmployee={handleOpenDeleteConfirm}
            onAddFirstEmployee={handleOpenAddForm}
          />
        )}
      </main>

      {/* CRUD Form Modal (Create and Update) */}
      <EmployeeFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        employeeToEdit={employeeToEdit}
      />

      {/* Read Details Modal */}
      <EmployeeDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        employee={employeeToView}
        onEdit={(emp) => {
          setIsDetailOpen(false);
          handleOpenEditForm(emp);
        }}
        onDelete={(emp) => {
          setIsDetailOpen(false);
          handleOpenDeleteConfirm(emp);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        employee={employeeToDelete}
        count={selectedIds.length}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
