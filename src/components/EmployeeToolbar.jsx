import React from 'react';
import { Search, X, LayoutGrid, Table, Trash2, ArrowUpDown } from 'lucide-react';
import { DEPARTMENTS, EMPLOYMENT_TYPES, STATUS_OPTIONS } from '../data/mockEmployees';

export default function EmployeeToolbar({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  selectedCount,
  onDeleteSelected
}) {
  return (
    <div className="toolbar-card">
      <div className="toolbar-top">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, role, or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="toolbar-controls">
          {/* Department Filter */}
          <select
            className="select-control"
            value={departmentFilter}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="ALL">All Departments</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            className="select-control"
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="ALL">All Types</option>
            {EMPLOYMENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="select-control"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            className="select-control"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="name-asc">Sort: Name (A to Z)</option>
            <option value="name-desc">Sort: Name (Z to A)</option>
            <option value="salary-desc">Sort: Salary (High to Low)</option>
            <option value="salary-asc">Sort: Salary (Low to High)</option>
            <option value="date-desc">Sort: Newest Hires</option>
            <option value="date-asc">Sort: Oldest Hires</option>
          </select>

          {/* View Mode Toggle */}
          <div className="view-toggle">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => onViewModeChange('table')}
              title="Table View"
            >
              <Table size={16} />
              <span>Table</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Grid Cards View"
            >
              <LayoutGrid size={16} />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="bulk-bar">
          <div>
            <span className="bulk-count">{selectedCount}</span> employee{selectedCount > 1 ? 's' : ''} selected
          </div>
          <button
            type="button"
            className="btn btn-outline-danger"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8125rem' }}
            onClick={onDeleteSelected}
          >
            <Trash2 size={14} />
            <span>Delete Selected</span>
          </button>
        </div>
      )}
    </div>
  );
}
