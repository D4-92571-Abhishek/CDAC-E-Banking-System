package com.bankify.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bankify.dto.GeneralResponseDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

	
	@ExceptionHandler(BankifyException.class)
	public ResponseEntity<?> handleBankifyException(BankifyException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GeneralResponseDTO("Failed",e.getMessage()));
	}
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(BankifyException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new GeneralResponseDTO("Failed",e.getMessage()));
	}
	
}
