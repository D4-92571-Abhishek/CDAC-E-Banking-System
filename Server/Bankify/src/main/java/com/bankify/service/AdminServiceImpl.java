package com.bankify.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bankify.dto.AdminCreateManagerDTO;
import com.bankify.dto.AdminCustomerInfoDTO;
import com.bankify.dto.AdminCustomerListDTO;
import com.bankify.dto.AdminDashboardDTO;
import com.bankify.dto.AdminLoanInfoDTO;
import com.bankify.dto.AdminLoanListDTO;
import com.bankify.dto.AdminManagerListDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;
import com.bankify.repository.CustomerRepository;
import com.bankify.repository.LoanDetailsRepository;
import com.bankify.repository.LoanRepository;
import com.bankify.repository.TransactionRepository;
import com.bankify.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	final CustomerRepository customerRepository;
	private final TransactionRepository transactionRepository;
	private final UserRepository userRepository;
	private final LoanRepository loanRepository;
	private final LoanDetailsRepository loanDetailsRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public AdminDashboardDTO getAdminDashboardDetails() {
		
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
		
		
		adminDashboardDTO.setOutstandingLoans(loanRepository.getOutstandingLoans());
		
		String performance = monthlyCashFlow > 100000 ? "Good" : "Average";
        
		adminDashboardDTO.setPerformance(performance);
        
		return adminDashboardDTO;
	
	}

	@Override
	public AdminCustomerInfoDTO getAdminCustomerInfo() {
		
		AdminCustomerInfoDTO adminCustomerInfoDTO=new AdminCustomerInfoDTO();
		
		adminCustomerInfoDTO.setTotalCustomers(customerRepository.getAdminTotalCustomers());
		
		adminCustomerInfoDTO.setTotalBalance(customerRepository.getAdminTotalBankAssets());
		
		adminCustomerInfoDTO.setAverageBalance(customerRepository.getAdminAverageBalance());
		
		return adminCustomerInfoDTO;
	}

	@Override
	public List<AdminCustomerListDTO> getAdminCustomerList() {
		
		return customerRepository.getAdminCustomerList();
		
	}

	@Override
	public long getAdminActiveManagers() {
		
		return userRepository.getAdminActiveManagers();
	}

	@Override
	public List<AdminManagerListDTO> getAdminManagerList() {
		
		
		return userRepository.getAdminManagersList();
	
	}

	@Override
	public GeneralResponseDTO addManager(AdminCreateManagerDTO manager) {

		User user=modelMapper.map(manager,User.class);
		
		user.setRole(Role.ROLE_MANAGER);
		user.setStatus(Status.ACTIVE);
		user.setContactNo(manager.getContactNo());
		user.setPassword(passwordEncoder.encode("manager"));
		user.setCustomerVerified(true);
		
		userRepository.save(user);
		
		return new GeneralResponseDTO("Success","Manager created with ID : "+user.getId());
	}

	@Override
	public AdminLoanInfoDTO getAdminLoanInfo() {
		
		AdminLoanInfoDTO adminLoanInfoDTO=new AdminLoanInfoDTO();
		
		adminLoanInfoDTO.setTotalLoanAccounts(loanRepository.getOutstandingLoans());
		
		adminLoanInfoDTO.setOutstandingBalance(loanDetailsRepository.getAdminOutstandingBalance());
		
		adminLoanInfoDTO.setOverdueLoanAccounts(loanDetailsRepository.getAdminOverdueLoans());
		
		adminLoanInfoDTO.setAverageInterest(loanDetailsRepository.getAdminAverageInterestRate());
			
		return adminLoanInfoDTO;
	}

	@Override
	public List<AdminLoanListDTO> getAdminLoanList() {

		List<AdminLoanListDTO> list = loanDetailsRepository.getAdminLoanList();

	    list.forEach(dto -> {
	        // nextDue = today + 1 month (or your logic)
	        dto.setNextDue(LocalDate.now().plusMonths(1));
	    });

	    return list;
	
	}

	@Override
	public GeneralResponseDTO addAdmin(AdminCreateManagerDTO admin) {
		
		User user=modelMapper.map(admin,User.class);
		
		user.setRole(Role.ROLE_ADMIN);
		user.setStatus(Status.ACTIVE);
		user.setPassword(passwordEncoder.encode("admin123"));
		user.setCustomerVerified(true);
		
		userRepository.save(user);
		
		return new GeneralResponseDTO("Success","Admin created with ID : "+user.getId());
		
	}

	@Override
	public GeneralResponseDTO deactivateManager(Long employeeId) {

		userRepository.deactivateManager(employeeId);
		
		return null;
	
	}

	@Override
	public GeneralResponseDTO deactivateCustomer(Long id) {

		userRepository.deactivateCustomer(id);
		
		return null;
	}
		
	
	
}
