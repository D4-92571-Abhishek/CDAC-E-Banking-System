package com.bankify.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminCustomerListDTO {

	private String customerName;
	private String accountNumber;
	private long balance;
	private String status;
	private LocalDate joinDate;
	private LocalDateTime lastTransactionTime;
	
}
