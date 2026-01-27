package com.bankify.dto;

import java.sql.Date;
import java.time.LocalDate;

import com.bankify.entities.LoanStatus;
import com.bankify.entities.LoanType;

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
	private LoanType loanType;
	private Long principle;
	private Double remaining;
	private double rate;
	private Long emi;
	private Double payment;
	private LoanStatus status;
	private LocalDate nextDue;
	
	public AdminLoanListDTO(
		    String customerName,
		    LoanType loanType,
		    Double principle,
		    Double remaining,
		    double rate,
		    Double emi,
		    Double payment,
		    LoanStatus status
		) {
		    this.customerName = customerName;
		    this.loanType = loanType;
		    this.principle = principle.longValue();
		    this.remaining = remaining;
		    this.rate = rate;
		    this.emi = emi.longValue();
		    this.payment = payment;
		    this.status = status;
		}

	   
}
