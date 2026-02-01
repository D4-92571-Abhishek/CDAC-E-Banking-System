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


public class ValidateCustomerTransferOtpDTO {
	private String selfAccountNo;
	private String destinationAccountNo;
	private double amount;
	private String message;
	private String transactionId;
	private String otpId;
	private String inputOTP;
	private String cancelTransaction = "FALSE";
}
