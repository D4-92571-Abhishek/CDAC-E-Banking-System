package com.bankify.entities;

import java.time.LocalDate;

import lombok.Getter;

@Getter

public class TransactionHistory {
	private String senderAccountNo;
	private String recieverAccountNo;
	private double amount;
	private LocalDate time;
	private TransactionType transactionType;
	private Customer customer;
}
