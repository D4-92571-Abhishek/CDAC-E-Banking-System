package com.bankify.service;

import java.util.List;

import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.TransactionResponseDTO;

public interface TransactionService {

    List<TransactionResponseDTO> getTransactionsByUserId(Long userId);

//	List<CustomerListResponseDTO> getActiveCustomers();

}
