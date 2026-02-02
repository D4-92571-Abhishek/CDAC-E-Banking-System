package com.bankify.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class ActiveLoanDetailsDTO {
	private double totalLoanAmountTaken;
	private int activeLoans;
	private double totalEmi;
}
