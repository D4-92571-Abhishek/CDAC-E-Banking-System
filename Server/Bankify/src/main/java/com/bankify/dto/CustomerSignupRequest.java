package com.bankify.dto;

import java.time.LocalDate;

import com.bankify.entities.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class CustomerSignupRequest {

    private String name;
    
    @JsonFormat(pattern = "yyyy-MM-dd")

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

