package com.shabir.lifemax.dto.FinanceDTO;

import java.math.BigDecimal;

public class WeeklySpendingEntry {
    private String category;
    private BigDecimal total;

    public WeeklySpendingEntry(String category, BigDecimal total) {
        this.category = category;
        this.total = total;
    }

    public String getCategory() { return category; }
    public BigDecimal getTotal() { return total; }
}
