package com.bankify.service;

import java.time.LocalDateTime;

import com.bankify.custom_exceptions.*;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bankify.dto.CustomerDashboardResponseDTO;
import com.bankify.dto.CustomerFundTransferRequestDTO;
import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.EditCustomerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.LoanDetailsResponseDTO;
import com.bankify.dto.LoanRequestDTO;
import com.bankify.entities.Address;
import com.bankify.entities.Customer;
import com.bankify.entities.Loan;
import com.bankify.entities.LoanStatus;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.Transaction;
import com.bankify.entities.TransactionType;
import com.bankify.entities.User;
import com.bankify.repository.AddressRepository;
import com.bankify.repository.CustomerRepository;
import com.bankify.repository.LoanRepository;
import com.bankify.repository.TransactionRepository;
import com.bankify.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerServiceImpl implements CustomerService {


	private final CustomerRepository customerRepository;
	private final TransactionRepository transactionRepository;
	private final UserRepository userRepository;
	private final AddressRepository addressRepository;
	private final LoanRepository loanRepository;
	private final ModelMapper modelMapper;


	@Override
	public GeneralResponseDTO signUp(CustomerSignupRequest req) {

		User user = modelMapper.map(req, User.class);
		user.setRole(Role.ROLE_CUSTOMER);
		user.setStatus(Status.ACTIVE);
		System.out.println(user);
		Customer cust = modelMapper.map(req, Customer.class);
		cust.setUser(user);

		System.out.println(cust);

		Address custAddress = modelMapper.map(req, Address.class);
		custAddress.setUser(user);
		System.out.println(custAddress);
		userRepository.save(user);
		customerRepository.save(cust);
		addressRepository.save(custAddress);
		
		if(user.getId() == 0) throw new RuntimeException();
		
		return new GeneralResponseDTO("Success","Customer Account Created Successfully");
	}
	
	 public List<CustomerListResponseDTO> getActiveCustomers() {

	        return userRepository
	                .findByStatusAndRole(Status.ACTIVE, Role.ROLE_CUSTOMER)
	                .stream()
	                .map(user -> new CustomerListResponseDTO(
	                        user.getId(),
	                        user.getName(),
	                        user.getEmail(),
	                        user.getContactNo()
	                ))
	                .collect(Collectors.toList());
	    }

	@Override
	public CustomerDashboardResponseDTO getCustomerDetailsById(Long userId) {

		User u = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("User not found with id: " + userId));
		
		Customer c = customerRepository.findByUserId(userId).orElseThrow(()->new CustomerNotFoundException("Customer not found with id: "+ userId));
		
		Transaction t = transactionRepository.findTopByCustomerOrderByTransactionTimeDesc(c).orElseThrow(()->new NoTransactionsException("No transactions found for this customer"));
		CustomerDashboardResponseDTO res = modelMapper.map(c, CustomerDashboardResponseDTO.class);
		res.setRecentTransactionAmount(t.getAmount());
		res.setName(u.getName());
		
		return res;
	}

	@Override
	public  Page<Transaction> getCustomerTransactions(Long userId) {
		Customer c = customerRepository.findByUserId(userId).orElseThrow(()-> new CustomerNotFoundException("Customer not found with id: "+userId));
		Pageable page = PageRequest.of(0,10);
		Page<Transaction> transactionPage = transactionRepository.findByCustomer(c,page);
		return transactionPage;
	}
	public  Page<Transaction> getCustomerTransactions(Long userId,TransactionType transactionType) {
		Customer c = customerRepository.findByUserId(userId).orElseThrow(()-> new RuntimeException());
		Pageable page = PageRequest.of(0,10);
		Page<Transaction> transactionPage = transactionRepository.findByTransactionTypeAndCustomer(transactionType, c, page);
		return transactionPage;
	}

	@Override
	public GeneralResponseDTO transferFunds(Long userId,CustomerFundTransferRequestDTO fundDetails) {
		
		Customer sender = customerRepository.findByUserId(userId).orElseThrow(()->new CustomerNotFoundException("Sender not found with id: "+userId));
		Customer reciever = customerRepository.findByAccountNo(fundDetails.getDestinationAccountNo()).orElseThrow(()->new CustomerNotFoundException("Receiver not found with id: "+userId));
		if(sender.getCurrentBalance()<fundDetails.getAmount()) {
			throw new InsufficientBalanceException("Insufficient Balance");
		}
		
		sender.setCurrentBalance(sender.getCurrentBalance()-fundDetails.getAmount());
		reciever.setCurrentBalance(reciever.getCurrentBalance()+fundDetails.getAmount());
		
		Transaction t= new Transaction();
		t.setAmount(fundDetails.getAmount());
		t.setTransactionDescription("Funds is sending to Name : "+reciever.getUser().getName()+ " to Account No : "+reciever.getAccountNo());
		t.setTransactionTime(LocalDateTime.now());
		t.setCustomer(sender);
		t.setTransactionType(TransactionType.DEBITED);
		
		
		Transaction r = new Transaction();
		r.setAmount(fundDetails.getAmount());
		r.setTransactionDescription("funds Creadited by : "+sender.getUser().getName()+" from Account No : "+sender.getAccountNo());
		r.setTransactionTime(LocalDateTime.now());
		r.setCustomer(reciever);
		r.setTransactionType(TransactionType.CREDITED);
		
		
		transactionRepository.save(t);
		transactionRepository.save(r);
		return new GeneralResponseDTO("Success","Funds Transfer Successfully");
	}

	@Override
	public Page<Transaction> getTransactionHistoryDebited(Long userId) {
		Pageable page = PageRequest.of(0, 10);
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(()->new CustomerNotFoundException("Customer not found with id: "+userId));
		Page<Transaction> transactionList = transactionRepository.findByTransactionTypeAndCustomer(TransactionType.DEBITED, cust, page);
		
		if(transactionList.isEmpty())throw new NoTransactionsException("No Transactions for this Customer");
		 
		return transactionList;
	}
	public Page<Transaction> getTransactionHistoryCredited(Long userId) {
		Pageable page = PageRequest.of(0, 10);
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(()->new CustomerNotFoundException("Customer not found with id: "+ userId));
		Page<Transaction> transactionList = transactionRepository.findByTransactionTypeAndCustomer(TransactionType.CREDITED, cust, page);
		
		if(transactionList.isEmpty())throw new NoTransactionsException("No Transactions this Customer");
		 
		return transactionList;
	}

	@Override
	public GeneralResponseDTO requestForLoan(Long userId, LoanRequestDTO loanRequestDTO) {
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(()->new CustomerNotFoundException("Customer not found with id: "+ userId));
		Loan newLoanRequest = modelMapper.map(loanRequestDTO, Loan.class);
		newLoanRequest.setLoanStatus(LoanStatus.PENDING);
		newLoanRequest.setCustomer(cust);
		loanRepository.save(newLoanRequest);
		
		return new GeneralResponseDTO("Success","Loan Request Submitted Successfully");
	}

	@Override
	public List<LoanDetailsResponseDTO> getAllLoanDetails(Long userId) {
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(()->new CustomerNotFoundException("Customer not found with id: "+ userId));
		List<LoanDetailsResponseDTO> responseList  = customerRepository.getLoanDetailsByCustomer(cust.getId());
				
		return responseList;
	}
	
	
	
	public double getMonthlyPayment(double loanAmount, double interest, int tenureYears) {
	    double monthlyRate = interest / 1200;
	    int months = tenureYears * 12;

	    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months))
	         / (Math.pow(1 + monthlyRate, months) - 1);
	}
	
	

	public double calculateRemainingAmount(
	        double emi,
	        int tenureYears,
	        int paidMonths,
	        double interestRate,
	        double principal) {

	    double monthlyRate = interestRate / 1200;
	    double remaining = principal;
	    int totalMonths = tenureYears * 12;

	    for (int month = 1; month <= paidMonths && month <= totalMonths; month++) {
	        double interest = remaining * monthlyRate;
	        double principalPaid = emi - interest;
	        remaining -= principalPaid;
	    }

	    return Math.max(remaining, 0);
	}

	@Override
	public GeneralResponseDTO editCustomerDetails(Long userId, EditCustomerDetailsDTO editcustomerDetails) {
		User u = userRepository.findById(userId).orElseThrow(() -> new RuntimeException());
		Address custAddress = addressRepository.findByUser(u).orElseThrow(()->new RuntimeException());
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(()-> new RuntimeException());
		
		u.setName(editcustomerDetails.getName());
		u.setContactNo(editcustomerDetails.getContactNo());
		u.setDob(editcustomerDetails.getDob());
		
		cust.setAadharNo(editcustomerDetails.getAadharNo());
		cust.setPanNo(editcustomerDetails.getPanNo());
		
		custAddress.setCompleteAddress(editcustomerDetails.getCompleteAddress());
		custAddress.setCity(editcustomerDetails.getCity());
		custAddress.setState(editcustomerDetails.getState());
		custAddress.setPincode(editcustomerDetails.getPincode());
		
		return new GeneralResponseDTO("Success","Customer Details Updated...");
	}

	@Override
	public GeneralResponseDTO editCustomerPassword(Long userId, EditPasswordDTO editPasswordDTO) {
		User u = userRepository.findById(userId).orElseThrow(()-> new RuntimeException());
		if(u.getPassword().equals(editPasswordDTO.getCurrentPassword())) {
			u.setPassword(editPasswordDTO.getNewPassword());
		}else {
			throw new RuntimeException("Password is Incorrect");
		}
		return new GeneralResponseDTO("Success","Password Updated Successfully");
	}

	@Override
	public EditCustomerDetailsDTO getCustomerDetails(Long userId) {
		User u = userRepository.findById(userId).orElseThrow(()-> new RuntimeException());
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(()-> new RuntimeException());
		Address address = addressRepository.findByUser(u).orElseThrow(()-> new RuntimeException());
		EditCustomerDetailsDTO	custDetails = modelMapper.map(address, EditCustomerDetailsDTO.class);
		custDetails.setAadharNo(cust.getAadharNo());
		custDetails.setPanNo(cust.getPanNo());
		custDetails.setContactNo(u.getContactNo());
		custDetails.setName(u.getName());
		custDetails.setDob(u.getDob());
		
		return custDetails;
		
	}
	
}
