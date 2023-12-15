package com.example.api.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(jwtConstant.SECRET_KEY.getBytes());
    public String generateToken(String email){
        return Jwts.builder().issuedAt(new Date())
        .expiration(new Date(new Date().getTime() * 846000000))
        .subject(email)
        .signWith(key)
        .compact();
    }
    public String getEmailFromjwt(String jwt){
        String token = jwt.substring(7);
        return Jwts.parser().verifyWith(key).build()
        .parseSignedClaims(token).getPayload().getSubject();
    }
    public String getEmailFromToken(String token){
        return Jwts.parser().verifyWith(key).build()
        .parseSignedClaims(token).getPayload().getSubject();
    }
}
