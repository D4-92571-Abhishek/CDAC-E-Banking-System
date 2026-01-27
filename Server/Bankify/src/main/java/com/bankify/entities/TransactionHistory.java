package com.bankify.entities;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor



public class TransactionHistory {
	private String senderAccountNo;
	private String recieverAccountNo;
	private double amount;
	private LocalDate time;
	private TransactionType transactionType;
	private Customer customer;
}
