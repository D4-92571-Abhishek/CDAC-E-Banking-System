package com.bankify.service;

import java.util.List;

import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.EditManagerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.ManagerCreateCustomerDTO;
import com.bankify.dto.PendingCustomerResponse;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.entities.User;

public interface ManagerService {

	//Need to use Paging in first 3 APIs
	
    List<PendingCustomerResponse> getPendingCustomers();
    
	List<CustomerListResponseDTO> getActiveCustomers();

    List<TransactionResponseDTO> getTransactionsByUserId(Long userId);


    GeneralResponseDTO verifyCustomer(Long userId);

    GeneralResponseDTO verifyAddress(Long userId);

    GeneralResponseDTO approveCustomer(Long userId);

    GeneralResponseDTO rejectCustomer(Long userId);

    User createCustomerAsManager(ManagerCreateCustomerDTO dto);
    
    GeneralResponseDTO editManagerDetails(Long userId, EditManagerDetailsDTO dto);

    GeneralResponseDTO editManagerPassword(Long userId, EditPasswordDTO dto);

    EditManagerDetailsDTO getManagerDetails(Long userId);
}
