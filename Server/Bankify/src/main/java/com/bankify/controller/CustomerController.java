package com.bankify.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.CustomerFundTransferRequestDTO;
import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.service.CustomerService;
import com.bankify.service.TransactionServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bankify/customers")
@RequiredArgsConstructor
public class CustomerController {

	private final CustomerService customerService;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody CustomerSignupRequest request) {
		customerService.signUp(request);
		return ResponseEntity.ok(new GeneralResponseDTO("Success", "User Saved Successfully"));
	}

//    @GetMapping("/transactions/{userId}")
//    public List<TransactionResponseDTO> getCustomerTransactions(
//            @PathVariable Long userId) {
//        return transactionService.getTransactionsByUserId(userId);
//        
//        
//    }
	@GetMapping("/{userId}")
	public ResponseEntity<?> getCustomerDetailsByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(customerService.getCustomerDetailsById(userId));
	}
//    @GetMapping("/active-customers")
//    public List<CustomerListResponseDTO> getActiveCustomers() {
//        return transactionService.getActiveCustomers();
//    }
	@GetMapping("/transactions/{userId}")
	public ResponseEntity<?> getCustomerTransactions(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getCustomerTransactions(userId));
	}
	
	@PostMapping("/transfer/{userId}")
	public ResponseEntity<?> transferFunds(@PathVariable Long userId,@RequestBody CustomerFundTransferRequestDTO fundDetails){
		return ResponseEntity.ok(customerService.transferFunds(userId, fundDetails));
	}

}
