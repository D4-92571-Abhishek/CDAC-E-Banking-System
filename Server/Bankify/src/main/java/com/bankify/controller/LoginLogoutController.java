package com.bankify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.CredentialsDTO;
import com.bankify.service.AuthenticateService;

import lombok.RequiredArgsConstructor;

@RestController("/bankify")
@RequiredArgsConstructor
public class LoginLogoutController {
	private final AuthenticateService authenticateService;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody CredentialsDTO credentials){
		return ResponseEntity.ok(authenticateService.authenticate(credentials));
	}
	
}
