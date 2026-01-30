package com.bankify.custom_exceptions;

public class IncorrectPasswordException extends RuntimeException{
	public IncorrectPasswordException(String message) {
        super(message);
    }
}
