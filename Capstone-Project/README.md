# Capstone Project - SAP ABAP Expense Report Management System

This project combines a SAP ABAP backend with a web-style React frontend for a modern capstone presentation by Samarth Shukla (Roll No. 23051778), KIIT University.

## Project Structure

```text
Capstone-Project/
├── backend/
│   └── ZFI_EXPENSE_BACKEND.abap
├── web/
│   └── src/
│       ├── App.js
│       ├── ExpenseList.js
│       ├── ExpenseFilter.js
│       └── index.js
└── README.md
```

## Backend

`backend/ZFI_EXPENSE_BACKEND.abap` contains reusable ABAP logic for loading and filtering expense records. It is structured as a backend service layer so you can later connect it to SEGW, OData, RAP, RFC, or a classic report wrapper.

## Frontend

The React frontend in `web/src/` shows a web-style dashboard for the same expense records. By default it uses local bundled demo data so the UI can run immediately. If you later expose your SAP service as OData, set `REACT_APP_SAP_ODATA_URL` in your frontend environment and the app will try to fetch real SAP data.

## Student Details

- Name: Samarth Shukla
- Roll No: 23051778
- University: KIIT University

## How to Use

### Run the backend in SAP

1. Open transaction `SE38`.
2. Create a program named `ZFI_EXPENSE_BACKEND`.
3. Paste the ABAP file content and activate it.
4. Execute it for a simple backend test.

### Run the frontend locally

1. Create a React app or place these files inside an existing React app's `src/` folder.
2. Ensure `react` and `react-dom` are installed.
3. Start the development server with `npm start`.
4. Optionally define `REACT_APP_SAP_ODATA_URL` to connect to SAP OData.

## Notes

This repository is designed to be portfolio-friendly while staying aligned to a SAP ABAP capstone theme. The backend remains ABAP-centric, while the frontend gives it a modern presentation layer.