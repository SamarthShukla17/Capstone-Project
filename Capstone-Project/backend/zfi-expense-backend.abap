*&---------------------------------------------------------------------*
*& Program: ZFI_EXPENSE_BACKEND
*& Title  : Expense Report Backend Service
*& Author : Samarth Shukla (23051778, KIIT University)
*& Purpose: Backend ABAP logic for web-style SAP ABAP capstone project.
*&---------------------------------------------------------------------*

REPORT zfi_expense_backend.

CLASS lcl_expense_backend DEFINITION FINAL.
  PUBLIC SECTION.
    TYPES: BEGIN OF ty_expense,
             expense_id    TYPE c LENGTH 12,
             employee_id   TYPE c LENGTH 12,
             employee_name TYPE c LENGTH 40,
             expense_date  TYPE d,
             category      TYPE c LENGTH 20,
             amount        TYPE p LENGTH 10 DECIMALS 2,
             currency      TYPE c LENGTH 3,
             description   TYPE c LENGTH 100,
             status        TYPE c LENGTH 15,
             approval_date TYPE d,
             approver_name TYPE c LENGTH 40,
           END OF ty_expense,
           tt_expense TYPE STANDARD TABLE OF ty_expense WITH DEFAULT KEY.

    CLASS-METHODS get_expenses
      IMPORTING
        iv_employee_id TYPE c LENGTH 12 OPTIONAL
        iv_from_date   TYPE d OPTIONAL
        iv_to_date     TYPE d OPTIONAL
        iv_status      TYPE c LENGTH 15 OPTIONAL
      RETURNING VALUE(rt_expenses) TYPE tt_expense.

  PRIVATE SECTION.
    CLASS-METHODS load_demo_data
      RETURNING VALUE(rt_expenses) TYPE tt_expense.
ENDCLASS.

CLASS lcl_expense_backend IMPLEMENTATION.

  METHOD load_demo_data.
    DATA ls_expense TYPE ty_expense.

    CLEAR ls_expense.
    ls_expense-expense_id = 'EXP000000001'.
    ls_expense-employee_id = '23051778'.
    ls_expense-employee_name = 'Samarth Shukla'.
    ls_expense-expense_date = sy-datum - 20.
    ls_expense-category = 'TRAVEL'.
    ls_expense-amount = '4500.00'.
    ls_expense-currency = 'INR'.
    ls_expense-description = 'Travel for KIIT SAP ABAP capstone review meeting'.
    ls_expense-status = 'APPROVED'.
    ls_expense-approval_date = sy-datum - 18.
    ls_expense-approver_name = 'Finance Manager'.
    APPEND ls_expense TO rt_expenses.

    CLEAR ls_expense.
    ls_expense-expense_id = 'EXP000000002'.
    ls_expense-employee_id = '23051778'.
    ls_expense-employee_name = 'Samarth Shukla'.
    ls_expense-expense_date = sy-datum - 17.
    ls_expense-category = 'MEALS'.
    ls_expense-amount = '850.00'.
    ls_expense-currency = 'INR'.
    ls_expense-description = 'Project discussion lunch with faculty coordinator'.
    ls_expense-status = 'APPROVED'.
    ls_expense-approval_date = sy-datum - 16.
    ls_expense-approver_name = 'Finance Manager'.
    APPEND ls_expense TO rt_expenses.

    CLEAR ls_expense.
    ls_expense-expense_id = 'EXP000000003'.
    ls_expense-employee_id = '23051778'.
    ls_expense-employee_name = 'Samarth Shukla'.
    ls_expense-expense_date = sy-datum - 14.
    ls_expense-category = 'ACCOMMODATION'.
    ls_expense-amount = '3200.00'.
    ls_expense-currency = 'INR'.
    ls_expense-description = 'Stay for external presentation and project submission'.
    ls_expense-status = 'PENDING'.
    ls_expense-approval_date = '00000000'.
    ls_expense-approver_name = ''.
    APPEND ls_expense TO rt_expenses.

    CLEAR ls_expense.
    ls_expense-expense_id = 'EXP000000004'.
    ls_expense-employee_id = '23051778'.
    ls_expense-employee_name = 'Samarth Shukla'.
    ls_expense-expense_date = sy-datum - 12.
    ls_expense-category = 'TRANSPORT'.
    ls_expense-amount = '650.00'.
    ls_expense-currency = 'INR'.
    ls_expense-description = 'Local transport for capstone implementation work'.
    ls_expense-status = 'APPROVED'.
    ls_expense-approval_date = sy-datum - 11.
    ls_expense-approver_name = 'Finance Manager'.
    APPEND ls_expense TO rt_expenses.

    CLEAR ls_expense.
    ls_expense-expense_id = 'EXP000000005'.
    ls_expense-employee_id = '23051778'.
    ls_expense-employee_name = 'Samarth Shukla'.
    ls_expense-expense_date = sy-datum - 10.
    ls_expense-category = 'OFFICE_SUPPLIES'.
    ls_expense-amount = '1200.00'.
    ls_expense-currency = 'INR'.
    ls_expense-description = 'Stationery and print materials for capstone'.
    ls_expense-status = 'REJECTED'.
    ls_expense-approval_date = sy-datum - 8.
    ls_expense-approver_name = 'Finance Manager'.
    APPEND ls_expense TO rt_expenses.

    CLEAR ls_expense.
    ls_expense-expense_id = 'EXP000000006'.
    ls_expense-employee_id = '23051778'.
    ls_expense-employee_name = 'Samarth Shukla'.
    ls_expense-expense_date = sy-datum - 7.
    ls_expense-category = 'MISCELLANEOUS'.
    ls_expense-amount = '500.00'.
    ls_expense-currency = 'INR'.
    ls_expense-description = 'Miscellaneous implementation expense'.
    ls_expense-status = 'PENDING'.
    ls_expense-approval_date = '00000000'.
    ls_expense-approver_name = ''.
    APPEND ls_expense TO rt_expenses.
  ENDMETHOD.

  METHOD get_expenses.
    DATA lt_all TYPE tt_expense.
    DATA ls_expense TYPE ty_expense.

    lt_all = load_demo_data( ).

    LOOP AT lt_all INTO ls_expense.
      IF iv_employee_id IS NOT INITIAL AND ls_expense-employee_id <> iv_employee_id.
        CONTINUE.
      ENDIF.

      IF iv_from_date IS NOT INITIAL AND ls_expense-expense_date < iv_from_date.
        CONTINUE.
      ENDIF.

      IF iv_to_date IS NOT INITIAL AND ls_expense-expense_date > iv_to_date.
        CONTINUE.
      ENDIF.

      IF iv_status IS NOT INITIAL AND iv_status <> 'ALL' AND ls_expense-status <> iv_status.
        CONTINUE.
      ENDIF.

      APPEND ls_expense TO rt_expenses.
    ENDLOOP.
  ENDMETHOD.
ENDCLASS.

START-OF-SELECTION.
  DATA(lt_expenses) = lcl_expense_backend=>get_expenses(
    iv_employee_id = '23051778'
    iv_from_date   = sy-datum - 30
    iv_to_date     = sy-datum
    iv_status      = 'ALL' ).

  WRITE: / 'Backend test execution for Samarth Shukla (23051778, KIIT University)'.
  WRITE: / 'Records returned:', lines( lt_expenses ).