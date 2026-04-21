import React from 'react';

function ExpenseFilter({ filters, setFilters }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="employeeId">Employee ID</label>
        <input
          id="employeeId"
          name="employeeId"
          value={filters.employeeId}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label} htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="ALL">All</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div style={styles.field}>
        <label style={styles.label} htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label} htmlFor="endDate">End Date</label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: '#334155',
  },
  input: {
    border: '1px solid #cbd5e1',
    borderRadius: 12,
    padding: '10px 12px',
    fontSize: 14,
    background: '#fff',
  },
};

export default ExpenseFilter;