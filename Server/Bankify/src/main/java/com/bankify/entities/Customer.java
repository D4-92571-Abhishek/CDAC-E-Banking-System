package com.bankify.entities;


import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// Lombok Annotations

@Getter
@Setter
@ToString(exclude = {"user"})


// Entity Annotations
@Entity
@Table(name="customers")
@AttributeOverride(name="id",column = @Column(name="customer_id"))
public class Customer extends Base {

	@Column(name="aadhar_no",unique = true,nullable = false,length = 12)
	private String aadharNo;
	@Column(name="pan_no",unique = true,nullable = false,length = 10)
	private String panNo;
	@Column(name="gender",nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;
	@Column(name="is_loan_taken",nullable = false)
	private boolean isLoanTaken;
	
	@Column(name="account_no",unique = true,length = 10)
	private String accountNo;
	
	@Column(name="current_balance",nullable = false)
	private double currentBalance = 0.0;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id",nullable = false)

	private User user;

	
}
