package com.bankify.security;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter{
	
	@Autowired
	private JWTUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader=request.getHeader("Authorization");
		
		boolean validHeader=authHeader!=null && authHeader.startsWith("Bearer");
		
		Authentication auth=null;
		
		if(validHeader) {
			
			String token=authHeader.replace("Bearer","").trim();
			
			System.out.println("JwtToken :"+token);	
			
			auth=jwtUtil.validateToken(token);
		}
		
		if( auth!=null && SecurityContextHolder.getContext().getAuthentication() == null) 
			SecurityContextHolder.getContext().setAuthentication(auth);
		
			
		filterChain.doFilter(request, response);
	}		
	
}
