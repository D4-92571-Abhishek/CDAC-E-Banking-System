package com.bankify.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.Customer;
import com.bankify.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByCustomerOrderByTransactionTimeDesc(Customer customer);
    
    Optional<Transaction> findTopByCustomerOrderByTransactionTimeDesc(Customer customer);

	Page<Transaction> findByCustomer(Customer c,Pageable page);
}

