package com.bankify.service;

import java.util.List;

import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.DashboardStatsDTO;
import com.bankify.dto.EditManagerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.ManagerCreateCustomerDTO;
import com.bankify.dto.ManagerHeaderDTO;
import com.bankify.dto.PendingCustomerResponse;
import com.bankify.dto.PendingLoanCustomerDTO;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.entities.User;

public interface ManagerService {

	//Need to use Paging in first 3 APIs
	
    List<PendingCustomerResponse> getPendingCustomers();
    
	List<CustomerListResponseDTO> getActiveCustomers();
	
	List<CustomerListResponseDTO> getBlockedCustomers();

    List<TransactionResponseDTO> getTransactionsByUserId(Long userId);

 //   ManagerHeaderDTO getLoggedInManagerProfile(String email);
    
    DashboardStatsDTO getDashboardStats();



    GeneralResponseDTO verifyCustomer(Long userId);

    GeneralResponseDTO verifyAddress(Long userId);

    GeneralResponseDTO approveCustomer(Long userId);

    GeneralResponseDTO rejectCustomer(Long userId);
    
    GeneralResponseDTO unblockCustomer(Long userId);
    
    GeneralResponseDTO approveLoan(Long loanId);
    
    GeneralResponseDTO rejectLoan(Long loanId);
    
    List<PendingLoanCustomerDTO> getAllPendingLoans();

    User createCustomerAsManager(ManagerCreateCustomerDTO dto);
    
    GeneralResponseDTO editManagerDetails(Long userId, EditManagerDetailsDTO dto);

    GeneralResponseDTO editManagerPassword(Long userId, EditPasswordDTO dto);

    ManagerHeaderDTO getManagerDetails(Long userId);
}
