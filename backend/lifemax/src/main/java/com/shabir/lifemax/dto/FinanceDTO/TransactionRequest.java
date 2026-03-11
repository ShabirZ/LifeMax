package com.shabir.lifemax.dto.FinanceDTO;
import java.time.LocalDate;
import java.math.BigDecimal;

public class TransactionRequest {
    private BigDecimal amount;
    private String category;
    private String description = "";
    private LocalDate transactionDate = LocalDate.now();
    public TransactionRequest() {} // Default constructor for JSON deserialization
    public TransactionRequest(BigDecimal amount, String category, String description, LocalDate transactionDate) {
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.transactionDate = transactionDate;
    }
    public TransactionRequest(BigDecimal amount, String category, LocalDate transactionDate) {
        this.amount = amount;
        this.category = category;
        this.transactionDate = transactionDate;
    }



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
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDate getTransactionDate() {
        return transactionDate;
    }
    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }


}
