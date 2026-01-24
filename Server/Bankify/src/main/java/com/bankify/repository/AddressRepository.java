package com.bankify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.Address;
import com.bankify.entities.User;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByUser(User user);
    Optional<Address> findByUser_Id(Long userId);
}
