package com.bankify.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"customer"})


@Entity
@Table(name="loans")
@AttributeOverride(name = "id",column = @Column(name="loan_id"))
public class Loan extends Base {
	@Column(nullable = false)
	private double amount;
	@Column(nullable = false)
	private double interest;
	@Enumerated(EnumType.STRING)
	@Column(name="loan_type",nullable = false)
	private LoanType loanType;
	@Enumerated(EnumType.STRING)
	@Column(name="loan_status",nullable = false)
	private LoanStatus loanStatus;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "customer")
	private Customer customer;
}
