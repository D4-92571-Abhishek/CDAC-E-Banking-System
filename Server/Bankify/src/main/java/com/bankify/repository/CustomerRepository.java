package com.bankify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bankify.dto.AdminCustomerListDTO;
import com.bankify.entities.Customer;
import java.util.List;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	Optional<Customer> findByUser(Long userId);
	
	Optional<Customer> findByAccountNo(String accountNo);
	
    
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.user.status='ACTIVE'")
    long getAdminTotalCustomers();
    
    @Query("SELECT COALESCE(SUM(c.currentBalance), 0) FROM Customer c")
    double getAdminTotalBankAssets();
    
    @Query("SELECT COALESCE(AVG(c.currentBalance), 0) FROM Customer c")
    double getAdminAverageBalance();
    
    @Query("""
            SELECT new com.bankify.dto.AdminCustomerListDTO(
                u.name,
                c.accountNo,
                c.currentBalance,
                u.status,
                u.creationDate,
                MAX(t.transactionTime)
            )
            FROM Customer c
            JOIN c.user u
            LEFT JOIN Transaction t ON t.customer = c
            GROUP BY
                u.name,
                c.accountNo,
                c.currentBalance,
                u.status,
                u.creationDate
            ORDER BY u.creationDate DESC
        """)
        List<AdminCustomerListDTO> getAdminCustomerList();
    
}
