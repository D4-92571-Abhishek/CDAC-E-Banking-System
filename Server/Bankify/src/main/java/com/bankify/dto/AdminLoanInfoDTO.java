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
	
	private long totalLoanAccounts;
	private long outstandingBalance;
	private long overdueLoanAccounts;
	private long interest;
	
}
