package com.bankify.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EditCustomerDetailsDTO {

    private String name;
    private String email;
    private String contactNo;
    private LocalDate dob;

    private String accountNo;
    private String aadharNo;
    private String panNo;

    private String completeAddress;
    private String city;
    private String state;
    private String pincode;
}
