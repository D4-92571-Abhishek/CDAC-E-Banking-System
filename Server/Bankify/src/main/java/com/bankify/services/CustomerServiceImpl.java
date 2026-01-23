package com.bankify.services;

import org.springframework.stereotype.Service;

import com.bankify.dto.CustomerSignupRequest;
import com.bankify.entities.Address;
import com.bankify.entities.Customer;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;
import com.bankify.repository.AddressRepository;
import com.bankify.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    @Override
    public void signUp(CustomerSignupRequest req) {

        User user = new User();
        user.setName(req.getFirstName() + " " + req.getLastName());
        user.setDob(req.getDob());
        user.setEmail(req.getEmail());
        user.setContactNo(req.getContactNo());
        user.setPassword(req.getPassword());
        user.setRole(Role.ROLE_CUSTOMER);
        user.setStatus(Status.DEACTIVATED);

        Customer customer = new Customer();
        customer.setAadharNo(req.getAadharNo());
        customer.setPanNo(req.getPanNo());
        customer.setGender(req.getGender());
        customer.setUser(user); 

        Address address = new Address();
        address.setCompleteAddress(req.getCompleteAddress());
        address.setCity(req.getCity());
        address.setState(req.getState());
        address.setPincode(req.getPincode());
        address.setAddressVerified(false);
        address.setUser(user); 

        user.setCustomer(customer);

        userRepository.save(user);       
        addressRepository.save(address);  
    }
}
