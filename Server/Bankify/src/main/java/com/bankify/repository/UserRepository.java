package com.bankify.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bankify.dto.AdminManagerListDTO;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	
	 Optional<User> findByEmail(String email);

	    List<User> findByRoleAndStatus(Role role, Status status);
	    
	    List<User> findByStatusAndRole(Status status, Role role);


		boolean existsByEmail(String email);

		boolean existsByContactNo(String contactNo);


	    @Query("SELECT COUNT(u) FROM User u WHERE u.role='ROLE_MANAGER'")
	    long getAdminActiveManagers();

	    @Query("""
	            SELECT new com.bankify.dto.AdminManagerListDTO(
	                u.name,
	                u.id,
	                u.creationDate
	            )
	            FROM User u
	            WHERE u.role = 'ROLE_MANAGER'
	            ORDER BY u.creationDate DESC
	        """)
	        List<AdminManagerListDTO> getAdminManagersList();
	    
}
