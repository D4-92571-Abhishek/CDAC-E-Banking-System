package com.bankify.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.bankify.dto.AdminDashboardDTO;
import com.bankify.repository.CustomerRepository;
import com.bankify.repository.TransactionRepository;
import com.bankify.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	private final CustomerRepository customerRepository;
	private final TransactionRepository transactionRepository;
	private final UserRepository userRepository;
	
	AdminDashboardDTO getAdminDashboardDetails() {
		
		AdminDashboardDTO adminDashboardDTO=new AdminDashboardDTO();
		
		adminDashboardDTO.setTotalCustomers(customerRepository.getAdminTotalCustomers());
		adminDashboardDTO.setTotalBankAssets(customerRepository.getAdminTotalBankAssets());
		LocalDateTime start = LocalDate.now()
                .withDayOfMonth(1)
                .atStartOfDay();

        LocalDateTime end = start.plusMonths(1);
        double monthlyCashFlow=transactionRepository.getAdminDashboardMonthlyCashFlow(start,end);
		adminDashboardDTO.setMonthlyCashFlow(monthlyCashFlow);
		
		adminDashboardDTO.setActiveBankManagers(userRepository.getAdminActiveManagers());
		
		
		//loan api to be added
		
		String performance = monthlyCashFlow > 100000 ? "Good" : "Average";
        
		adminDashboardDTO.setPerformance(performance);
        
		return adminDashboardDTO;
	
	}
	
	
	
}
