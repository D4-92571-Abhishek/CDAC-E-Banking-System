package com.bankify.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.entities.Customer;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;
import com.bankify.repository.TransactionRepository;
import com.bankify.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionsServiceImpl implements TransactionsService  {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;


    public List<CustomerListResponseDTO> getActiveCustomers() {

        return userRepository
                .findByStatusAndRole(Status.ACTIVE, Role.ROLE_CUSTOMER)
                .stream()
                .map(user -> new CustomerListResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getContactNo()
                ))
                .collect(Collectors.toList());
    }
    
    public List<TransactionResponseDTO> getTransactionsByUserId(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (user.getStatus() != Status.ACTIVE) {
            throw new RuntimeException("Customer is not ACTIVE");
        }

        Customer customer = user.getCustomer();
        return transactionRepository
                .findByCustomerOrderByTransactionTimeDesc(customer)
                .stream()
                .map(tx -> new TransactionResponseDTO(
                        tx.getId(),                      
                        tx.getAmount(),
                        tx.getTransactionType(),
                        tx.getTransactionTime(),
                        tx.getTransactionDescription()
                ))
                .collect(Collectors.toList());

    }
}

