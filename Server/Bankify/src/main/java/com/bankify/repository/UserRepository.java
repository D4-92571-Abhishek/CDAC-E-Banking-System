package com.bankify.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bankify.dto.AdminManagerListDTO;
import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.PendingCustomerResponse;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	
	 Optional<User> findByEmail(String email);

	    List<User> findByRoleAndStatus(Role role, Status status);
	    
	    List<User> findByStatusAndRole(Status status, Role role);

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
	    
	    @Query("""
	    	    SELECT new com.bankify.dto.PendingCustomerResponse(
	    	        u.id,
	    	        u.name,
	    	        u.email,
	    	        u.contactNo,
	    	        u.customerVerified,
	    	        CASE
	    	            WHEN a IS NOT NULL AND a.addressVerified = true THEN true
	    	            ELSE false
	    	        END
	    	    )
	    	    FROM User u
	    	    LEFT JOIN Address a ON a.user = u
	    	    WHERE u.role = :role
	    	      AND u.status = :status
	    	""")
	    	List<PendingCustomerResponse> getPendingCustomers(
	    	        @Param("role") Role role,
	    	        @Param("status") Status status
	    	);


	    @Query("""
	    	    SELECT new com.bankify.dto.CustomerListResponseDTO(
	    	        u.id,
	    	        u.name,
	    	        u.email,
	    	        u.contactNo
	    	    )
	    	    FROM User u
	    	    WHERE u.status = :status
	    	      AND u.role = :role
	    	""")
	    	List<CustomerListResponseDTO> getActiveCustomers(
	    	        @Param("status") Status status,
	    	        @Param("role") Role role
	    	);


	    
}
