package com.bankify.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@AttributeOverride(name="id",column = @Column(name="transaction_id"))
public class TransactionHistory extends Base{
	@Column(name="sender_account_no")
	private String senderAccountNo;
	@Column(name="reciever_account_no")
	private String recieverAccountNo;
	private double amount;
	@Column(name="transaction_type")
	@Enumerated(EnumType.STRING)
	private TransactionType transactionType;
	
	@Column(name="transaction_status",nullable = false,length = 20)
	@Enumerated(EnumType.STRING)
	private TransactionStatus transactionStatus = TransactionStatus.PENDING;
	
	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;
	
	@OneToOne
	@JoinColumn(name= "transaction_id")
	private Transaction transaction;
	
}
