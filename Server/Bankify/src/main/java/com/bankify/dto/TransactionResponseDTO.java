package com.bankify.dto;

import java.time.LocalDateTime;

import com.bankify.entities.TransactionStatus;
import com.bankify.entities.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class TransactionResponseDTO {

    private Long id;           
    private double amount;
    private TransactionType transactionType;
    private TransactionStatus transactionStatus;
    private LocalDateTime transactionTime;
    private String transactionDescription;
}
