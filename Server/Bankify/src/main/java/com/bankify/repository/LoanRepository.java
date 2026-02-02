package com.bankify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bankify.dto.PendingLoanCustomerDTO;
import com.bankify.entities.Customer;
import com.bankify.entities.Loan;


public interface LoanRepository extends JpaRepository<Loan, Long> {
	
	@Query("SELECT COUNT(l) FROM Loan l WHERE l.loanStatus = 'ACTIVE'")
    long getOutstandingLoans();
	
	List<Loan> findByCustomer(Customer customer);
	
	
	@Query("""
		    SELECT new com.bankify.dto.PendingLoanCustomerDTO(
		        l.id,
		        u.name,
		        l.loanType,
		        l.amount,
		        l.interest,
		        l.loanStatus
		    )
		    FROM Loan l
		    JOIN l.customer c
		    JOIN c.user u
		    WHERE l.loanStatus = 'PENDING'
		""")
		List<PendingLoanCustomerDTO> findAllPendingLoans();

	
}
