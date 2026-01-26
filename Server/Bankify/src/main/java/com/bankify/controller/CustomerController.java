package com.bankify.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.CustomerFundTransferRequestDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.LoanRequestDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.EditCustomerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.service.CustomerService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bankify/customers")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {

	private final CustomerService customerService;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody CustomerSignupRequest request) {
		
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.signUp(request));
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
    @GetMapping("/active-customers")
    public ResponseEntity<?> getActiveCustomers() {
        return ResponseEntity.ok(customerService.getActiveCustomers());
    }
	@GetMapping("/transactions/{userId}")
	public ResponseEntity<?> getCustomerTransactions(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getCustomerTransactions(userId));
	}
	
	@PostMapping("/transfer/{userId}")
	public ResponseEntity<?> transferFunds(@PathVariable Long userId,@RequestBody CustomerFundTransferRequestDTO fundDetails){
		return ResponseEntity.ok(customerService.transferFunds(userId, fundDetails));
	}
	
	@GetMapping("/transaction-history-debited/{userId}")
	public ResponseEntity<?> getTransferEntityDebited(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getTransactionHistoryDebited(userId));
	}
	
	@GetMapping("/transaction-history-credited/{userId}")
	public ResponseEntity<?> getTransferEntityCredited(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getTransactionHistoryCredited(userId));
	}
	
	@PostMapping("/loan/request-new-loan/{userId}")
	public ResponseEntity<?> requestNewLoan(@PathVariable Long userId,@RequestBody LoanRequestDTO loanRequestDTO){
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.requestForLoan(userId,loanRequestDTO));
	}
	
	@GetMapping("/loan/all-loans/{userId}")
	public ResponseEntity<?> getAllLoanDetails (@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getAllLoanDetails(userId));
	}
	
	@PutMapping("/edit-customer/{userId}")
	public ResponseEntity<?> editCustomerDetails(@PathVariable Long userId,@RequestBody EditCustomerDetailsDTO editcustomerDetails){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(customerService.editCustomerDetails(userId, editcustomerDetails));
	}
	@GetMapping("/get-customer/{userId}")
	public ResponseEntity<?> getCustomerDetails(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getCustomerDetails(userId));
	}
	@PutMapping("/update-password/{userId}")
	public ResponseEntity<?> updateCustomerPassword(@PathVariable Long userId,@RequestBody EditPasswordDTO editPasswordDTO){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(customerService.editCustomerPassword(userId, editPasswordDTO));
	}
	
	

}
