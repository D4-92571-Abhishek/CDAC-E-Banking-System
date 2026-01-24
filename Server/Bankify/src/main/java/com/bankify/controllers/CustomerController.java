package com.bankify.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.services.CustomerService;
import com.bankify.services.TransactionServiceImpl;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private final TransactionServiceImpl transactionService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody CustomerSignupRequest request) {
        customerService.signUp(request);
        return ResponseEntity.ok("Signup successful. Awaiting manager approval.");
    }
    
    @GetMapping("/transactions/{userId}")
    public List<TransactionResponseDTO> getCustomerTransactions(
            @PathVariable Long userId) {
        return transactionService.getTransactionsByUserId(userId);
        
        
    }
    
    @GetMapping("/active-customers")
    public List<CustomerListResponseDTO> getActiveCustomers() {
        return transactionService.getActiveCustomers();
    }

}
