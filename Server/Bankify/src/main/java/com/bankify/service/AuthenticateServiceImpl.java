package com.bankify.service;

import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.bankify.dto.CredentialsDTO;
import com.bankify.dto.JwtRoleResponseDTO;
import com.bankify.security.JWTUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticateServiceImpl implements AuthenticateService {
	private final AuthenticationManager authenticationManager;
	private final JWTUtil jwtUtil;
	@Override
	public JwtRoleResponseDTO authenticate(CredentialsDTO credentials) {
		Authentication auth = new UsernamePasswordAuthenticationToken(credentials.getEmail(),credentials.getPassword());
		System.out.println(auth);
		auth = authenticationManager.authenticate(auth);
		System.out.println(auth);
		String token = jwtUtil.createToken(auth);
		String Role = auth.getAuthorities().stream()	
				.map(authority -> authority.getAuthority())
				.filter(r -> !r.equals("FACTOR_PASSWORD")) 
				.collect(Collectors.joining(","));
		
		System.out.println(auth.getPrincipal());
		return new JwtRoleResponseDTO(token, Role);
	}

}
