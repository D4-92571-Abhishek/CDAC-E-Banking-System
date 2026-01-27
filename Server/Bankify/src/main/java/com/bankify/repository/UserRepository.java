package com.bankify.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bankify.dto.AdminManagerListDTO;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	
	 Optional<User> findByEmail(String email);

	    List<User> findByRoleAndStatus(Role role, Status status);
	    
	    List<User> findByStatusAndRole(Status status, Role role);

	    @Query("SELECT COUNT(u) FROM User u WHERE u.role='ROLE_MANAGER' AND u.status='ACTIVE'")
	    long getAdminActiveManagers();

	    @Query("""
	            SELECT new com.bankify.dto.AdminManagerListDTO(
	                u.name,
	                u.id,
	                u.creationDate
	            )
	            FROM User u
	            WHERE u.role = 'ROLE_MANAGER' AND u.status='ACTIVE'
	            ORDER BY u.creationDate DESC
	        """)
	        List<AdminManagerListDTO> getAdminManagersList();

	    @Modifying
	    @Query("""
	    		Update User u
	    		SET u.status='DEACTIVATED'
	    		WHERE u.id=:employeeId
	    		""")
		int deactivateManager(@Param("employeeId") Long employeeId);

	    @Modifying
	    @Query("""
	    		Update User u
	    		SET u.status='DEACTIVATED'
	    		WHERE u.id=:id
	    		""")
		int deactivateCustomer(@Param("id") Long id);
	    
}
