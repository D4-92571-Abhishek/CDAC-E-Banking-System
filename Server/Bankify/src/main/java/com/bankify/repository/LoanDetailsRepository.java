package com.bankify.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bankify.dto.ActiveLoanDetailsDTO;
import com.bankify.dto.AdminLoanListDTO;
import com.bankify.entities.Customer;
import com.bankify.entities.Loan;
import com.bankify.entities.LoanDetails;

public interface LoanDetailsRepository extends JpaRepository<LoanDetails, Long> {
	List<LoanDetails> findByCustomer(Customer customer);
	
	@Query("""
		    SELECT COALESCE(SUM(
		        d.emi *
		        (
		            CAST(
		                FUNCTION('TIMESTAMPDIFF', MONTH, d.startDate, d.endDate)
		                AS integer
		            )
		            - d.paidMonths
		        )
		    ), 0)
		    FROM LoanDetails d
		    JOIN d.loan l
		    WHERE l.loanStatus = 'ACTIVE'
		""")
		double getAdminOutstandingBalance();

	
	 @Query("""
		        SELECT COUNT(d)
		        FROM LoanDetails d
		        JOIN d.loan l
		        WHERE l.loanStatus = 'ACTIVE'
		          AND d.endDate < CURRENT_DATE
		    """)
		    long getAdminOverdueLoans();
	 
	 @Query("""
		        SELECT COALESCE(AVG(d.interest), 0)
		        FROM LoanDetails d
		        JOIN d.loan l
		    """)
		    double getAdminAverageInterestRate();
	 
	 		@Query("""
			 SELECT new com.bankify.dto.AdminLoanListDTO(
			     u.name,
			     l.loanType,
			     ld.principle,
			     (ld.principle - (ld.emi * ld.paidMonths)),
			     l.interest,
			     ld.emi,
			     (ld.emi * ld.paidMonths),
			     l.loanStatus
			 )
			 FROM Loan l
			 JOIN l.customer c
			 JOIN c.user u
			 JOIN LoanDetails ld ON ld.loan = l
			 """)
		    List<AdminLoanListDTO> getAdminLoanList();

	 		
	 		Optional<LoanDetails> findByLoan(Loan loan);
	 		
	 		
//	 		@Query("""
//	 				SELECT new com.bankify.dto.ActiveLoanDetailsDTO(
//	 				COALESCE(SUM(l.amount),0),
//	 				COALESCE(COUNT(l),0),
//	 				COALESCE(SUM(ld.emi),0)
//	 				) FROM LoanDetails ld join ld.loan l
//	 				WHERE ld.customer=:cust
//	 				AND l.status='ACTIVE'
//	 				""")
//
//	 		ActiveLoanDetailsDTO getActiveLoanDetails(@Param("cust") Customer customer);

	 
}
