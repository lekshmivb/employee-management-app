import React from 'react';
import { Eye, Edit2, Trash2, Mail, Phone, MapPin, Calendar, DollarSign, Inbox } from 'lucide-react';
import { formatCurrency, formatDate, getInitials } from '../utils/helpers';

export default function EmployeeGrid({
  employees = [],
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
  onAddFirstEmployee
}) {
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
    <div className="cards-grid">
      {employees.map(emp => (
        <div key={emp.id} className="employee-card">
          <div className="card-header">
            <div className="card-profile">
              <div
                className="avatar-circle"
                style={{ backgroundColor: emp.avatarColor || '#4f46e5' }}
              >
                {getInitials(emp.firstName, emp.lastName)}
              </div>
              <div>
                <h4
                  style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', cursor: 'pointer' }}
                  onClick={() => onViewEmployee(emp)}
                >
                  {emp.firstName} {emp.lastName}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{emp.role}</div>
              </div>
            </div>
            {getStatusBadge(emp.status)}
          </div>

          <div className="card-body">
            <div className="card-row">
              <span className="card-row-label">
                <Mail size={14} /> Email
              </span>
              <span style={{ color: '#e2e8f0', wordBreak: 'break-all' }}>{emp.email}</span>
            </div>

            <div className="card-row">
              <span className="card-row-label">
                <Phone size={14} /> Phone
              </span>
              <span style={{ color: '#cbd5e1' }}>{emp.phone || 'N/A'}</span>
            </div>

            <div className="card-row">
              <span className="card-row-label">Department</span>
              <span className="badge badge-dept">{emp.department}</span>
            </div>

            <div className="card-row">
              <span className="card-row-label">Type / Location</span>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span className="badge badge-type">{emp.employmentType}</span>
                <span className="badge-loc">
                  <MapPin size={12} /> {emp.location}
                </span>
              </div>
            </div>

            <div className="card-row">
              <span className="card-row-label">
                <DollarSign size={14} /> Annual Salary
              </span>
              <span style={{ fontWeight: 700, color: '#f8fafc' }}>{formatCurrency(emp.salary)}</span>
            </div>

            <div className="card-row">
              <span className="card-row-label">
                <Calendar size={14} /> Started
              </span>
              <span style={{ color: '#94a3b8' }}>{formatDate(emp.startDate)}</span>
            </div>
          </div>

          <div className="card-footer">
            <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#64748b' }}>
              {emp.id}
            </span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                type="button"
                className="btn-icon-only"
                onClick={() => onViewEmployee(emp)}
                title="View Full Profile"
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
          </div>
        </div>
      ))}
    </div>
  );
}
