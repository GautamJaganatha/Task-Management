package com.Gautam.Task_SpringBoot.utils;

import com.Gautam.Task_SpringBoot.Repository.UserRepository;
import com.Gautam.Task_SpringBoot.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final UserRepository userRepository;


    private final String SECRET_KEY = "h9s+kjp3dq9WArgWdYIO37qtnLsI2yIuJWtbbDB96GcGx92sSp3RfQ==";


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(String username){
        return generateToken(new HashMap<>(), username);
    }


    public String generateToken(Map<String, Object> extraClaim, String username){
        return Jwts
                .builder()
                .setClaims(extraClaim)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 120))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();

    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);

    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    private Key getSignInKey() {
        byte[] keys = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keys);
    }



    public User getLoggedInUser(){
       Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();
       if (authentication!= null && authentication.isAuthenticated()){
           User user = (User) authentication.getPrincipal();
           Optional<User> optionalUser = userRepository.findById(user.getId());
           return optionalUser.orElse(null);
       }

       return null;
    }
}
