package com.bankify.controllers;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.ManagerCreateCustomerDTO;
import com.bankify.entities.User;
import com.bankify.services.ManagerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerService managerService;

    @GetMapping("/pending")
    public List<User> getPendingCustomers() {
        return managerService.getPendingCustomers();
    }
    
    @PutMapping("/verify-customer/{userId}")
    public ResponseEntity<String> verifyCustomer(@PathVariable Long userId) {
        managerService.verifyCustomer(userId);
        return ResponseEntity.ok("Customer verified");
    }

    @PutMapping("/verify-address/{userId}")
    public ResponseEntity<String> verifyAddress(@PathVariable Long userId) {
        managerService.verifyAddress(userId);
        return ResponseEntity.ok("Address verified");
    }

    @PutMapping("/approve/{userId}")
    public ResponseEntity<String> approve(@PathVariable Long userId) {
        managerService.approveCustomer(userId);
        return ResponseEntity.ok("Customer approved");
    }

    @PutMapping("/reject/{userId}")
    public ResponseEntity<String> reject(@PathVariable Long userId) {
        managerService.rejectCustomer(userId);
        return ResponseEntity.ok("Customer rejected");
    }
    
    

    @PostMapping("/create-customer")
    public ResponseEntity<User> createCustomer(@Valid @RequestBody ManagerCreateCustomerDTO dto) {
        User user = managerService.createCustomerAsManager(dto);
        return ResponseEntity.ok(user);
    }
}



