package com.example.backend_projeto.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private String secreteKey = "!,@Su0a=6sO;>zI+";

    public String generateToken(String email) {
        return Jwts.builder().setSubject(email).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS256, secreteKey).compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(secreteKey).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return Jwts.parser().setSigningKey(secreteKey).parseClaimsJws(token).getBody().getExpiration();
    }

    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}
