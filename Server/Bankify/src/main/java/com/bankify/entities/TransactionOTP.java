package com.bankify.entities;

import java.time.LocalDateTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor



@Entity
@Table(name="transaction_OTP")
@AttributeOverride(name="id",column = @Column(name="otp_id"))
public class TransactionOTP extends Base{
	private String otp;
	private LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5);
	boolean isVerified = false;
	@OneToOne
	@JoinColumn(name="transaction_id",nullable = false)
	private Transaction transaction;
	
	
}
