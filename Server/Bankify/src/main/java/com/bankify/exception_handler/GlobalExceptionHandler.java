package com.bankify.exception_handler;

import com.bankify.custom_exceptions.*;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /* ================= HELPER ================= */

    private ResponseEntity<Map<String, Object>> buildResponse(
            String message,
            HttpStatus status
    ) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("message", message);
        return new ResponseEntity<>(body, status);
    }

    /* ================= VALIDATION ================= */

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex
    ) {
        String error = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .orElse("Invalid input data");

        return buildResponse(error, HttpStatus.BAD_REQUEST);
    }

    /* ================= DUPLICATE (DB UNIQUE CONSTRAINT) ================= */

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateKey(
            DataIntegrityViolationException ex
    ) {
        return buildResponse(
                "Customer already exists with same email/contact/Aadhar/PAN",
                HttpStatus.CONFLICT
        );
    }

    /* ================= DUPLICATE (SERVICE LEVEL) ================= */

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateResource(
            DuplicateResourceException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CustomerAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleCustomerAlreadyExists(
            CustomerAlreadyExistsException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CustomerAlreadyActiveException.class)
    public ResponseEntity<Map<String, Object>> handleCustomerAlreadyActive(
            CustomerAlreadyActiveException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.CONFLICT);
    }

    /* ================= NOT FOUND ================= */

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNotFound(
            UserNotFoundException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleCustomerNotFound(
            CustomerNotFoundException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AddressNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleAddressNotFound(
            AddressNotFoundException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    /* ================= BAD REQUEST ================= */

    @ExceptionHandler(AddressNotVerifiedException.class)
    public ResponseEntity<Map<String, Object>> handleAddressNotVerified(
            AddressNotVerifiedException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<Map<String, Object>> handleInsufficientBalance(
            InsufficientBalanceException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /* ================= AUTH ================= */

    @ExceptionHandler(CustomerNotVerifiedException.class)
    public ResponseEntity<Map<String, Object>> handleCustomerNotVerified(
            CustomerNotVerifiedException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<Map<String, Object>> handleIncorrectPassword(
            IncorrectPasswordException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    /* ================= NO DATA ================= */

    @ExceptionHandler(NoTransactionsException.class)
    public ResponseEntity<Map<String, Object>> handleNoTransactions(
            NoTransactionsException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    /* ================= FALLBACKS ================= */

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(
            RuntimeException ex
    ) {
        return buildResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAll(
            Exception ex
    ) {
        return buildResponse("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
