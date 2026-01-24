package com.bankify.repository;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bankify.entities.Customer;
import com.bankify.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByCustomerOrderByTransactionTimeDesc(Customer customer);
    
    Optional<Transaction> findTopByCustomerOrderByTransactionTimeDesc(Customer customer);

	Page<Transaction> findByCustomer(Customer c,Pageable page);
	
    @Query("""
    		select coalesce(SUM(
    		
    			CASE
    				WHEN t.transactionType='CREDITED' then t.amount
    				WHEN t.transactionType='DEBITED' then -t.amount
    				ELSE 0
    			END
    		),0)
    		FROM Transaction t
    		WHERE t.transactionTime>=: startDate
    		AND t.transactionTime<: endDate
    		""")
    double getAdminDashboardMonthlyCashFlow(@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
    
}

