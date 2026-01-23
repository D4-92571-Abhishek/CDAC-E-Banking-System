package com.bankify.dto;

import java.time.LocalDateTime;

import com.bankify.entities.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TransactionResponseDTO {

    private Long transactionId;           
    private double amount;
    private TransactionType transactionType;
    private LocalDateTime transactionTime;
    private String transactionDescription;
}
