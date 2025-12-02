package com.example.api.config;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(jwtConstant.SECRET_KEY.getBytes());
    public String generateToken(String email){
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + TimeUnit.DAYS.toMillis(10)); // 10 days in milliseconds
        return Jwts.builder().issuedAt(new Date())
        .expiration(expirationDate)
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
