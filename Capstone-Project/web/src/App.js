import React, { useEffect, useMemo, useState } from 'react';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';

const demoExpenses = [
  {
    expense_id: 'EXP000000001',
    employee_id: '23051778',
    employee_name: 'Samarth Shukla',
    expense_date: '2026-04-01',
    category: 'TRAVEL',
    amount: 4500,
    currency: 'INR',
    description: 'Travel for KIIT SAP ABAP capstone review meeting',
    status: 'APPROVED',
    approval_date: '2026-04-03',
    approver_name: 'Finance Manager',
  },
  {
    expense_id: 'EXP000000002',
    employee_id: '23051778',
    employee_name: 'Samarth Shukla',
    expense_date: '2026-04-04',
    category: 'MEALS',
    amount: 850,
    currency: 'INR',
    description: 'Project discussion lunch with faculty coordinator',
    status: 'APPROVED',
    approval_date: '2026-04-05',
    approver_name: 'Finance Manager',
  },
  {
    expense_id: 'EXP000000003',
    employee_id: '23051778',
    employee_name: 'Samarth Shukla',
    expense_date: '2026-04-07',
    category: 'ACCOMMODATION',
    amount: 3200,
    currency: 'INR',
    description: 'Stay for external presentation and project submission',
    status: 'PENDING',
    approval_date: '',
    approver_name: '',
  },
  {
    expense_id: 'EXP000000004',
    employee_id: '23051778',
    employee_name: 'Samarth Shukla',
    expense_date: '2026-04-10',
    category: 'TRANSPORT',
    amount: 650,
    currency: 'INR',
    description: 'Local transport for capstone implementation work',
    status: 'APPROVED',
    approval_date: '2026-04-11',
    approver_name: 'Finance Manager',
  },
  {
    expense_id: 'EXP000000005',
    employee_id: '23051778',
    employee_name: 'Samarth Shukla',
    expense_date: '2026-04-12',
    category: 'OFFICE_SUPPLIES',
    amount: 1200,
    currency: 'INR',
    description: 'Stationery and print materials for capstone',
    status: 'REJECTED',
    approval_date: '2026-04-13',
    approver_name: 'Finance Manager',
  },
  {
    expense_id: 'EXP000000006',
    employee_id: '23051778',
    employee_name: 'Samarth Shukla',
    expense_date: '2026-04-15',
    category: 'MISCELLANEOUS',
    amount: 500,
    currency: 'INR',
    description: 'Miscellaneous implementation expense',
    status: 'PENDING',
    approval_date: '',
    approver_name: '',
  },
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    employeeId: '23051778',
    status: 'ALL',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const loadExpenses = async () => {
      setLoading(true);
      setError('');

      const baseUrl = process.env.REACT_APP_SAP_ODATA_URL;
      if (!baseUrl) {
        setExpenses(demoExpenses);
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams();
        params.set('$format', 'json');
        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch SAP OData service');
        }
        const data = await response.json();
        const records = data?.d?.results || data?.value || [];
        setExpenses(records);
      } catch (err) {
        setError(`${err.message}. Showing fallback demo data.`);
        setExpenses(demoExpenses);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const employeeOk =
        !filters.employeeId ||
        expense.employee_id === filters.employeeId ||
        expense.EmployeeId === filters.employeeId;

      const statusValue = expense.status || expense.Status;
      const dateValue = expense.expense_date || expense.ExpenseDate;
      const statusOk = filters.status === 'ALL' || statusValue === filters.status;
      const startOk = !filters.startDate || dateValue >= filters.startDate;
      const endOk = !filters.endDate || dateValue <= filters.endDate;

      return employeeOk && statusOk && startOk && endOk;
    });
  }, [expenses, filters]);

  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => {
      const value = Number(expense.amount ?? expense.Amount ?? 0);
      return sum + value;
    }, 0);
  }, [filteredExpenses]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.eyebrow}>SAP ABAP Capstone Project</p>
        <h1 style={styles.title}>Expense Report Management System</h1>
        <p style={styles.subtitle}>
          Web-style frontend for Samarth Shukla (23051778), KIIT University.
          This UI can consume a real SAP OData endpoint or fall back to bundled demo records.
        </p>

        <div style={styles.summaryRow}>
          <div style={styles.summaryBox}>
            <span style={styles.summaryLabel}>Visible records</span>
            <strong style={styles.summaryValue}>{filteredExpenses.length}</strong>
          </div>
          <div style={styles.summaryBox}>
            <span style={styles.summaryLabel}>Total amount</span>
            <strong style={styles.summaryValue}>₹{totalAmount.toLocaleString('en-IN')}</strong>
          </div>
          <div style={styles.summaryBox}>
            <span style={styles.summaryLabel}>Data source</span>
            <strong style={styles.summaryValue}>
              {process.env.REACT_APP_SAP_ODATA_URL ? 'SAP OData' : 'Local demo data'}
            </strong>
          </div>
        </div>

        <ExpenseFilter filters={filters} setFilters={setFilters} />

        {loading ? <p>Loading expenses...</p> : null}
        {error ? <p style={styles.error}>{error}</p> : null}
        {!loading ? <ExpenseList expenses={filteredExpenses} /> : null}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f7fb',
    padding: '32px 16px',
    fontFamily: 'Inter, Arial, sans-serif',
    color: '#1f2937',
  },
  card: {
    maxWidth: 1200,
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: 20,
    padding: 24,
    boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)',
  },
  eyebrow: {
    margin: 0,
    color: '#0f766e',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  title: {
    margin: '8px 0 12px',
    fontSize: 36,
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 24,
    maxWidth: 800,
    color: '#475569',
    lineHeight: 1.6,
  },
  summaryRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  summaryBox: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    padding: 16,
  },
  summaryLabel: {
    display: 'block',
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
  },
  error: {
    color: '#b91c1c',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    padding: 12,
    borderRadius: 12,
  },
};

export default App;