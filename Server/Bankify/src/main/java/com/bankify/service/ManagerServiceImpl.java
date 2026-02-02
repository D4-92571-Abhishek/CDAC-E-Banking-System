package com.bankify.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.DashboardStatsDTO;
import com.bankify.dto.EditManagerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.ManagerCreateCustomerDTO;
import com.bankify.dto.ManagerHeaderDTO;
import com.bankify.dto.PendingCustomerResponse;
import com.bankify.dto.PendingLoanCustomerDTO;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.entities.Address;
import com.bankify.entities.Customer;
import com.bankify.entities.Loan;
import com.bankify.entities.LoanDetails;
import com.bankify.entities.LoanStatus;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;
import com.bankify.repository.AddressRepository;
import com.bankify.repository.CustomerRepository;
import com.bankify.repository.LoanDetailsRepository;
import com.bankify.repository.LoanRepository;
import com.bankify.repository.ManagerDashboardRepository;
import com.bankify.repository.TransactionRepository;
import com.bankify.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ManagerServiceImpl implements ManagerService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final TransactionRepository transactionRepository;
	private final PasswordEncoder passwordEncoder;
    private final ManagerDashboardRepository dashboardRepository;
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;
    private final LoanRepository loanRepository;
    private final LoanDetailsRepository loanDetailsRepository;

    
    public static String generateAccountNumber() {
		Random random = new Random();
		StringBuilder sb = new StringBuilder();

		// Generate 10-digit account number
		for (int i = 0; i < 10; i++) {
			int digit = random.nextInt(10); // 0 to 9
			sb.append(digit);
		}

		return sb.toString();
	}



    @Override
    public List<PendingCustomerResponse> getPendingCustomers() {
        return userRepository.getPendingCustomers(
                Role.ROLE_CUSTOMER,
                Status.DEACTIVATED
        );
    }

    
    @Override
    public List<CustomerListResponseDTO> getActiveCustomers() {
        return userRepository.getActiveCustomers(
                Status.ACTIVE,
                Role.ROLE_CUSTOMER
        );
    }

    @Override
    public List<CustomerListResponseDTO> getBlockedCustomers() {
        return userRepository.getBlockedCustomers(
                Status.BLOCKED,
                Role.ROLE_CUSTOMER
        );
    }



    @Override
    public GeneralResponseDTO verifyCustomer(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setCustomerVerified(true);

        return new GeneralResponseDTO("Success", "Customer verified successfully");
    }

    @Override
    public GeneralResponseDTO verifyAddress(Long userId) {
        Address address = addressRepository.findByUserId(userId)
    
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setAddressVerified(true);

        return new GeneralResponseDTO("Success", "Address verified successfully");
    }

    @Override
    public GeneralResponseDTO approveCustomer(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isCustomerVerified())
            throw new RuntimeException("Customer not verified");

      
        Address address = addressRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Address not verified"));

        if (!address.isAddressVerified())
            throw new RuntimeException("Address not verified");

        user.setStatus(Status.ACTIVE);

        return new GeneralResponseDTO("Success", "Customer approved successfully");
    }

    @Override
    public GeneralResponseDTO rejectCustomer(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(Status.BLOCKED);

        return new GeneralResponseDTO("Success", "Customer rejected successfully");
    }
    
    @Override
    public GeneralResponseDTO unblockCustomer(Long userId) {

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Safety check
        if (user.getStatus() != Status.BLOCKED) {
            throw new IllegalStateException("Customer is not blocked");
        }

        // STEP 1: Move back to review state
        user.setStatus(Status.DEACTIVATED);

        user.setCustomerVerified(false);

        Address address = addressRepository.findByUserId(userId) // Use a custom method
            .orElseThrow(() -> new RuntimeException("Address not Found for User ID: " + userId));

        address.setAddressVerified(false);

        

        userRepository.save(user);
        addressRepository.save(address);
        
        return new GeneralResponseDTO("Success", "Customer Account is Unblocked");

    }
    
    
    @Override
    public GeneralResponseDTO approveLoan(Long loanId) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (loan.getLoanStatus() != LoanStatus.PENDING) {
            throw new RuntimeException("Loan already processed");
        }

        // 1️ Fetch existing LoanDetails (already created at request time)
        LoanDetails details = loanDetailsRepository.findByLoan(loan)
                .orElseThrow(() -> new RuntimeException("LoanDetails not found"));

        // 2️ Approval date
        LocalDate startDate = LocalDate.now();

        // 3️ Derive tenure from EMI & principal
        double totalMonths = loan.getLoanTenure()*12;

        if (totalMonths <= 0) {
            throw new RuntimeException("Invalid tenure calculation");
        }

        LocalDate endDate = startDate.plusMonths((long)totalMonths);

        // 4️ Update LoanDetails (this is where dates live)
        details.setStartDate(startDate);
        details.setEndDate(endDate);
        loanDetailsRepository.save(details);

        // 5️ Update Loan status ONLY
        loan.setLoanStatus(LoanStatus.ACTIVE);
        loanRepository.save(loan);
        loan.getCustomer().setLoanTaken(true);
        return new GeneralResponseDTO(
            "SUCCESS",
            "Loan approved successfully"
        );
    }


    @Override
    @Transactional
    public GeneralResponseDTO rejectLoan(Long loanId) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (loan.getLoanStatus() != LoanStatus.PENDING) {
            throw new RuntimeException("Loan already processed");
        }

        loan.setLoanStatus(LoanStatus.REJECTED);
        loanRepository.save(loan);

        return new GeneralResponseDTO(
            "SUCCESS",
            "Loan rejected successfully"
        );
    }
    
    
    @Override
    public List<PendingLoanCustomerDTO> getAllPendingLoans() {
        return loanRepository.findAllPendingLoans();
    }

    
    @Override
    public GeneralResponseDTO editManagerDetails(Long userId, EditManagerDetailsDTO dto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(dto.getName());
        user.setContactNo(dto.getContactNo());

        return new GeneralResponseDTO("Success", "Manager details updated");
    }
    
    
   

    @Override
    public GeneralResponseDTO editManagerPassword(Long userId, EditPasswordDTO dto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        return new GeneralResponseDTO("Success", "Password updated successfully");
    }


    @Override
    public ManagerHeaderDTO getManagerDetails(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ManagerHeaderDTO(
        		user.getId(),
                user.getName(),
                user.getEmail(),
                user.getContactNo(),
                user.getRole().name()
        );
    }

    @Override
    
    public List<TransactionResponseDTO> getTransactionsByUserId(Long userId) {
        return transactionRepository
                .findTransactionsByUserId(userId, Status.ACTIVE);
    }

   /* @Override
    public ManagerHeaderDTO getLoggedInManagerProfile(String email) {

        User manager = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Manager not found"));

        return new ManagerHeaderDTO(
            manager.getId(),
            manager.getName(),
            manager.getEmail(),
            manager.getContactNo(),
            manager.getRole().name()
        );
    } */
    
    
    @Override
    public DashboardStatsDTO getDashboardStats() {
        return new DashboardStatsDTO(
            dashboardRepository.getTotalAccounts(),
            dashboardRepository.getTodayTransactions(),
            dashboardRepository.getTotalRevenue()
        );
        		}


    @Override
    public User createCustomerAsManager(ManagerCreateCustomerDTO dto) {

    	 User user = modelMapper.map(dto, User.class);

    	    user.setName(dto.getFirstName() + " " + dto.getLastName());
    	    user.setDob(dto.getDateOfBirth());
    	    user.setPassword(passwordEncoder.encode(dto.getPassword()));
    	    user.setStatus(Status.ACTIVE);
    	    user.setRole(Role.ROLE_CUSTOMER);
    	    user.setCustomerVerified(true);


    	    Customer customer = modelMapper.map(dto, Customer.class);
    	    customer.setLoanTaken(false);
    	    customer.setUser(user);
    	    customer.setAccountNo(generateAccountNumber());

    	    Address address = modelMapper.map(dto, Address.class);
    	    address.setAddressVerified(true);
    	    address.setUser(user);

    	    userRepository.save(user);
    	    customerRepository.save(customer);
    	    addressRepository.save(address);

    	    return user;
    }
}

