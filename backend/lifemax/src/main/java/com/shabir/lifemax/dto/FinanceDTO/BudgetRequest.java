package com.shabir.lifemax.dto.FinanceDTO;

import java.math.BigDecimal;

public class BudgetRequest {
    private BigDecimal amount;
    private String category;

    BudgetRequest() {} 
    public BudgetRequest(BigDecimal amount, String category) {
        this.amount = amount;
        this.category = category;
    }
    public BudgetRequest(String category) {
        this.category = category;
    }
    // Getters and setters

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
