import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  employee = null,
  count = 1
}) {
  if (!isOpen) return null;

  const isBatch = count > 1 || !employee;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title" style={{ color: '#f87171' }}>
            <AlertTriangle size={20} />
            <span>Confirm Deletion</span>
          </div>
          <button
            type="button"
            className="btn-icon-only"
            onClick={onClose}
            title="Cancel"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <Trash2 size={28} />
          </div>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>
            {isBatch
              ? `Delete ${count} Selected Employees?`
              : `Delete ${employee.firstName} ${employee.lastName}?`}
          </h4>

          <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.5 }}>
            {isBatch
              ? `Are you sure you want to delete these ${count} employee records? This action cannot be reversed.`
              : `Are you sure you want to remove ${employee.firstName} ${employee.lastName} (${employee.id}) from the database? This action cannot be undone.`}
          </p>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center', gap: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            <span>Yes, Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
