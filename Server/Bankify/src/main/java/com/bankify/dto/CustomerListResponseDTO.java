package com.bankify.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomerListResponseDTO {

    private Long userId;
    private String name;
    private String email;
    private String contactNo;
}

