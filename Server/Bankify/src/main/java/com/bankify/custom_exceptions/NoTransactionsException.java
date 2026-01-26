package com.bankify.custom_exceptions;

public class NoTransactionsException extends RuntimeException {
    public NoTransactionsException(String message) {
        super(message);
    }
}
