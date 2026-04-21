# Project Documentation

**Capstone Project - SAP ABAP Expense Report Management System**

## Student Information
- **Name**: Samarth Shukla  
- **Roll No**: 23051778  
- **University**: KIIT University  
- **Project Type**: Capstone Project (SAP ABAP + Modern Web Frontend)

## Project Overview

This capstone project demonstrates the integration of traditional **SAP ABAP** backend development with a modern **React.js** frontend. The result is a clean, responsive **Expense Report Management System** that showcases both robust enterprise backend logic and a contemporary user-friendly dashboard.

The backend is built as a reusable ABAP service layer, while the frontend provides an interactive web-style interface. The design allows the React app to run independently with mock data during development and easily connect to live SAP data via OData in a production-like setup.

This hybrid approach highlights full-stack capabilities in the SAP ecosystem and serves as a strong portfolio piece for both academic evaluation and job applications.

## Objectives

- Develop modular and reusable ABAP logic for expense data handling and filtering.
- Build a responsive, modern React dashboard for viewing and managing expense reports.
- Demonstrate integration possibilities between SAP ABAP and contemporary web technologies.
- Create a project that balances traditional SAP development with modern frontend practices.
- Ensure the system is extensible for future features like approvals, reporting, and full CRUD operations.

## Technology Stack

| Layer       | Technology              | Purpose                              |
|-------------|-------------------------|--------------------------------------|
| Backend     | SAP ABAP                | Business logic, data loading & filtering |
| Frontend    | React.js + JavaScript   | Interactive dashboard UI             |
| Integration | OData (future)          | Connecting frontend to SAP backend   |
| Development | SAP GUI (SE38), npm     | Backend execution & frontend dev     |

**Languages Used**:  
- JavaScript: 68.3%  
- ABAP: 31.7%

## Key Features

### Backend Features
- Reusable service layer for loading expense records
- Advanced filtering support (by date, amount, category, status, etc.)
- Structured for easy consumption via OData, RAP, RFC, or classic reports

### Frontend Features
- Responsive expense dashboard with clean UI
- Dynamic expense list view
- Interactive filtering component
- Support for both local mock data and live SAP OData integration
- Modern web design suitable for enterprise presentation

## Repository Structure

```bash
Capstone-Project/
├── backend/
│   └── ZFI_EXPENSE_BACKEND.abap          # Core ABAP service logic
├── web/
│   └── src/
│       ├── App.js                        # Main React component
│       ├── ExpenseList.js                # Displays expense records
│       ├── ExpenseFilter.js              # Filtering UI
│       └── index.js                      # React entry point
├── README.md
└── PROJECT_DOCUMENTATION.md              # This file