package com.bankify.service;

import org.jspecify.annotations.Nullable;

import com.bankify.dto.CredentialsDTO;
import com.bankify.dto.JwtRoleResponseDTO;

public interface AuthenticateService {

	@Nullable
	JwtRoleResponseDTO authenticate(CredentialsDTO credentials);

}
