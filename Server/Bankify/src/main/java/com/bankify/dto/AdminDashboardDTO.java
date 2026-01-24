package com.bankify.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardDTO {
	
	private long totalCustomers;
	private double totalBankAssets;
	private double monthlyCashFlow;
	private long activeBankManagers;
	private long outstandingLoans;
	private String performance;
	
}
