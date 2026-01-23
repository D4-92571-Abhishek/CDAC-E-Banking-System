package com.bankify.services;

import java.util.List;

import com.bankify.dto.TransactionResponseDTO;

public interface TransactionService {

    List<TransactionResponseDTO> getTransactionsByUserId(Long userId);

}
