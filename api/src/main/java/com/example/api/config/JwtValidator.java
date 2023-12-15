package com.example.api.config;

import java.io.IOException;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.api.service.UserDetailImpl;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
@Component
@AllArgsConstructor
public class JwtValidator extends OncePerRequestFilter  {
    private final UserDetailImpl userDetailImpl;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
       String jwt = request.getHeader("Authorization");
       if(jwt!=null){
        jwt = jwt.substring(7);
        try {
            SecretKey key = Keys.hmacShaKeyFor(jwtConstant.SECRET_KEY.getBytes());
            String email = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload().getSubject();
            UserDetails userDetails = userDetailImpl.loadUserByUsername(email);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null,userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(token);
        } catch (Exception e) {
            throw new BadCredentialsException("invalid token.. from jwt");
        }

       }
       filterChain.doFilter(request, response);
    }
    
}
