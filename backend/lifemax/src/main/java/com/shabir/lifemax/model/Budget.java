package com.shabir.lifemax.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Budget Table  
 * Allows users to set monthly budgets for different categories (e.g., "Groceries", "Entertainment") and track their spending against these budgets.
 * 
 * @author Shabir
 * @since 1.0
 */


@Entity
@Table(name = "budgets", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "category_name"}) // Prevents duplicate "Groceries" for the same user
})
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; 

    @Column(name = "category_name", nullable = false)
    private String categoryName;

    @Column(name = "budget_amount", nullable = false)
    private BigDecimal budgetAmount; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

  
    public Budget() {} 

    public Budget(String categoryName, BigDecimal budgetAmount, Users user) {
        this.categoryName = categoryName;
        this.budgetAmount = budgetAmount;
        this.user = user;
    }


    public Integer getId() { return id; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public BigDecimal getBudgetAmount() { return budgetAmount; }
    public void setBudgetAmount(BigDecimal budgetAmount) { this.budgetAmount = budgetAmount; }

    public Users getUser() { return user; }
}