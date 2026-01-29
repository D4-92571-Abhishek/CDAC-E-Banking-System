package com.bankify.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetCustomerAccountDetailsDTO {
	public double currentBalance;
	public double totalIncomingAmount;
	public double totalOutGoingAmount;
}
