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
import com.bankify.entities.Customer;
import com.bankify.entities.Gender;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;
import com.bankify.exception.DashboardDataNotAvailableException;
import com.bankify.exception.EntryAlreadyExistsException;
import com.bankify.exception.UserNotFoundException;
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
	
	private final CustomerRepository customerRepository;
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
		
		long totalCustomers=customerRepository.getAdminTotalCustomers();
		
		if(totalCustomers==0) {
			throw new DashboardDataNotAvailableException("No customers Data available");
		}
		
		adminCustomerInfoDTO.setTotalCustomers(totalCustomers);
		
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
		
		if(!userRepository.existsByEmail(manager.getEmail())){
			throw new EntryAlreadyExistsException("Mananger already exists with this Email");
		}
		
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
		
		if(list.isEmpty()) {
			throw new DashboardDataNotAvailableException("No Loans Data Avaialable");
		}

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
	public GeneralResponseDTO changeStatus(Long id,Status status) {

		int updatedStatus =userRepository.changeCustomerStatus(id,status);
		
		if(updatedStatus==0) {
			throw new UserNotFoundException("User Not found with Id : "+id);
		}
		
		return new GeneralResponseDTO("Success","Status updated successfully of ID : "+id);
	}

	@Override
	public void createAdminAndBankAssetsAccount() {

	    if (userRepository.existsByEmail("admin@bankify.com")) {
	        System.out.println("Admin already exists. Skipping...");
	        return;
	    }

	    User admin = new User();
	    admin.setName("admin");
	    admin.setContactNo("1234567890");
	    admin.setDob(LocalDate.parse("2000-01-01"));
	    admin.setRole(Role.ROLE_ADMIN);
	    admin.setCustomerVerified(true);
	    admin.setStatus(Status.ACTIVE);
	    admin.setEmail("admin@bankify.com");
	    admin.setPassword(passwordEncoder.encode("admin123"));

	    userRepository.save(admin);

	    if (userRepository.existsByEmail("bank@bankify.com")) {
	        System.out.println("Bank assets user already exists. Skipping...");
	        return;
	    }

	    User bankAssets = new User();
	    bankAssets.setName("bank");
	    bankAssets.setContactNo("0123456789");
	    bankAssets.setDob(LocalDate.parse("2000-01-01"));
	    bankAssets.setRole(Role.ROLE_ADMIN);
	    bankAssets.setCustomerVerified(true);
	    bankAssets.setStatus(Status.ACTIVE);
	    bankAssets.setEmail("bank@bankify.com");
	    bankAssets.setPassword(passwordEncoder.encode("bank123"));

	    userRepository.save(bankAssets);

	    if (customerRepository.existsByUser(bankAssets)) {
	        return;
	    }

	    Customer cust = new Customer();
	    cust.setAadharNo("************");
	    cust.setPanNo("**********");
	    cust.setAccountNo("1111111111");
	    cust.setCurrentBalance(5_000_000.00);
	    cust.setGender(Gender.MALE);
	    cust.setLoanTaken(false);
	    cust.setUser(bankAssets);

	    customerRepository.save(cust);
	}

		
	
	
}
