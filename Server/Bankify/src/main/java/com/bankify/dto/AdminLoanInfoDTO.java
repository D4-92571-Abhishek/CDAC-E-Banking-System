package com.bankify.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminLoanInfoDTO {
	
	private Long totalLoanAccounts;
	private double outstandingBalance;
	private Long overdueLoanAccounts;
	private double averageInterest;
	
}
