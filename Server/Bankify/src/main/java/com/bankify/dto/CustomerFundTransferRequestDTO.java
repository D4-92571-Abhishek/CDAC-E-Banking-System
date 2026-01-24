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


public class CustomerFundTransferRequestDTO {
	private String selfAccountNo;
	private String destinationAccountNo;
	private double amount;
	private String message;
}
