import React, { useState, useEffect } from 'react';
import { X, Check, User, Briefcase, Mail, Phone, DollarSign, Calendar, MapPin, FileText } from 'lucide-react';
import { DEPARTMENTS, EMPLOYMENT_TYPES, STATUS_OPTIONS, LOCATION_OPTIONS, AVATAR_COLORS } from '../data/mockEmployees';
import { getInitials } from '../utils/helpers';

export default function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  employeeToEdit = null
}) {
  const isEditing = Boolean(employeeToEdit);

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Engineering',
    role: '',
    employmentType: 'Full-time',
    salary: '',
    startDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    location: 'Remote',
    avatarColor: '#6366f1',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        firstName: employeeToEdit.firstName || '',
        lastName: employeeToEdit.lastName || '',
        email: employeeToEdit.email || '',
        phone: employeeToEdit.phone || '',
        department: employeeToEdit.department || 'Engineering',
        role: employeeToEdit.role || '',
        employmentType: employeeToEdit.employmentType || 'Full-time',
        salary: employeeToEdit.salary ?? '',
        startDate: employeeToEdit.startDate || new Date().toISOString().split('T')[0],
        status: employeeToEdit.status || 'Active',
        location: employeeToEdit.location || 'Remote',
        avatarColor: employeeToEdit.avatarColor || '#6366f1',
        notes: employeeToEdit.notes || ''
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [employeeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field when user modifies it
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role / Job title is required';
    }

    if (formData.salary === '' || formData.salary === null) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || Number(formData.salary) < 0) {
      newErrors.salary = 'Please enter a valid positive salary';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      salary: Number(formData.salary)
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <User size={20} color="#818cf8" />
            <span>{isEditing ? `Edit Employee (${employeeToEdit.id})` : 'Add New Employee'}</span>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div className="modal-body">
            {/* Live Mini Preview Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px dashed #334155',
              borderRadius: '10px',
              marginBottom: '1.25rem'
            }}>
              <div
                className="avatar-circle"
                style={{ backgroundColor: formData.avatarColor }}
              >
                {getInitials(formData.firstName, formData.lastName)}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.95rem' }}>
                  {formData.firstName || 'Employee'} {formData.lastName || 'Name'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {formData.role || 'Job Title'} &bull; <span style={{ color: '#818cf8' }}>{formData.department}</span>
                </div>
              </div>
            </div>

            <div className="form-grid">
              {/* Personal Information */}
              <div className="form-group">
                <label className="form-label">
                  First Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  className={`form-input ${errors.firstName ? 'has-error' : ''}`}
                  placeholder="e.g. Sarah"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Last Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  className={`form-input ${errors.lastName ? 'has-error' : ''}`}
                  placeholder="e.g. Jenkins"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className={`form-input ${errors.phone ? 'has-error' : ''}`}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              {/* Job Details */}
              <div className="form-group">
                <label className="form-label">
                  Department <span className="req">*</span>
                </label>
                <select
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Role / Position <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="role"
                  className={`form-input ${errors.role ? 'has-error' : ''}`}
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.role}
                  onChange={handleChange}
                />
                {errors.role && <span className="error-text">{errors.role}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Employment Type</label>
                <select
                  name="employmentType"
                  className="form-select"
                  value={formData.employmentType}
                  onChange={handleChange}
                >
                  {EMPLOYMENT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Work Location</label>
                <select
                  name="location"
                  className="form-select"
                  value={formData.location}
                  onChange={handleChange}
                >
                  {LOCATION_OPTIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Annual Salary ($ USD) <span className="req">*</span>
                </label>
                <input
                  type="number"
                  name="salary"
                  min="0"
                  step="1000"
                  className={`form-input ${errors.salary ? 'has-error' : ''}`}
                  placeholder="e.g. 95000"
                  value={formData.salary}
                  onChange={handleChange}
                />
                {errors.salary && <span className="error-text">{errors.salary}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Start Date <span className="req">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={`form-input ${errors.startDate ? 'has-error' : ''}`}
                  value={formData.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && <span className="error-text">{errors.startDate}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Avatar Color */}
              <div className="form-group">
                <label className="form-label">Avatar Badge Theme</label>
                <div className="color-picker-group">
                  {AVATAR_COLORS.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${formData.avatarColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({ ...prev, avatarColor: color }))}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="form-group form-full">
                <label className="form-label">Internal Notes / Bio (Optional)</label>
                <textarea
                  name="notes"
                  rows="3"
                  className="form-textarea"
                  placeholder="Key responsibilities, certifications, background notes..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Check size={16} />
              <span>{isEditing ? 'Save Changes' : 'Create Employee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
