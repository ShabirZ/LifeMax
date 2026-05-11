package com.shabir.lifemax.dto.FinanceDTO;

import java.math.BigDecimal;

public class BudgetRequest {
    private BigDecimal amount;
    private String category;
    private String newCategory;

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

    public String getNewCategory() {
        return newCategory;
    }

    public void setNewCategory(String newCategory) {
        this.newCategory = newCategory;
    }
}
