package com.bankify.service;

import com.bankify.dto.CredentialsDTO;
import com.bankify.dto.JwtRoleResponseDTO;

public interface AuthenticateService {

	JwtRoleResponseDTO authenticate(CredentialsDTO credentials);

}
