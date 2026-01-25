package com.bankify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bankify.entities.Customer;
import com.bankify.entities.User;

import java.util.List;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	Optional<Customer> findByUser(Long userId);
	
	Optional<Customer> findByAccountNo(String accountNo);
	
    
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.user.status='ACTIVE'")
    long getAdminTotalCustomers();
    
    @Query("SELECT COALESCE(SUM(c.currentBalance), 0) FROM Customer c")
    double getAdminTotalBankAssets();


	Optional<Customer> findByUser(Long userId);

    
    
}
