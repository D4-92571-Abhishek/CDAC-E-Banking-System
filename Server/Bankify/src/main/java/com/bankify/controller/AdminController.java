package com.bankify.controller;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankify.dto.AdminCreateManagerDTO;
import com.bankify.entities.Status;
import com.bankify.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bankify/admin/")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {
	

	private final AdminService adminService;
	
	@PostMapping("/signUp")
	public ResponseEntity<?> addAdmin(@RequestBody AdminCreateManagerDTO admin){
		
		return ResponseEntity.ok(adminService.addAdmin(admin));
		
	}
	
	
	
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
	public ResponseEntity<?> addManager(@RequestBody AdminCreateManagerDTO manager){
		
		return ResponseEntity.ok(adminService.addManager(manager));
		
	}
	
	@GetMapping("/adminLoanInfo")
	public ResponseEntity<?> getAdminLoanInfo(){
		
		return ResponseEntity.ok(adminService.getAdminLoanInfo());
		
	}
	
	@GetMapping("/adminLoanList")
	public ResponseEntity<?> getAdminLoanList(){
		
		return ResponseEntity.ok(adminService.getAdminLoanList());
		
	}
	
	@PutMapping("/adminDeactivateManager/{employeeId}")
	public ResponseEntity<?> deactivateManager(@PathVariable Long employeeId){
		
		return ResponseEntity.ok(adminService.deactivateManager(employeeId));
		
	}
	
	@PutMapping("/adminDeactivateCustomer/{id}/{status}")
	public ResponseEntity<?> changeStatus(@PathVariable Long id,@PathVariable String status){
		
		
		
		return ResponseEntity.ok(adminService.changeStatus(id,Status.valueOf(status.toUpperCase())));
		
	}
	
}
