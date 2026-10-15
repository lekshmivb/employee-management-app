import React from 'react';
import { X, Edit2, Trash2, Mail, Phone, Calendar, DollarSign, MapPin, Building, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDate, getInitials } from '../utils/helpers';

export default function EmployeeDetailModal({
  isOpen,
  onClose,
  employee,
  onEdit,
  onDelete
}) {
  if (!isOpen || !employee) return null;

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <CheckCircle2 size={18} color="#818cf8" />
            <span>Employee Profile Overview</span>
          </div>
          <button
            type="button"
            className="btn-icon-only"
            onClick={onClose}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.75rem' }}>
          {/* Header Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div
              className="avatar-circle"
              style={{
                width: '4.25rem',
                height: '4.25rem',
                fontSize: '1.4rem',
                backgroundColor: employee.avatarColor || '#4f46e5'
              }}
            >
              {getInitials(employee.firstName, employee.lastName)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>
                  {employee.firstName} {employee.lastName}
                </h3>
                {getStatusBadge(employee.status)}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                {employee.role}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', padding: '0.15rem 0.5rem', borderRadius: '4px', color: '#cbd5e1' }}>
                  {employee.id}
                </span>
                <span className="badge badge-dept">{employee.department}</span>
                <span className="badge badge-type">{employee.employmentType}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
            padding: '1.5rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Mail size={13} /> Email Address
              </div>
              <div style={{ fontSize: '0.875rem', color: '#f1f5f9', wordBreak: 'break-all' }}>
                {employee.email}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Phone size={13} /> Contact Number
              </div>
              <div style={{ fontSize: '0.875rem', color: '#f1f5f9' }}>
                {employee.phone || 'N/A'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <DollarSign size={13} /> Annual Salary
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                {formatCurrency(employee.salary)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={13} /> Start Date
              </div>
              <div style={{ fontSize: '0.875rem', color: '#f1f5f9' }}>
                {formatDate(employee.startDate)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <MapPin size={13} /> Work Location
              </div>
              <div style={{ fontSize: '0.875rem', color: '#f1f5f9' }}>
                {employee.location}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Briefcase size={13} /> Employment Status
              </div>
              <div style={{ fontSize: '0.875rem', color: '#f1f5f9' }}>
                {employee.status}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div style={{ paddingTop: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FileText size={13} /> Background & Notes
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem 1rem', borderRadius: '8px' }}>
              {employee.notes || 'No additional notes provided for this team member.'}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => {
              onClose();
              onDelete(employee);
            }}
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(employee);
            }}
          >
            <Edit2 size={15} />
            <span>Edit Employee</span>
          </button>
        </div>
      </div>
    </div>
  );
}
