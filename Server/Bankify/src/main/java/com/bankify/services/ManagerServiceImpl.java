package com.bankify.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bankify.dto.ManagerCreateCustomerDTO;
import com.bankify.dto.PendingCustomerResponse;
import com.bankify.entities.Address;
import com.bankify.entities.Customer;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;
import com.bankify.repository.AddressRepository;
import com.bankify.repository.CustomerRepository;
import com.bankify.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ManagerServiceImpl implements ManagerService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;


    //Getting list of Inactive Customers
    
    @Override
    public List<PendingCustomerResponse> getPendingCustomers() {

        List<User> users =
            userRepository.findByRoleAndStatus(Role.ROLE_CUSTOMER, Status.DEACTIVATED);

        return users.stream().map(user -> {
            PendingCustomerResponse dto = new PendingCustomerResponse();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setContactNo(user.getContactNo());
            dto.setCustomerVerified(user.isCustomerVerified());

            Address address = addressRepository.findByUserId(user.getId()).orElse(null);
            dto.setAddressVerified(address != null && address.isAddressVerified());

            return dto;
        }).toList();
    }


    //Approving Customer Details

    @Override
    public void verifyCustomer(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setCustomerVerified(true);
    }

    //Approving Address Details

    @Override
    public void verifyAddress(Long userId) {
        Address address = addressRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        address.setAddressVerified(true);
    }

    //Approving Account Request
    
    @Override
    public void approveCustomer(Long userId) {

        User user = userRepository.findById(userId).orElseThrow();

        if (!user.isCustomerVerified())
            throw new RuntimeException("Customer not verified");

        Address address = addressRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Address not verified"));

        if (!address.isAddressVerified())
            throw new RuntimeException("Address not verified");

        user.setStatus(Status.ACTIVE);
        
       
    }

    //Rejecting Account Request
    
    @Override
    public void rejectCustomer(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(Status.BLOCKED);
    }
    
    @Override
    public User createCustomerAsManager(ManagerCreateCustomerDTO dto) {


    	User user = new User();
        user.setName(dto.getFirstName() + " " + dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setContactNo(dto.getContactNo());
        user.setPassword(dto.getPassword()); 
        user.setDob(dto.getDateOfBirth());

        user.setStatus(Status.ACTIVE);
        user.setRole(Role.ROLE_CUSTOMER);
        user.setCustomerVerified(true); // no verification required

        Customer customer = new Customer();
        customer.setAadharNo(dto.getAadharNo());
        customer.setPanNo(dto.getPanNo());
        customer.setGender(dto.getGender());
        customer.setLoanTaken(false);
        customer.setUser(user); // owning side of relationship

        user.setCustomer(customer); // optional, for in-memory navigation

        Address address = new Address();
        address.setCompleteAddress(dto.getCompleteAddress());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        address.setAddressVerified(true); // manager-added
        address.setUser(user); // owning side

        userRepository.save(user);         // cascades Customer
        addressRepository.save(address);   // separate save for Address

        return user;
    }

    
    
    
}
