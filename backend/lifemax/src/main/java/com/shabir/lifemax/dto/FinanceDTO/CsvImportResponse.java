package com.shabir.lifemax.dto.FinanceDTO;

import java.util.List;

public class CsvImportResponse {
    private int transactionsCreated;
    private int budgetsCreated;
    private List<String> errors;

    public CsvImportResponse(int transactionsCreated, int budgetsCreated, List<String> errors) {
        this.transactionsCreated = transactionsCreated;
        this.budgetsCreated = budgetsCreated;
        this.errors = errors;
    }

    public int getTransactionsCreated() { return transactionsCreated; }
    public int getBudgetsCreated() { return budgetsCreated; }
    public List<String> getErrors() { return errors; }
}
