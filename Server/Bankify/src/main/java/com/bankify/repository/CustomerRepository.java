package com.bankify.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bankify.dto.AdminCustomerListDTO;
import com.bankify.dto.LoanDetailsResponseDTO;
import com.bankify.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	Optional<Customer> findByAccountNo(String accountNo);
	
    
//     @Query("SELECT COUNT(c) FROM Customer c WHERE c.user.status='ACTIVE'")
//     long getAdminTotalCustomers();
    
//     @Query("SELECT COALESCE(SUM(c.currentBalance), 0) FROM Customer c")
//     double getAdminTotalBankAssets();
    
//     @Query("SELECT COALESCE(AVG(c.currentBalance), 0) FROM Customer c")
//     double getAdminAverageBalance();
    
//     @Query("""
//             SELECT new com.bankify.dto.AdminCustomerListDTO(
//     		    u.id,
//                 u.name,
//                 c.accountNo,
//                 c.currentBalance,
//                 u.status,
//                 u.creationDate,
//                 MAX(t.transactionTime)
//             )
//             FROM Customer c
//             JOIN c.user u
//             LEFT JOIN Transaction t ON t.customer = c
//             GROUP BY
//     		    u.id,
//                 u.name,
//                 c.accountNo,
//                 c.currentBalance,
//                 u.status,
//                 u.creationDate
//             ORDER BY u.creationDate DESC
//         """)
//         List<AdminCustomerListDTO> getAdminCustomerList();
    

	@Query("SELECT COUNT(c) FROM Customer c WHERE c.user.status='ACTIVE'")
	long getAdminTotalCustomers();

	@Query("SELECT COALESCE(SUM(c.currentBalance), 0) FROM Customer c")
	double getAdminTotalBankAssets();

	@Query("SELECT COALESCE(AVG(c.currentBalance), 0) FROM Customer c")
	double getAdminAverageBalance();

	@Query("""
			    SELECT new com.bankify.dto.AdminCustomerListDTO(
			  u.id,
			        u.name,
			        c.accountNo,
			        c.currentBalance,
			        u.status,
			        u.creationDate,
			        MAX(t.transactionTime)
			    )
			    FROM Customer c
			    JOIN c.user u
			    LEFT JOIN Transaction t ON t.customer = c
			    GROUP BY
			  u.id,
			        u.name,
			        c.accountNo,
			        c.currentBalance,
			        u.status,
			        u.creationDate
			    ORDER BY u.creationDate DESC
			""")
	List<AdminCustomerListDTO> getAdminCustomerList();

//    @Query("""
//    		SELECT new com.bankify.dto.LoanDetailsResponseDTO(l.loanType,l.interest,(ld.principle-(ld.paidMonths * ld.emi)),ld.emi,l.loanStatus)  FROM LoanDetails ld join ld.loan l WHERE ld.customer.id = :custId
//    		""")

	@Query("""
				SELECT new com.bankify.dto.LoanDetailsResponseDTO(
			    l.loanType,
			    l.interest,
			    (COALESCE(ld.principle, 0) - (COALESCE(ld.paidMonths, 0) * COALESCE(ld.emi, 0))),
			    (COALESCE(ld.emi,0)),
			    l.loanStatus
			)
			FROM LoanDetails ld
			JOIN ld.loan l
			WHERE ld.customer.id = :custId
								""")
	List<LoanDetailsResponseDTO> getLoanDetailsByCustomer(@Param("custId") Long custId);

	Optional<Customer> findByUser(Long userId);

	@Query("SELECT c FROM Customer c where c.user.id = :userId")
	Optional<Customer> findByUserId(@Param("userId") Long userId);

	Optional<Customer> findByUser_Id(Long userId);

}
