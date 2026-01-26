package com.bankify.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

@Component
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http) {
		AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		authBuilder.userDetailsService(userDetailsService);
		return authBuilder.build();
	}
	
	@Bean
	SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
		
		http.csrf(csrf->csrf.disable())
			.authorizeHttpRequests(req -> 
				req.requestMatchers("/bankify/login","/bankify/customers/signup").permitAll()
					.requestMatchers("/bankify/customer/**").hasRole("CUSTOMER")
					.requestMatchers("/bankify/admin/**").hasRole("ADMIN")
					.requestMatchers("/bankify/manager/**").hasRole("MANAGER")
					)
			.httpBasic(httpBasic -> httpBasic.disable())
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
			
			return http.build();
	}
	
	
}
