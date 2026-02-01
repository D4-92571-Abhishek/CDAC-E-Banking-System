package com.bankify.entities;

import java.time.LocalDateTime;


import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// lombok Annotations

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"customer"})


@Entity
@Table(name="transactions")
@AttributeOverride(name="id",column = @Column(name="transactions_id"))

public class Transaction extends Base {
	
	@Column(name="amount")
	private double amount =0;
	
	@Column(name="transaction_type")
	@Enumerated(EnumType.STRING)
	private TransactionType transactionType;
	@Column(name = "transaction_time")
	private LocalDateTime transactionTime;
	
	@Column(name="transaction_description")
	private String transactionDescription;
	
	@Column(name="transaction_status",nullable = false,length = 20)
	@Enumerated(EnumType.STRING)
	private TransactionStatus transactionStatus = TransactionStatus.PENDING;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="customer_id",nullable = false)
	private Customer customer;
	
}
