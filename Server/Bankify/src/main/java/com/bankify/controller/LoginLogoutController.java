package com.bankify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.CredentialsDTO;
import com.bankify.service.AuthenticateService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bankify")
@RequiredArgsConstructor
@CrossOrigin
public class LoginLogoutController {
	private final AuthenticateService authenticateService;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody CredentialsDTO credentials){
		System.out.println(credentials);
		return ResponseEntity.ok(authenticateService.authenticate(credentials));
	}
	
}
