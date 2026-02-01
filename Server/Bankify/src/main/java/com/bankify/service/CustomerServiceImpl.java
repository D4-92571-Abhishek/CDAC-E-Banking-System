package com.bankify.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bankify.dto.CustomerAccountDetailsDTO;
import com.bankify.dto.CustomerDashboardResponseDTO;
import com.bankify.dto.CustomerFundTransferRequestDTO;
import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.CustomerSignupRequest;
import com.bankify.dto.DisplayCustomerDetailsDTO;
import com.bankify.dto.EditCustomerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.GetCustomerAccountDetailsDTO;
import com.bankify.dto.LoanDetailsResponseDTO;
import com.bankify.dto.LoanRequestDTO;
import com.bankify.dto.OtpResponseDTO;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.dto.ValidateCustomerTransferOtpDTO;
import com.bankify.entities.Address;
import com.bankify.entities.Customer;
import com.bankify.entities.Loan;
import com.bankify.entities.LoanDetails;
import com.bankify.entities.LoanStatus;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.Transaction;
import com.bankify.entities.TransactionHistory;
import com.bankify.entities.TransactionOTP;
import com.bankify.entities.TransactionStatus;
import com.bankify.entities.TransactionType;
import com.bankify.entities.User;
import com.bankify.exception.BankifyException;
import com.bankify.exception.UserNotFoundException;
import com.bankify.repository.AddressRepository;
import com.bankify.repository.CustomerRepository;
import com.bankify.repository.LoanDetailsRepository;
import com.bankify.repository.LoanRepository;
import com.bankify.repository.TransactionHistoryRepository;
import com.bankify.repository.TransactionOTPRepository;
import com.bankify.repository.TransactionRepository;
import com.bankify.repository.UserRepository;
import com.bankify.utils.OTPUtils;
import com.bankify.utils.OtpVisuals;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerServiceImpl implements CustomerService {

	private final CustomerRepository customerRepository;
	private final TransactionRepository transactionRepository;
	private final TransactionHistoryRepository transactionHistoryRepository;
	private final UserRepository userRepository;
	private final AddressRepository addressRepository;
	private final LoanRepository loanRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	private final LoanDetailsRepository loanDetailsRepository;
	private final TransactionOTPRepository transactionOTPRepository;

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
	public GeneralResponseDTO signUp(CustomerSignupRequest req) {

		User user = modelMapper.map(req, User.class);
		user.setPassword(passwordEncoder.encode(req.getPassword()));
		user.setRole(Role.ROLE_CUSTOMER);
		user.setStatus(Status.DEACTIVATED);
		System.out.println(user);
		Customer cust = modelMapper.map(req, Customer.class);
		cust.setUser(user);

		cust.setAccountNo(generateAccountNumber());

		Address custAddress = modelMapper.map(req, Address.class);
		custAddress.setUser(user);
		System.out.println(custAddress);
		userRepository.save(user);
		customerRepository.save(cust);
		addressRepository.save(custAddress);

		if (user.getId() == 0)
			throw new RuntimeException();

		return new GeneralResponseDTO("Success", "Customer Account Created Successfully");
	}

	public GeneralResponseDTO signUp(User user, Customer customer, Address address) {

		customer.setAccountNo(generateAccountNumber());

		userRepository.save(user);
		customerRepository.save(customer);
		addressRepository.save(address);

		if (user.getId() == 0)
			throw new RuntimeException();

		return new GeneralResponseDTO("Success", "Customer Account Created Successfully");
	}

	@Override
	public List<CustomerListResponseDTO> getActiveCustomers() {

		return userRepository.getActiveCustomers(Status.ACTIVE, Role.ROLE_CUSTOMER);
	}

	@Override
	public CustomerDashboardResponseDTO getCustomerDetailsById(Long userId) {


		Customer c = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());

		Transaction t = transactionRepository.findTopByCustomerAndTransactionStatusOrderByTransactionTimeDesc(c,TransactionStatus.APPROVED)
				.orElseGet(()->new Transaction());
		CustomerDashboardResponseDTO res = modelMapper.map(c, CustomerDashboardResponseDTO.class);
		res.setRecentTransactionAmount(t != null ? t.getAmount() : 0.0);
		res.setName(c.getUser().getName());
		
		System.out.println(res);

		return res;
	}

	@Override
	public Page<TransactionResponseDTO> getCustomerTransactions(Long userId) {

		Customer c = customerRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		Pageable page = PageRequest.of(0, 10);

		Page<Transaction> transactionPage = transactionRepository.findByCustomerOrderByTransactionTimeDesc(c, page);

		List<TransactionResponseDTO> trResponse = new ArrayList<>();

		for (Transaction t : transactionPage.getContent()) {
			trResponse.add(modelMapper.map(t, TransactionResponseDTO.class));
		}

		return new PageImpl<>(trResponse, page, transactionPage.getTotalElements());
	}

	public Page<Transaction> getCustomerTransactions(Long userId, TransactionType transactionType) {
		Customer c = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());
		Pageable page = PageRequest.of(0, 10);
		Page<Transaction> transactionPage = transactionRepository
				.findByTransactionTypeAndCustomerOrderByTransactionTimeDesc(transactionType, c, page);
		return transactionPage;
	}

	public static boolean sendOtp() {
		return true;
	}

	public OtpResponseDTO sendOtp(Long userId, CustomerFundTransferRequestDTO fundDetails) {
		User u = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User ID is Not Valid"));
		Customer sender = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());
		Customer reciever = customerRepository.findByAccountNo(fundDetails.getDestinationAccountNo())
				.orElseThrow(() -> new RuntimeException("Reciever Account No is not valid..."));
		if (sender.getCurrentBalance() < fundDetails.getAmount()) {
			throw new BankifyException("Insufficient Balance");
		}

		Transaction t = new Transaction();
		t.setAmount(fundDetails.getAmount());
		t.setTransactionDescription("Funds is sending to Name : " + reciever.getUser().getName() + " to Account No : "
				+ reciever.getAccountNo());
		t.setTransactionTime(LocalDateTime.now());
		t.setCustomer(sender);
		t.setTransactionType(TransactionType.DEBITED);

		transactionRepository.save(t);

		TransactionHistory sen = new TransactionHistory();

		sen.setAmount(fundDetails.getAmount());

		sen.setCustomer(sender);

		sen.setRecieverAccountNo(fundDetails.getDestinationAccountNo());

		sen.setSenderAccountNo(fundDetails.getSelfAccountNo());
		sen.setTransactionType(TransactionType.DEBITED);
		sen.setTransaction(t);

		transactionHistoryRepository.save(sen);

		TransactionOTP transOtp = new TransactionOTP();

		transOtp.setOtp(OTPUtils.generateOtp());
		transOtp.setTransaction(t);

		transactionOTPRepository.save(transOtp);

		boolean sendOtp = sendOtp();

		if (!sendOtp)
			throw new BankifyException("Some Internal Error Occured ....");

		return new OtpResponseDTO("Success", "OTP Send Successully to your email..", t.getId().toString(),
				transOtp.getId().toString());

	}

	@Override
	public GeneralResponseDTO transferFunds(Long userId, ValidateCustomerTransferOtpDTO fundDetails) {

		System.out.println(fundDetails);

		Customer sender = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());
		Customer reciever = customerRepository.findByAccountNo(fundDetails.getDestinationAccountNo())
				.orElseThrow(() -> new RuntimeException("Reciever Account No is not valid..."));
		if (sender.getCurrentBalance() < fundDetails.getAmount()) {
			throw new RuntimeException("Insufficient Balance");
		}

		TransactionOTP transOtp = transactionOTPRepository.findById(Long.parseLong(fundDetails.getOtpId()))
				.orElseThrow(() -> new BankifyException("Invalid Otp Id.."));

		Transaction t = transactionRepository.findById(Long.parseLong(fundDetails.getTransactionId()))
				.orElseThrow(() -> new BankifyException("Transaction Not Found.."));
		TransactionHistory sen = transactionHistoryRepository.findByTransaction(t)
				.orElseThrow(() -> new BankifyException("Tranasaction not found"));

		if (fundDetails.getCancelTransaction().equals("TRUE")) {
			t.setTransactionStatus(TransactionStatus.CANCELLED);
			sen.setTransactionStatus(TransactionStatus.CANCELLED);
			return new GeneralResponseDTO("Success", "Transaction Cancelled..");
		}

		boolean isOtpExpired = transOtp.getExpiryTime() != null
				&& transOtp.getExpiryTime().isBefore(LocalDateTime.now());

		if (isOtpExpired) {
			t.setTransactionStatus(TransactionStatus.DECLINED);
			sen.setTransactionStatus(TransactionStatus.DECLINED);
			throw new BankifyException("OTP expired");
		}
		boolean isValidOtp = transOtp.getOtp().equals(fundDetails.getInputOTP());
		if (!isValidOtp) {
			t.setTransactionStatus(TransactionStatus.DECLINED);
			sen.setTransactionStatus(TransactionStatus.DECLINED);
			throw new BankifyException("Invalid OTP");
		}

		transOtp.setVerified(true);

		t.setTransactionStatus(TransactionStatus.APPROVED);

		sen.setTransactionStatus(TransactionStatus.APPROVED);

		sender.setCurrentBalance(sender.getCurrentBalance() - fundDetails.getAmount());
		reciever.setCurrentBalance(reciever.getCurrentBalance() + fundDetails.getAmount());

		Transaction r = new Transaction();
		r.setAmount(fundDetails.getAmount());
		r.setTransactionDescription(
				"funds Creadited by : " + sender.getUser().getName() + " from Account No : " + sender.getAccountNo());
		r.setTransactionTime(LocalDateTime.now());
		r.setCustomer(reciever);
		r.setTransactionType(TransactionType.CREDITED);
		r.setTransactionStatus(TransactionStatus.COMPLETED);

		TransactionHistory rec = new TransactionHistory();

		rec.setAmount(fundDetails.getAmount());
		rec.setCustomer(reciever);
		rec.setRecieverAccountNo(fundDetails.getSelfAccountNo());
		rec.setSenderAccountNo(fundDetails.getDestinationAccountNo());
		rec.setTransactionType(TransactionType.CREDITED);
		rec.setTransactionStatus(TransactionStatus.COMPLETED);
		rec.setTransaction(r);

		transactionHistoryRepository.save(rec);

		transactionRepository.save(r);

		return new GeneralResponseDTO("Success", "Funds Transfer Successfully");
	}

	@Override
	public List<TransactionResponseDTO> getTransactionHistoryDebited(Long userId) {
		Pageable page = PageRequest.of(0, 10);
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());
		Page<Transaction> transactionList = transactionRepository
				.findByTransactionTypeAndCustomerOrderByTransactionTimeDesc(TransactionType.DEBITED, cust, page);

		List<TransactionResponseDTO> trResponse = new ArrayList<>();
		if (transactionList.isEmpty())
			return trResponse;

		for (Transaction t : transactionList) {
			TransactionResponseDTO tr = modelMapper.map(t, TransactionResponseDTO.class);
			trResponse.add(tr);
		}

		return trResponse;
	}

	public Page<Transaction> getTransactionHistoryCredited(Long userId) {
		Pageable page = PageRequest.of(0, 10);
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());
		Page<Transaction> transactionList = transactionRepository
				.findByTransactionTypeAndCustomerOrderByTransactionTimeDesc(TransactionType.CREDITED, cust, page);

		if (transactionList.isEmpty())
			throw new RuntimeException("No Transactions");

		return transactionList;
	}

	@Override
	public GeneralResponseDTO requestForLoan(Long userId, LoanRequestDTO loanRequestDTO) {

		Customer cust = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());
		Loan newLoanRequest = modelMapper.map(loanRequestDTO, Loan.class);

		System.out.println(newLoanRequest);
		newLoanRequest.setLoanStatus(LoanStatus.PENDING);
		newLoanRequest.setCustomer(cust);

		LoanDetails details = new LoanDetails();

		loanRepository.save(newLoanRequest);
		details.setEmi(getMonthlyPayment(newLoanRequest.getAmount(), newLoanRequest.getInterest(),
				loanRequestDTO.getLoanTenureYears()));
		details.setLoan(newLoanRequest);
		details.setCustomer(cust);
		details.setInterest(loanRequestDTO.getInterest());
		details.setPaidMonths(0);
		details.setPrinciple(loanRequestDTO.getAmount());

		loanDetailsRepository.save(details);

		return new GeneralResponseDTO("Success", "Loan Request Submitted Successfully");
	}

	@Override
	public List<LoanDetailsResponseDTO> getAllLoanDetails(Long userId) {
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());

		List<LoanDetailsResponseDTO> responseList = customerRepository.getLoanDetailsByCustomer(cust.getId());
		return responseList;
	}

	public double getMonthlyPayment(double loanAmount, double interest, double tenureYears) {
		double monthlyRate = interest / 1200;
		double months = tenureYears * 12;

		return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
	}

	public double calculateRemainingAmount(double emi, double tenureYears, int paidMonths, double interestRate,
			double principal) {

		double monthlyRate = interestRate / 1200;
		double remaining = principal;
		double totalMonths = tenureYears * 12;

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
		Address custAddress = addressRepository.findByUser(u).orElseThrow(() -> new RuntimeException());
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());

		u.setName(editcustomerDetails.getName());
		u.setContactNo(editcustomerDetails.getContactNo());
		u.setDob(editcustomerDetails.getDob());

		cust.setAadharNo(editcustomerDetails.getAadharNo());
		cust.setPanNo(editcustomerDetails.getPanNo());

		custAddress.setCompleteAddress(editcustomerDetails.getCompleteAddress());
		custAddress.setCity(editcustomerDetails.getCity());
		custAddress.setState(editcustomerDetails.getState());
		custAddress.setPincode(editcustomerDetails.getPincode());

		return new GeneralResponseDTO("Success", "Customer Details Updated...");
	}

	@Override
	public GeneralResponseDTO editCustomerPassword(Long userId, EditPasswordDTO editPasswordDTO) {
		User u = userRepository.findById(userId).orElseThrow(() -> new RuntimeException());

		boolean matchedPassword = passwordEncoder.matches(editPasswordDTO.getCurrentPassword(), u.getPassword());
		System.out.println("");

		if (matchedPassword) {
			u.setPassword(passwordEncoder.encode(editPasswordDTO.getNewPassword()));
		} else {
			throw new RuntimeException("Password is Incorrect");
		}
		return new GeneralResponseDTO("Success", "Password Updated Successfully");
	}

	@Override
	public DisplayCustomerDetailsDTO getCustomerDetails(Long userId) {
		User u = userRepository.findById(userId).orElseThrow(() -> new RuntimeException());
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());
		Address address = addressRepository.findByUser(u).orElseThrow(() -> new RuntimeException());
		DisplayCustomerDetailsDTO custDetails = modelMapper.map(address, DisplayCustomerDetailsDTO.class);
		custDetails.setAadharNo(cust.getAadharNo());
		custDetails.setPanNo(cust.getPanNo());
		custDetails.setAccountNo(cust.getAccountNo());
		custDetails.setContactNo(u.getContactNo());
		custDetails.setName(u.getName());
		custDetails.setDob(u.getDob());
		custDetails.setEmail(u.getEmail());

		return custDetails;

	}

	public GetCustomerAccountDetailsDTO getCustomerAccountDetails(Long userId) {

		Customer cust = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException());

		Double totalOnGoingAmount = transactionRepository.findAllAmountsByTransactionType(cust.getId(),
				TransactionType.DEBITED,TransactionStatus.APPROVED);
		Double totalInComingAmount = transactionRepository.findAllAmountsByTransactionType(cust.getId(),
				TransactionType.CREDITED,TransactionStatus.COMPLETED);

		if (totalInComingAmount == null)
			totalInComingAmount = 0.0;
		if (totalOnGoingAmount == null)
			totalOnGoingAmount = 0.0;

		GetCustomerAccountDetailsDTO response = new GetCustomerAccountDetailsDTO();

		response.setCurrentBalance(cust.getCurrentBalance());
		response.setTotalIncomingAmount(totalInComingAmount);
		response.setTotalOutGoingAmount(totalOnGoingAmount);

		return response;

	}

	@Override
	public CustomerAccountDetailsDTO getAccountNo(Long userId) {
		Customer cust = customerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Invalid User"));

		List<String> accountNo = new ArrayList<>();
		CustomerAccountDetailsDTO custDetails = new CustomerAccountDetailsDTO();
		accountNo.add(cust.getAccountNo());
		custDetails.setUserId(userId);
		custDetails.setAccountNos(accountNo);

		return custDetails;
	}

}
