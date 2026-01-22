package com.bankify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
