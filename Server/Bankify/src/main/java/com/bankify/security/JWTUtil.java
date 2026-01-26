package com.bankify.security;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import com.bankify.entities.User;

import jakarta.annotation.PostConstruct;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Component
public class JWTUtil {
	
	@Value(value = "jwt.token.expiration.millis")
	private long jwtExpiration;
	
	@Value(value = "jwt.token.secret")
	private String jwtSecret;
	
//	private Key jwtKey;
	
	private SecretKey jwtKey;
	
	@PostConstruct
	public void init() {
		jwtKey=Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}	
	
	public String createToken(Authentication authentication) {
		
		User user=(User) authentication.getPrincipal();
		
		String subject=""+user.getId();
		
		String roles=user.getAuthorities().stream().
				map(authority->authority.getAuthority()).
				collect(Collectors.joining(","));
		
		String token=Jwts.builder()
                .subject(subject)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .claim("role", roles)
                .signWith(jwtKey)   
                .compact();
		
		return token;
	}
	
	public Authentication validateToken(String token) {
		
		JwtParser parser=Jwts.parser().verifyWith(jwtKey).build();
		
		Claims claims=parser
                .parseSignedClaims(token)   
                .getPayload();
		
		String userId=claims.getSubject();
		
		String roles=(String) claims.get("role");
		
		List<GrantedAuthority> authorities=AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
		
		Authentication auth=new UsernamePasswordAuthenticationToken(userId,null, authorities);
		
		return auth;
		
	}
	
}
