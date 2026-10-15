import React from 'react';
import { Users, UserCheck, CalendarOff, DollarSign, Building2 } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function MetricsHeader({ employees = [] }) {
  const total = employees.length;
  const activeCount = employees.filter(e => e.status === 'Active').length;
  const leaveCount = employees.filter(e => e.status === 'On Leave').length;
  
  const departments = new Set(employees.map(e => e.department).filter(Boolean));
  const totalSalary = employees.reduce((sum, e) => sum + (Number(e.salary) || 0), 0);
  const avgSalary = total > 0 ? Math.round(totalSalary / total) : 0;

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-icon-box" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
          <Users size={22} />
        </div>
        <div className="metric-details">
          <span className="metric-label">Total Staff</span>
          <span className="metric-value">{total}</span>
          <span className="metric-sub">Registered employees</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
          <UserCheck size={22} />
        </div>
        <div className="metric-details">
          <span className="metric-label">Active Now</span>
          <span className="metric-value">{activeCount}</span>
          <span className="metric-sub">{total > 0 ? `${Math.round((activeCount / total) * 100)}% active rate` : '0%'}</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
          <CalendarOff size={22} />
        </div>
        <div className="metric-details">
          <span className="metric-label">On Leave</span>
          <span className="metric-value">{leaveCount}</span>
          <span className="metric-sub">Temporary away</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon-box" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8' }}>
          <Building2 size={22} />
        </div>
        <div className="metric-details">
          <span className="metric-label">Departments</span>
          <span className="metric-value">{departments.size}</span>
          <span className="metric-sub">Operational units</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon-box" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
          <DollarSign size={22} />
        </div>
        <div className="metric-details">
          <span className="metric-label">Average Salary</span>
          <span className="metric-value">{formatCurrency(avgSalary)}</span>
          <span className="metric-sub">Per employee / yr</span>
        </div>
      </div>
    </div>
  );
}
