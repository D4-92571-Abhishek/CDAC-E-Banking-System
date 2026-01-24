package com.bankify.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminLoanListDTO {
	
	private String customerName;
	//LoanType is Enum
	private String loanType;
	private long principle;
	private long remaining;
	private double rate;
	private long payment;
	//status is Enum
	private String status;
	private LocalDate nextDue;
	
}
