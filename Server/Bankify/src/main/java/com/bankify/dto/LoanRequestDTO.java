//package com.bankify.dto;
//
//import com.bankify.entities.LoanType;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//
//
//@Getter @Setter @ToString @NoArgsConstructor @AllArgsConstructor
//public class LoanRequestDTO {
//	private double amount;
//	private double interest;
//	private int loanTenureYears;
//	private LoanType loanType;
//}
package com.bankify.dto;

import com.bankify.entities.LoanType;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter 
@Setter 
@ToString 
@NoArgsConstructor 
@AllArgsConstructor
public class LoanRequestDTO {

    @Positive(message = "Loan amount must be greater than zero")
    @DecimalMin(value = "1000.0", message = "Minimum loan amount must be at least 1000")
    private double amount;

    @Positive(message = "Interest must be positive")
    @Min(value = 1, message = "Interest must be at least 1%")
    @Max(value = 20, message = "Interest cannot exceed 20%")
    private double interest;

    @Min(value = 1, message = "Loan tenure must be at least 1 year")
    @Max(value = 40, message = "Loan tenure cannot exceed 40 years")
    private int loanTenureYears;

    @NotNull(message = "Loan type is required")
    private LoanType loanType;
}

