export const formatCurrency = (amount) => {
  if (isNaN(amount) || amount === null || amount === undefined) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return dateStr;
  }
};

export const getInitials = (firstName = "", lastName = "") => {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return `${f}${l}` || "EM";
};

export const generateNextId = (employees = []) => {
  const numericIds = employees
    .map(emp => {
      const match = emp.id?.match(/EMP-(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter(Boolean);

  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 1000;
  return `EMP-${maxId + 1}`;
};

export const exportToCSV = (employees, filename = "employees_export.csv") => {
  const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Department",
    "Role",
    "Employment Type",
    "Salary",
    "Start Date",
    "Status",
    "Location",
    "Notes"
  ];

  const rows = employees.map(emp => [
    emp.id,
    `"${(emp.firstName || "").replace(/"/g, '""')}"`,
    `"${(emp.lastName || "").replace(/"/g, '""')}"`,
    `"${(emp.email || "").replace(/"/g, '""')}"`,
    `"${(emp.phone || "").replace(/"/g, '""')}"`,
    `"${(emp.department || "").replace(/"/g, '""')}"`,
    `"${(emp.role || "").replace(/"/g, '""')}"`,
    `"${(emp.employmentType || "").replace(/"/g, '""')}"`,
    emp.salary,
    emp.startDate,
    `"${(emp.status || "").replace(/"/g, '""')}"`,
    `"${(emp.location || "").replace(/"/g, '""')}"`,
    `"${(emp.notes || "").replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
