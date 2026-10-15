import React from 'react';
import { Users, UserPlus, Download, RotateCcw } from 'lucide-react';

export default function Navbar({ onAddClick, onExportClick, onResetClick, totalEmployees }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-icon-box">
            <Users size={22} />
          </div>
          <div>
            <span>StaffSync</span>
            <span className="brand-badge">CRUD Portal</span>
          </div>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onResetClick}
            title="Reset data back to default sample records"
          >
            <RotateCcw size={15} />
            <span>Reset Data</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onExportClick}
            disabled={totalEmployees === 0}
            title="Export employees to CSV file"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddClick}
          >
            <UserPlus size={16} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>
    </header>
  );
}
