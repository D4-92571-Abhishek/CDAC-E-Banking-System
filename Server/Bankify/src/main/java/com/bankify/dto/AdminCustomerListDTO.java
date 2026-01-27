package com.bankify.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.bankify.entities.Role;
import com.bankify.entities.Status;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminCustomerListDTO {

	private String customerName;
	private String accountNumber;
	private double balance;
	private Status status;
	private LocalDate joinDate;
	private LocalDateTime lastTransactionTime;
	
}
