package com.bankify;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.bankify.service.AdminService;

@SpringBootApplication
public class BankifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankifyApplication.class, args);
	}
	
	@Bean
	ModelMapper modelMapper()
	{
		ModelMapper mapper=new ModelMapper();
		//configure mapper - to transfer the matching props (name + data type)
		mapper.getConfiguration()
		.setMatchingStrategy(MatchingStrategies.STRICT)
		//configure mapper - not to transfer nulls from src -> dest
		.setPropertyCondition(Conditions.isNotNull());
		return mapper;//Method rets configured ModelMapper bean to SC
	}
	
	@Bean
	CommandLineRunner createAdminAndBankAssetsAccount(AdminService adminService) {
		return args -> {
			adminService.createAdminAndBankAssetsAccount();
		};
	}

}
