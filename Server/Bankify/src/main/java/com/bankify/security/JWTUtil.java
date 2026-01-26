package com.bankify.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.bankify.entities.User;

import jakarta.annotation.PostConstruct;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Component
public class JWTUtil {
	
	@Value(value = "jwt.token.expiration.millis")
	private long jwtExpiration;
	
	@Value(value = "jwt.token.secret")
	private String jwtSecret;
	
	private Key jwtKey;
	
	@PostConstruct
	public void init() {
		jwtKey=Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}	
	
	public String createToken(Authentication authentication) {
		
		User user=(User) authentication.getPrincipal();
		
		String subject=""+user.getId();
		
		String roles=user.getAuthorities.stream().
				map(authority->authority.getAuthority()).
				collect(Collectors.joining(","));
		
		String token=Jwts.builder().
				setSubject(subject).
				setIssuedAt(new Date()).
				setExpiration(new Date(System.currentTimeMillis()+jwtExpiration)).
				claim("roles", roles)
		
	}
	
}
