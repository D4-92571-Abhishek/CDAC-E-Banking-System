package com.bankify.entities;

import java.time.LocalDate;

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
@ToString(exclude = {})


@Entity
@Table(name="loan_department")
@AttributeOverride(name = "id",column = @Column(name="loan_id"))
public class LoanDepartment extends Base {
	@Column(nullable = false)
	private double amount;
	@Column(nullable = false)
	private double interest;
	@Column(name="start_date",nullable = false)
	private LocalDate startDate;
	@Column(name="end_date",nullable = false)
	private LocalDate endDate;
	@Enumerated(EnumType.STRING)
	@Column(name="loan_type",nullable = false)
	private LoanType loanType;
	@Enumerated(EnumType.STRING)
	@Column(name="loan_status",nullable = false)
	private LoanStatus loanStatus;
	@Column(name="loan_tenure_years",nullable = false)
	private int loanTenureYears;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "customer")
	private Customer customer;
}
