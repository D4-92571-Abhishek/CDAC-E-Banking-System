package com.bankify.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	
	 Optional<User> findByEmail(String email);

	    List<User> findByRoleAndStatus(Role role, Status status);
	    
	    List<User> findByStatusAndRole(Status status, Role role);

	
}
