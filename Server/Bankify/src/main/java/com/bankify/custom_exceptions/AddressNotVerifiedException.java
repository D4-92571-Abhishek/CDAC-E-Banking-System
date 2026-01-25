package com.bankify.custom_exceptions;

public class AddressNotVerifiedException extends RuntimeException {
    public AddressNotVerifiedException(String message) {
        super(message);
    }
}