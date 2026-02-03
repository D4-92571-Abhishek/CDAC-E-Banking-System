package com.bankify.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private JWTFilter jwtFilter;

	@Autowired
	private UserDetailsService userDetailsService;

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	AuthenticationManager authenticationManager(HttpSecurity http) {
//		return http.getSharedObject(AuthenticationManagerBuilder.class)
//	            .userDetailsService(userDetailsService)
//	            .passwordEncoder(passwordEncoder()) // 🔥 MUST
//	            .and()
//	            .build();
//	}
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {

			http.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.configurationSource(request -> {
			var corsConfig = new org.springframework.web.cors.CorsConfiguration();
			corsConfig.setAllowedOriginPatterns(List.of("*")); // allow all origins, or specify your frontend URL
			corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
			corsConfig.setAllowedHeaders(List.of("*"));
			corsConfig.setAllowCredentials(false); // if using cookies or credentials
			return corsConfig;
					}))
				.authorizeHttpRequests(req -> req.requestMatchers("/bankify/customers/signup").permitAll()
				.requestMatchers(HttpMethod.POST, "/bankify/admin/signUp").permitAll()
				.requestMatchers(HttpMethod.POST, "/bankify/login").permitAll().requestMatchers("/bankify/customers/**")
				.hasRole("CUSTOMER").requestMatchers("/bankify/admin/**").hasRole("ADMIN")
				.requestMatchers("/bankify/manager/**").hasRole("MANAGER")).httpBasic(httpBasic -> httpBasic.disable())
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

}
