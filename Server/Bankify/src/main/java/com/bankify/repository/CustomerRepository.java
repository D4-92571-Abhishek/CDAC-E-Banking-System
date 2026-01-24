package com.bankify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bankify.entities.Customer;
import java.util.List;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
	

	Optional<Customer> findByUser(Long user);
	
	
	Optional<Customer> findByAccountNo(String accountNo);
	

}
