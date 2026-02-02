package com.bankify.service;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;

import com.bankify.dto.ActiveLoanDetailsDTO;
import com.bankify.dto.AddAmountObjectDTO;
import com.bankify.dto.CustomerAccountDetailsDTO;
import com.bankify.dto.CustomerDashboardResponseDTO;
import com.bankify.dto.CustomerFundTransferRequestDTO;
import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.DisplayCustomerDetailsDTO;
import com.bankify.dto.EditCustomerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.GetCustomerAccountDetailsDTO;
import com.bankify.dto.LoanDetailsResponseDTO;
import com.bankify.dto.LoanRequestDTO;
import com.bankify.dto.OtpResponseDTO;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.dto.ValidateCustomerTransferOtpDTO;
import com.bankify.entities.Address;
import com.bankify.entities.Customer;
import com.bankify.entities.Transaction;
import com.bankify.entities.User;

public interface CustomerService {
    GeneralResponseDTO signUp(CustomerSignupRequest request);
    
    GeneralResponseDTO signUp(User user,Customer customer,Address address);
    
    List<CustomerListResponseDTO> getActiveCustomers();

	CustomerDashboardResponseDTO getCustomerDetailsById(Long userId);
	


	Page<TransactionResponseDTO> getCustomerTransactions(Long userId);
	
	
	OtpResponseDTO sendOtp(Long userId, CustomerFundTransferRequestDTO fundDetails);

	GeneralResponseDTO transferFunds(Long userId,ValidateCustomerTransferOtpDTO fundDetails);

	List<TransactionResponseDTO> getTransactionHistoryDebited(Long userId);

	Page<Transaction> getTransactionHistoryCredited(Long userId);

	GeneralResponseDTO requestForLoan(Long userId, LoanRequestDTO loanRequestDTO);

	List<LoanDetailsResponseDTO> getAllLoanDetails(Long userId);
	
	GeneralResponseDTO editCustomerDetails(Long userId,EditCustomerDetailsDTO editcustomerDetails);
	
	GeneralResponseDTO editCustomerPassword(Long userId, EditPasswordDTO editPasswordDTO);

	GetCustomerAccountDetailsDTO getCustomerAccountDetails(Long userId);
	
	DisplayCustomerDetailsDTO getCustomerDetails(Long userId);

    CustomerAccountDetailsDTO getAccountNo(Long userId);
    
    GeneralResponseDTO payLoanEMI(Long userId,Long loanId);
//    
//    ActiveLoanDetailsDTO getActiveLoanDetails(Long userId);

	GeneralResponseDTO addFundsToAccount(Long userId, AddAmountObjectDTO addAmount);
}

