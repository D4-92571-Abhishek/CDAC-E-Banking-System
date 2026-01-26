//package com.bankify.dto;
//
//
//import java.time.LocalDate;
//
//import com.bankify.entities.Gender;
//
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class ManagerCreateCustomerDTO {
//
//    private String firstName;
//    private String lastName;
//    private String email;
//    private String contactNo;
//    private String password;
//    private LocalDate dateOfBirth;
//
//    private Gender gender;
//    private String aadharNo;
//    private String panNo;
//    private String completeAddress;
//    private String city;
//    private String state;
//    private String pincode;
//}
package com.bankify.dto;

import java.time.LocalDate;

import com.bankify.entities.Gender;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ManagerCreateCustomerDTO {


    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")

    private String email;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Contact number must be 10 digits")
    private String contactNo;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotBlank(message = "Aadhar number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhar number must be 12 digits")
    private String aadharNo;

    @NotBlank(message = "PAN number is required")
    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "Invalid PAN format")
    private String panNo;

    @NotBlank(message = "Complete address is required")
    private String completeAddress;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be 6 digits")
    private String pincode;
}

