package com.bankify.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class CustomerDashboardResponseDTO {
	private String name;
	private String accountNo;
	private double currentBalance;
	private double recentTransactionAmount =0;
}
