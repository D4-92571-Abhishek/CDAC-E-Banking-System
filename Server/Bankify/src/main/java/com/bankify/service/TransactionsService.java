package com.bankify.service;

import java.util.List;

import com.bankify.dto.TransactionResponseDTO;

public interface TransactionsService {

    List<TransactionResponseDTO> getTransactionsByUserId(Long userId);

}
