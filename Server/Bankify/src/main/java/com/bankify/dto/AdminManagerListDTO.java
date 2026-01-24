package com.bankify.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminManagerListDTO {
	
	private String managerName;
	private long employeeId;
	private LocalDate hireDate;
	
}
