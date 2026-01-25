package com.bankify.dto;

import com.bankify.entities.LoanStatus;
import com.bankify.entities.LoanType;

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

public class LoanDetailsResponseDTO {
	private LoanType loanType;
	private double interest;
	private double currentBalance;
	private double monthlyPayment;
	private LoanStatus loanStatus;
}
