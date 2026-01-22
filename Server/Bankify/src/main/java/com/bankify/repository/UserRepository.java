package com.bankify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
