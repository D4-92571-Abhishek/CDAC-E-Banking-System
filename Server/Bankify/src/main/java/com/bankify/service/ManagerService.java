package com.bankify.service;


import java.util.List;

import com.bankify.dto.ManagerCreateCustomerDTO;
import com.bankify.entities.User;

public interface ManagerService {

    List<User> getPendingCustomers();

    void verifyCustomer(Long userId);

    void verifyAddress(Long userId);

    void approveCustomer(Long userId);
    
    void rejectCustomer(Long userId);
    
    void notifyLowBalanceCustomers();
    
    User createCustomerAsManager(ManagerCreateCustomerDTO dto);
}


