package com.bankify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.Transaction;
import com.bankify.entities.TransactionHistory;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {
	Optional<TransactionHistory> findByTransaction(Transaction transaction);
}
