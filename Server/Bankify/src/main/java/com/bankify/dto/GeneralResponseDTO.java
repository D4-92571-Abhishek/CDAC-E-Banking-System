package com.bankify.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Getter
@Setter
@ToString
@NoArgsConstructor
public class GeneralResponseDTO {
	private String status;
	private String message;
	private LocalDateTime timestamp = LocalDateTime.now();
	public GeneralResponseDTO(String status,String message) {
		this.status = status;
		this.message = message;
	}
}
