package com.bankify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDTO {
    private Long totalAccounts;
    private Long dailyTransactions;
    private Double totalRevenue;
}

