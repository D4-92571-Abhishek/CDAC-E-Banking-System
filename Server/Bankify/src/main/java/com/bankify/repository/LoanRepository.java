package com.bankify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bankify.entities.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
	
	@Query("SELECT COUNT(l) FROM Loan l WHERE l.loanStatus = 'ACTIVE'")
    long getOutstandingLoans();
	
}
