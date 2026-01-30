package com.bankify.custom_exceptions;

public class CustomerAlreadyActiveException extends RuntimeException {
    public CustomerAlreadyActiveException(String message) {
        super(message);
    }
    
}
