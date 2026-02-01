package com.bankify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.TransactionOTP;

public interface TransactionOTPRepository extends JpaRepository<TransactionOTP, Long> {

}
