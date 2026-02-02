package com.bankify.dto;

import com.bankify.entities.LoanType;
import com.bankify.entities.LoanStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PendingLoanCustomerDTO {
    private Long loanId;
    private String customerName;
    private LoanType loanType;
    private double amount;
    private double interest;
    private LoanStatus loanStatus;
}
