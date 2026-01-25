package com.bankify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.Customer;
import com.bankify.entities.LoanDetails;

public interface LoanDetailsRepository extends JpaRepository<LoanDetails, Long> {
	List<LoanDetails> findByCustomer(Customer customer);
}
