package com.bankify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.AdminDashboardDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bankify/admin/")
@RequiredArgsConstructor
public class AdminController {
	
	public ResponseEntity<AdminDashboardDTO> getAdminDashboardDetails(){
		
		return null;
		
	}
	
}
