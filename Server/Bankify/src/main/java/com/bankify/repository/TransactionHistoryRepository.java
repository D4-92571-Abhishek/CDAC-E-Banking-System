package com.bankify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.TransactionHistory;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {

}
