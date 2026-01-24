package com.bankify.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PendingCustomerResponse {
    private Long id;
    private String name;
    private String email;
    private String contactNo;
    private boolean customerVerified;
    private boolean addressVerified;
}
