package com.bankify.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.DashboardStatsDTO;
import com.bankify.dto.EditManagerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.ManagerCreateCustomerDTO;
import com.bankify.dto.ManagerHeaderDTO;
import com.bankify.entities.User;
import com.bankify.repository.UserRepository;
import com.bankify.service.ManagerService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/bankify/manager")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ManagerController {

    private final ManagerService managerService;


    @GetMapping("/pending")
    public ResponseEntity<?> getPendingCustomers() {
        return ResponseEntity.ok(managerService.getPendingCustomers());
    }
    
    @GetMapping("/active-customers")
    public ResponseEntity<?> getActiveCustomers() {
        return ResponseEntity.ok(managerService.getActiveCustomers());
    }

    @PutMapping("/verify-customer/{userId}")
    public ResponseEntity<?> verifyCustomer(@PathVariable Long userId) {
        return ResponseEntity.ok(managerService.verifyCustomer(userId));
    }

    @PutMapping("/verify-address/{userId}")
    public ResponseEntity<?> verifyAddress(@PathVariable Long userId) {
        return ResponseEntity.ok(managerService.verifyAddress(userId));
    }

    @PutMapping("/approve/{userId}")
    public ResponseEntity<?> approveCustomer(@PathVariable Long userId) {
        return ResponseEntity.ok(managerService.approveCustomer(userId));
    }

    @PutMapping("/reject/{userId}")
    public ResponseEntity<?> rejectCustomer(@PathVariable Long userId) {
        return ResponseEntity.ok(managerService.rejectCustomer(userId));
    }
    
    @GetMapping("/transactions/{userId}")
  public ResponseEntity<?> getCustomerTransactions(
         @PathVariable Long userId) {
     return ResponseEntity.ok(managerService.getTransactionsByUserId(userId));
    }
    
    @PutMapping("/edit-details/{userId}")
    public ResponseEntity<?> editManagerDetails(@PathVariable Long userId, @RequestBody EditManagerDetailsDTO dto) 
    {
    	

        return ResponseEntity .status(HttpStatus.ACCEPTED)
                .body(managerService.editManagerDetails(userId, dto));
    }

    @PutMapping("/update-password/{userId}")
    public ResponseEntity<?> editManagerPassword(
            @PathVariable Long userId,
            @RequestBody EditPasswordDTO dto) {

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(managerService.editManagerPassword(userId, dto));
    }

    @GetMapping("/details/{userId}")
    public ResponseEntity<?> getManagerDetails(@PathVariable Long userId) {
        return ResponseEntity.ok(managerService.getManagerDetails(userId));
    }

    @PostMapping("/create-customer")
    public ResponseEntity<?> createCustomer(@RequestBody ManagerCreateCustomerDTO dto) {
        return ResponseEntity.ok(managerService.createCustomerAsManager(dto));
    }
    
    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {

        DashboardStatsDTO stats = managerService.getDashboardStats();

        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/me")
    public ResponseEntity<ManagerHeaderDTO> getManagerProfile(Authentication authentication) {

        Long userId = Long.parseLong(authentication.getName());

        return ResponseEntity.ok(managerService.getManagerDetails(userId));
    }

    
    
  /*  @GetMapping("/me")
    public ResponseEntity<ManagerHeaderDTO> getManagerProfile(Authentication authentication) {

        String email = authentication.getName(); // from JWT

        ManagerHeaderDTO profile = managerService.getLoggedInManagerProfile(email);

        return ResponseEntity.ok(profile);
    } */
   
}






