package com.bankify.entities;

import java.time.LocalDate;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter @Setter @ToString(exclude = {"loan"})

@Entity
@Table(name="loan_details")
@AttributeOverride(name="id",column = @Column(name="loan_details_id"))
public class LoanDetails extends Base {
	@Column(nullable = false)
	private double principle;
	@Column(nullable = false)
	private double interest;
	@Column(nullable = false)
	private double emi;
	@Column(nullable = false)
	private int paidMonths =0;
	@Column(name="start_date",nullable = false)
	private LocalDate startDate = LocalDate.now();
	@Column(name="end_date",nullable = false)
	private LocalDate endDate;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "loan_id")
	private Loan loan;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="customer_id")
	private Customer customer;
}
