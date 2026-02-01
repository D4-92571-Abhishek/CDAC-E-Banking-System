package com.bankify.repository;


 import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import com.bankify.dto.TransactionResponseDTO;
import com.bankify.entities.Customer;
import com.bankify.entities.Status;
import com.bankify.entities.Transaction;
import com.bankify.entities.TransactionStatus;
import com.bankify.entities.TransactionType;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByCustomerOrderByTransactionTimeDesc(Customer customer);
    
    Optional<Transaction> findTopByCustomerAndTransactionStatusOrderByTransactionTimeDesc(Customer customer,TransactionStatus status);
    
    
    @Query("""
    		SELECT SUM(t.amount)  FROM Transaction t 
    		WHERE t.customer.id = :cId AND t.transactionStatus = :trStatus
    		GROUP BY t.transactionType
    		HAVING t.transactionType=:trType
    		""")
    Double findAllAmountsByTransactionType (@Param("cId") Long cId,@Param("trType") TransactionType trType,TransactionStatus trStatus);

	Page<Transaction> findByCustomerOrderByTransactionTimeDesc(Customer c,Pageable page);
	
//	@Query("""
//			SELECT new com.bankify.dto.TransactionResponseDTO(
//			""")
//	Page<TransactionResponseDTO> findCustomerTransaction(Customer c, Pageable page);
	
    @Query("""
    		select coalesce(SUM(
    		
    			CASE
    				WHEN t.transactionType='CREDITED' then t.amount
    				WHEN t.transactionType='DEBITED' then -t.amount
    				ELSE 0
    			END
    		),0)
    		FROM Transaction t
    		WHERE t.transactionTime>=:startDate
    		AND t.transactionTime<:endDate
    		""")
    double getAdminDashboardMonthlyCashFlow(@Param("startDate") LocalDateTime startDate,@Param("endDate") LocalDateTime endDate);
    
    Page<Transaction> findByTransactionTypeAndCustomerOrderByTransactionTimeDesc(TransactionType transactionType,Customer customer,Pageable page);
    
    //Manager
    
    @Query("""
    	    SELECT new com.bankify.dto.TransactionResponseDTO(
    	        t.id,
    	        t.amount,
    	        t.transactionType,
    	        t.transactionStatus,
    	        t.transactionTime,
    	        t.transactionDescription
    	    )
    	    FROM Transaction t
    	    JOIN t.customer c
    	    JOIN c.user u
    	    WHERE u.id = :userId
    	      AND u.status = :status
    	    ORDER BY t.transactionTime DESC
    	""")
    	List<TransactionResponseDTO> findTransactionsByUserId(
    	        @Param("userId") Long userId,
    	        @Param("status") Status status
    	);


    
}


