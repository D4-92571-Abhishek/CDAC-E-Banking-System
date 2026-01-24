package com.bankify.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.jspecify.annotations.Nullable;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bankify.dto.CustomerDashboardResponseDTO;
import com.bankify.dto.CustomerFundTransferRequestDTO;
import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.entities.Address;
import com.bankify.entities.Customer;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.Transaction;
import com.bankify.entities.TransactionType;
import com.bankify.entities.User;
import com.bankify.repository.AddressRepository;
import com.bankify.repository.CustomerRepository;
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
	private final ModelMapper modelMapper;

	@Override
	public void signUp(CustomerSignupRequest req) {

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

		User u = userRepository.findById(userId).orElseThrow(()->new RuntimeException());
		
		Customer c = customerRepository.findByUser(userId).orElseThrow(()->new RuntimeException());
		
		Transaction t = transactionRepository.findTopByCustomerOrderByTransactionTimeDesc(c).orElseThrow(()->new RuntimeException());
		CustomerDashboardResponseDTO res = modelMapper.map(c, CustomerDashboardResponseDTO.class);
		res.setRecentTransactionAmount(t.getAmount());
		res.setName(u.getName());
		
		return res;
	}

	@Override
	public  Page<Transaction> getCustomerTransactions(Long userId) {
		Customer c = customerRepository.findByUser(userId).orElseThrow(()-> new RuntimeException());
		Pageable page = PageRequest.of(0,10);
		Page<Transaction> transactionPage = transactionRepository.findByCustomer(c,page);
		return transactionPage;
	}

	@Override
	public GeneralResponseDTO transferFunds(Long userId,CustomerFundTransferRequestDTO fundDetails) {
		
		Customer sender = customerRepository.findByUser(userId).orElseThrow(()->new RuntimeException());
		Customer reciever = customerRepository.findByAccountNo(fundDetails.getDestinationAccountNo()).orElseThrow(()->new RuntimeException());
		if(sender.getCurrentBalance()<fundDetails.getAmount()) {
			throw new RuntimeException("Insufficient Balance");
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
	
	
}
