package com.bankify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
	
    Optional<Address> findByUserId(Long userId);
    Optional<Address> findByUser_Id(Long userId);

}

