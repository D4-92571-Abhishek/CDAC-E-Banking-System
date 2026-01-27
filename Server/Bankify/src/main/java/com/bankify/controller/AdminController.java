package com.bankify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.AdminCreateManagerDTO;
import com.bankify.service.AdminService;

import jakarta.validation.Valid;
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
	
	@GetMapping("/adminCustomerInfo")
	public ResponseEntity<?> getAdminCustomerInfo(){
		
		return ResponseEntity.ok(adminService.getAdminCustomerInfo());
		
	}
	
	@GetMapping("/adminCustomerList")
	public ResponseEntity<?> getAdminCustomerList(){
		
		return ResponseEntity.ok(adminService.getAdminCustomerList());
		
	}
	
	@GetMapping("/adminActiveManagers")
	public ResponseEntity<?> getAdminManagerInfo(){
		
		return ResponseEntity.ok(adminService.getAdminActiveManagers());
		
	}
	
	@GetMapping("/adminManagerList")
	public ResponseEntity<?> getAdminManagerList(){
		
		return ResponseEntity.ok(adminService.getAdminManagerList());
		
	}
	
	@PostMapping("/adminAddManager")
	public ResponseEntity<?> addManager(@RequestBody @Valid AdminCreateManagerDTO manager){
		
		return ResponseEntity.ok(adminService.addManager(manager));
		
	}
	
}
