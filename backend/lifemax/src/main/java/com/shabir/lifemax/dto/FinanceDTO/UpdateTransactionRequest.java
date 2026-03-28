package com.shabir.lifemax.dto.FinanceDTO;

import java.math.BigDecimal;
import java.time.LocalDate;

public class UpdateTransactionRequest {
    private Integer transactionId;
    private BigDecimal amount;
    private String category;
    private String description;
    private LocalDate transactionDate;

    public UpdateTransactionRequest() {}

    public Integer getTransactionId() { return transactionId; }
    public void setTransactionId(Integer transactionId) { this.transactionId = transactionId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDate transactionDate) { this.transactionDate = transactionDate; }
}
