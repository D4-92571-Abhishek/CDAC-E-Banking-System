package com.bankify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bankify.entities.User;

@Repository
public interface DashboardRepository  extends JpaRepository<User, Long> {
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.status = com.bankify.entities.Status.ACTIVE")
	Long getTotalAccounts();

    @Query("""
        SELECT COUNT(t)
        FROM Transaction t
        WHERE DATE(t.transactionTime) = CURRENT_DATE
    """)
    Long getTodayTransactions();

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM Transaction t
        WHERE t.transactionType = 'CREDITED' 
    """)
    Double getTotalRevenue();
}


