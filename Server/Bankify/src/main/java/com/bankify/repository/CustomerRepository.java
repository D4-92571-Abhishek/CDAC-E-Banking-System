package com.bankify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bankify.entities.Customer;
import java.util.List;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	
	
	Optional<Customer> findByAccountNo(String accountNo);
	
    Optional<Customer> findByUser(Long user);
    
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.user.status='ACTIVE'")
    long getAdminTotalCustomers();

    
}
