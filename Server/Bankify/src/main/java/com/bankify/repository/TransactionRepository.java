package com.bankify.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.Customer;
import com.bankify.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByCustIdOrderByTransactionTimeDesc(Customer customer);
}

