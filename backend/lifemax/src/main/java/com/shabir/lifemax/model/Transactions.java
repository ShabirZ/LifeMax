package com.shabir.lifemax.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
/**
 * Transaction Table
 * Records individual financial transactions, including amount, category (e.g., "Groceries", "Entertainment"), description, and timestamp.
 * This allows users to track their spending habits and analyze where their money is going.
 * 
 * @author Shabir
 * @since 1.0
 */
@Entity
@Table(name = "transactions")
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transaction_id;
    
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;
    @Column(name = "category", nullable = false)
    private String category;
    @Column(name = "description", nullable = true)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private LocalDateTime transactionDate;  // When it happened

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;        // When saved in DB

    public Transactions() {}
    public Transactions(BigDecimal amount, String category, String description, Users user, LocalDateTime timestamp) {
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.user = user;
        this.transactionDate = timestamp;
        this.createdAt = LocalDateTime.now();
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
    public Users getUser() {
        return user;
    }
    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }
    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }



}
