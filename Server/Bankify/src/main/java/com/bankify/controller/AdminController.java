package com.bankify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bankify/admin/")
@RequiredArgsConstructor
public class AdminController {
	

	private final AdminService adminService;
	
	@GetMapping("/adminDashboard")
	public ResponseEntity<?> getAdminDashboardDetails(){
		
		return ResponseEntity.ok(adminService.getAdminDashboardDetails());
		
	}
	
}
