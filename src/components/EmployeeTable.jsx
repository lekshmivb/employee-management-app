import React from 'react';
import { Eye, Edit2, Trash2, MapPin, UserX, Inbox } from 'lucide-react';
import { formatCurrency, formatDate, getInitials } from '../utils/helpers';

export default function EmployeeTable({
  employees = [],
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
  onAddFirstEmployee
}) {
  const isAllSelected = employees.length > 0 && employees.every(e => selectedIds.includes(e.id));
  const isSomeSelected = employees.some(e => selectedIds.includes(e.id)) && !isAllSelected;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="badge badge-active"><span className="badge-dot"></span>Active</span>;
      case 'On Leave':
        return <span className="badge badge-leave"><span className="badge-dot"></span>On Leave</span>;
      case 'Terminated':
        return <span className="badge badge-terminated"><span className="badge-dot"></span>Inactive</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  if (employees.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <div className="empty-icon-box">
            <Inbox size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem', color: '#f8fafc' }}>No employees found</h3>
          <p style={{ maxWidth: '380px', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            We couldn't find any employees matching your current search or filter criteria. Try adjusting your filters or add a new employee.
          </p>
          {onAddFirstEmployee && (
            <button type="button" className="btn btn-primary" onClick={onAddFirstEmployee}>
              + Add New Employee
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th style={{ width: '40px', textAlign: 'center' }}>
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={el => {
                  if (el) el.indeterminate = isSomeSelected;
                }}
                onChange={onToggleSelectAll}
                aria-label="Select all employees"
                style={{ cursor: 'pointer', accentColor: '#4f46e5' }}
              />
            </th>
            <th>Employee</th>
            <th>ID</th>
            <th>Department</th>
            <th>Role & Type</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => {
            const isSelected = selectedIds.includes(emp.id);
            return (
              <tr key={emp.id} className={isSelected ? 'selected' : ''}>
                <td style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(emp.id)}
                    aria-label={`Select ${emp.firstName} ${emp.lastName}`}
                    style={{ cursor: 'pointer', accentColor: '#4f46e5' }}
                  />
                </td>
                <td>
                  <div className="user-cell">
                    <div
                      className="avatar-circle"
                      style={{ backgroundColor: emp.avatarColor || '#4f46e5' }}
                    >
                      {getInitials(emp.firstName, emp.lastName)}
                    </div>
                    <div className="user-cell-meta">
                      <span
                        className="user-cell-name"
                        onClick={() => onViewEmployee(emp)}
                      >
                        {emp.firstName} {emp.lastName}
                      </span>
                      <span className="user-cell-email">{emp.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#94a3b8' }}>
                    {emp.id}
                  </span>
                </td>
                <td>
                  <span className="badge badge-dept">{emp.department}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontWeight: 500 }}>{emp.role}</span>
                    <span className="badge badge-type" style={{ alignSelf: 'flex-start' }}>
                      {emp.employmentType}
                    </span>
                  </div>
                </td>
                <td style={{ fontWeight: 600, color: '#f1f5f9' }}>
                  {formatCurrency(emp.salary)}
                </td>
                <td style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>
                  {formatDate(emp.startDate)}
                </td>
                <td>
                  {getStatusBadge(emp.status)}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                    <button
                      type="button"
                      className="btn-icon-only"
                      onClick={() => onViewEmployee(emp)}
                      title="View Profile Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon-only"
                      onClick={() => onEditEmployee(emp)}
                      title="Edit Employee"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon-only delete-hover"
                      onClick={() => onDeleteEmployee(emp)}
                      title="Delete Employee"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
