package com.bankify.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminCustomerInfoDTO {
	
	private long totalCustomers;
	private long totalBalance;
	private long averageBalance;
	
}
