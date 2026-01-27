package com.bankify.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.bankify.dto.CustomerDashboardResponseDTO;
import com.bankify.dto.CustomerFundTransferRequestDTO;
import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.EditCustomerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.LoanDetailsResponseDTO;
import com.bankify.dto.LoanRequestDTO;
import com.bankify.entities.Transaction;

public interface CustomerService {
    GeneralResponseDTO signUp(CustomerSignupRequest request);
    
    List<CustomerListResponseDTO> getActiveCustomers();

	CustomerDashboardResponseDTO getCustomerDetailsById(Long userId);


	Page<Transaction> getCustomerTransactions(Long userId);

	GeneralResponseDTO transferFunds(Long userId,CustomerFundTransferRequestDTO fundDetails);

	Page<Transaction> getTransactionHistoryDebited(Long userId);

	Page<Transaction> getTransactionHistoryCredited(Long userId);

	GeneralResponseDTO requestForLoan(Long userId, LoanRequestDTO loanRequestDTO);

	List<LoanDetailsResponseDTO> getAllLoanDetails(Long userId);
	
	GeneralResponseDTO editCustomerDetails(Long userId,EditCustomerDetailsDTO editcustomerDetails);
	
	GeneralResponseDTO editCustomerPassword(Long userId, EditPasswordDTO editPasswordDTO);

	
	EditCustomerDetailsDTO getCustomerDetails(Long userId);
}

