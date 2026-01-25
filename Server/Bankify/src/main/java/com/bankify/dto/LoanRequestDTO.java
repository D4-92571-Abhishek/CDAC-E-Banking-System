package com.bankify.dto;

import com.bankify.entities.LoanType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Getter @Setter @ToString @NoArgsConstructor @AllArgsConstructor
public class LoanRequestDTO {
	private double amount;
	private double interest;
	private int loanTenureYears;
	private LoanType loanType;
}
