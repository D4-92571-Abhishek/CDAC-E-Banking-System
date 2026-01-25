package com.bankify.custom_exceptions;

public class CustomerAlreadyExistsException extends RuntimeException{
	public CustomerAlreadyExistsException(String message) {
        super(message);
	}
}