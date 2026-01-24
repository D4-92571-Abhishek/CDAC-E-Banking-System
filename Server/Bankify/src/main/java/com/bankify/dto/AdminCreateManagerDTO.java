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
public class AdminCreateManagerDTO {
	
	private String name;
	private String email;
	private long employeeId;
	private LocalDate dob;
	private String contactNumber;
	
}
