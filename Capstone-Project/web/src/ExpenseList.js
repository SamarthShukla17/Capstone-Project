import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Expense ID</th>
            <th style={styles.th}>Employee</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Approver</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td style={styles.empty} colSpan="8">No expenses match the current filters.</td>
            </tr>
          ) : (
            expenses.map((expense) => {
              const expenseId = expense.expense_id || expense.ExpenseId;
              const employeeName = expense.employee_name || expense.EmployeeName;
              const expenseDate = expense.expense_date || expense.ExpenseDate;
              const category = expense.category || expense.Category;
              const description = expense.description || expense.Description;
              const amount = expense.amount ?? expense.Amount;
              const currency = expense.currency || expense.Currency || 'INR';
              const status = expense.status || expense.Status;
              const approver = expense.approver_name || expense.ApproverName || '-';

              return (
                <tr key={expenseId}>
                  <td style={styles.td}>{expenseId}</td>
                  <td style={styles.td}>{employeeName}</td>
                  <td style={styles.td}>{expenseDate}</td>
                  <td style={styles.td}>{category}</td>
                  <td style={styles.td}>{description}</td>
                  <td style={styles.td}>₹{Number(amount).toLocaleString('en-IN')} {currency}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...badgeStyles[status] }}>{status}</span>
                  </td>
                  <td style={styles.td}>{approver}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#ffffff',
  },
  th: {
    textAlign: 'left',
    fontSize: 13,
    color: '#475569',
    background: '#f8fafc',
    padding: 12,
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: 12,
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
    fontSize: 14,
  },
  badge: {
    display: 'inline-block',
    borderRadius: 999,
    padding: '6px 10px',
    fontSize: 12,
    fontWeight: 700,
  },
  empty: {
    padding: 24,
    textAlign: 'center',
    color: '#64748b',
  },
};

const badgeStyles = {
  APPROVED: {
    color: '#166534',
    background: '#dcfce7',
  },
  PENDING: {
    color: '#92400e',
    background: '#fef3c7',
  },
  REJECTED: {
    color: '#991b1b',
    background: '#fee2e2',
  },
};

export default ExpenseList;