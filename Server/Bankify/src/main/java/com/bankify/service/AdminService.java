package com.bankify.service;

import java.util.List;

import com.bankify.dto.AdminCreateManagerDTO;
import com.bankify.dto.AdminCustomerInfoDTO;
import com.bankify.dto.AdminCustomerListDTO;
import com.bankify.dto.AdminDashboardDTO;
import com.bankify.dto.AdminLoanInfoDTO;
import com.bankify.dto.AdminLoanListDTO;
import com.bankify.dto.AdminManagerListDTO;
import com.bankify.dto.GeneralResponseDTO;
import com.bankify.entities.Status;

public interface AdminService {
	
	AdminDashboardDTO getAdminDashboardDetails();
	
	AdminCustomerInfoDTO getAdminCustomerInfo();
	
	List<AdminCustomerListDTO> getAdminCustomerList();
	
	long getAdminActiveManagers();
	
	List<AdminManagerListDTO> getAdminManagerList();
	
	GeneralResponseDTO addManager(AdminCreateManagerDTO manager);
	
	AdminLoanInfoDTO getAdminLoanInfo();
	
	List<AdminLoanListDTO> getAdminLoanList();

	GeneralResponseDTO addAdmin(AdminCreateManagerDTO admin);

	GeneralResponseDTO deactivateManager(Long employeeId);

	GeneralResponseDTO changeStatus(Long id,Status status);
}
