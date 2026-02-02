package com.bankify.entities;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

@Entity
@Table(name = "users")

@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class User extends Base implements UserDetails {

	@Column(name = "name", nullable = false, length = 100)
	private String name;
	
	
	@Column(name = "date_of_birth")
	private LocalDate dob;
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	@Column(name = "contact_no", nullable = false, length = 75)
	private String contactNo;
	@Column(name = "password", length = 200)
	private String password;
	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private Status status;
	@Column(nullable = false)
	private boolean customerVerified = false;
	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false)
	private Role role;
	@OneToOne(mappedBy = "user")
	private Customer customer;
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(role.name());
		return authorities;
	}
	@Override
	public String getUsername() {
		return email;
	}

}
