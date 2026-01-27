package com.bankify.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bankify.dto.CustomerListResponseDTO;
import com.bankify.dto.EditManagerDetailsDTO;
import com.bankify.dto.EditPasswordDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.dto.ManagerCreateCustomerDTO;
import com.bankify.dto.PendingCustomerResponse;
import com.bankify.dto.TransactionResponseDTO;
import com.bankify.entities.Address;
import com.bankify.entities.Customer;
import com.bankify.entities.Role;
import com.bankify.entities.Status;
import com.bankify.entities.User;
import com.bankify.repository.AddressRepository;
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
    public GeneralResponseDTO verifyCustomer(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setCustomerVerified(true);

        return new GeneralResponseDTO("Success", "Customer verified successfully");
    }

    @Override
    public GeneralResponseDTO verifyAddress(Long userId) {
        Address address = addressRepository.findByUser_Id(userId)
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

        Address address = addressRepository.findByUser_Id(userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

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

        if (!user.getPassword().equals(dto.getCurrentPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(dto.getNewPassword());

        return new GeneralResponseDTO("Success", "Password updated successfully");
    }

    @Override
    public EditManagerDetailsDTO getManagerDetails(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new EditManagerDetailsDTO(
                user.getName(),
                user.getContactNo()
        );
    }

    @Override
    
    public List<TransactionResponseDTO> getTransactionsByUserId(Long userId) {
        return transactionRepository
                .findTransactionsByUserId(userId, Status.ACTIVE);
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
        user.setCustomerVerified(true);

        Customer customer = new Customer();
        customer.setAadharNo(dto.getAadharNo());
        customer.setPanNo(dto.getPanNo());
        customer.setGender(dto.getGender());
        customer.setLoanTaken(false);
        customer.setUser(user);

        Address address = new Address();
        address.setCompleteAddress(dto.getCompleteAddress());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        address.setAddressVerified(true);
        address.setUser(user);

        userRepository.save(user);
        addressRepository.save(address);

        return user;
    }
}

