package com.bankify.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

// lombok annotations


import lombok.ToString;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@ToString(exclude = {"user"})
public class Address {

    @Id
    @Column(name="address_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @Column(name="complete_address")
    private String completeAddress;
    private String city;
    private String state;
    
    @Column(nullable = false)
    private String pincode;

    @Column(nullable = false)
    private boolean addressVerified = false;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)

    private User user;

}

