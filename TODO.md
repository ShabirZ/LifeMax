# LifeMax TODO

### CURRENT:

## Backend
- [x] GET /api/finance/getBudgets
- [X] GET /api/finance/weeklySpending — aggregate transactions by week for current month
- [X] DELETE /api/finance/deleteTransaction

## Frontend — Auth
- [ ] Create /login page + login form (POST /api/users/loginUser, store JWT in localStorage)
- [ ] Create app/lib/api.js — fetch wrapper that attaches Authorization header
- [ ] Add clientLoader guard on /dashboard — redirect to /login if no token
- [ ] Wire up Logout button in sidebar (clear localStorage, redirect to /)

## Frontend — Wire to Backend
- [ ] Fetch real budgets on FinanceDashboard load (GET /api/finance/getBudgets)
- [ ] Fetch real transactions on FinanceDashboard load (GET /api/finance/getTransactions)
- [ ] Wire CsvUploader component to POST /api/finance/importTransactions
- [ ] Wire BudgetManager add/update/delete to backend endpoints
- [ ] Wire TransactionEntry to POST /api/finance/createTransaction
- [ ] Wire SpendingTrend chart to GET /api/finance/weeklySpending (replace mock data)

## Frontend — Remaining Features
- [ ] Edit/delete transaction UI (update endpoint exists, needs UI)
- [ ] Show real user name/email in sidebar header (currently hardcoded "User Profile")
- [ ] Handle expired JWT — detect 401 responses in api.js and redirect to /login
