//package com.bankify.dto;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@ToString
//
//
//public class CustomerFundTransferRequestDTO {
//	private String selfAccountNo;
//	private String destinationAccountNo;
//	private double amount;
//	private String message;
//}
package com.bankify.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

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
public class CustomerFundTransferRequestDTO {

    @NotBlank(message = "Sender account number is required")
    @Pattern(regexp = "\\d{10,18}", message = "Sender account number must be between 10 to 18 digits")
    private String selfAccountNo;

    @NotBlank(message = "Destination account number is required")
    @Pattern(regexp = "\\d{10,18}", message = "Destination account number must be between 10 to 18 digits")
    private String destinationAccountNo;

    @DecimalMin(value = "1.0", inclusive = true, message = "Transfer amount must be at least 1")
    private double amount;

    @Size(max = 100, message = "Message cannot exceed 100 characters")
    private String message;
}
