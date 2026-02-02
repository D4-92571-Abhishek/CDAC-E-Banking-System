package com.bankify.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.AddAmountObjectDTO;
import com.bankify.dto.CustomerFundTransferRequestDTO;
import com.bankify.dto.LoanRequestDTO;
import com.bankify.dto.ValidateCustomerTransferOtpDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.EditCustomerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.service.CustomerService;

import io.micrometer.core.ipc.http.HttpSender.Response;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/bankify/customers")
@RequiredArgsConstructor
//@CrossOrigin
public class CustomersController {

	private final CustomerService customerService;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody CustomerSignupRequest request) {
		System.out.println(request);
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
		System.out.println("Hello from cust");
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
	
	@PostMapping("/transfer/send-otp/{userId}")
	public ResponseEntity<?> transferFunds(@PathVariable Long userId,@RequestBody CustomerFundTransferRequestDTO fundDetails){
		return ResponseEntity.ok(customerService.sendOtp(userId, fundDetails));
	}
	@PostMapping("/transfer/validate-otp/{userId}")
	public ResponseEntity<?> transferFunds(@PathVariable Long userId,@RequestBody ValidateCustomerTransferOtpDTO fundDetails){
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
		System.out.println(loanRequestDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.requestForLoan(userId,loanRequestDTO));
	}
	
	@GetMapping("/loan/all-loans/{userId}")
	public ResponseEntity<?> getAllLoanDetails (@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getAllLoanDetails(userId));
	}
	
	@PutMapping("/edit-customer/{userId}")
	public ResponseEntity<?> editCustomerDetails(@PathVariable Long userId,@RequestBody EditCustomerDetailsDTO editcustomerDetails){
		System.out.println(editcustomerDetails);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(customerService.editCustomerDetails(userId, editcustomerDetails));
	}
	@GetMapping("/get-customer/{userId}")
	public ResponseEntity<?> getCustomerDetails(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getCustomerDetails(userId));
	}
	@PutMapping("/update-password/{userId}")
	public ResponseEntity<?> updateCustomerPassword(@PathVariable Long userId,@RequestBody EditPasswordDTO editPasswordDTO){
		System.out.println(editPasswordDTO);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(customerService.editCustomerPassword(userId, editPasswordDTO));
	}
	
	@GetMapping("/get-transaction-details/{userId}")
	public ResponseEntity<?> getTransactionDetails(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getCustomerAccountDetails(userId));
	}
	
	@GetMapping("/get-account-nos/{userId}")
	public ResponseEntity<?> getCustomerAccountNo(@PathVariable Long userId){
		return ResponseEntity.ok(customerService.getAccountNo(userId));
	}
	
	@GetMapping("/loan/pay-loan-amount/{userId}/{loanId}")
	public ResponseEntity<?> payLoanAmount(@PathVariable Long userId,@PathVariable Long loanId){
		return ResponseEntity.ok(customerService.payLoanEMI(userId, loanId));
	}
	
//	@GetMapping("/loan/get-loan-details/{userId}")
//	
//	public ResponseEntity<?> getCurrentLoanDetails(@PathVariable Long userId){
//		return ResponseEntity.ok(customerService.getActiveLoanDetails(userId));
//	}
	
	@PostMapping("/add-funds/{userId}")
	public ResponseEntity<?> addFundsToyourAccount(@PathVariable Long userId,@RequestBody AddAmountObjectDTO addAmount){
		return ResponseEntity.ok(customerService.addFundsToAccount(userId,addAmount));
	}
	

}
