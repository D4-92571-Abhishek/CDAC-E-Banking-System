package com.bankify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bankify.entities.Loan;
import com.bankify.entities.Customer;


public interface LoanRepository extends JpaRepository<Loan, Long> {
	
	@Query("SELECT COUNT(l) FROM Loan l WHERE l.loanStatus = 'ACTIVE'")
    long getOutstandingLoans();
	
	List<Loan> findByCustomer(Customer customer);
}
