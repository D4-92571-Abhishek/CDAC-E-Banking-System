package com.bankify.dto;

import java.time.LocalDate;

import com.bankify.entities.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CustomerSignupRequest {

    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String contactNo;
    private String password;

    private Gender gender;
    private String aadharNo;
    private String panNo;

    private String completeAddress;
    private String city;
    private String state;
    private String pincode;
}

