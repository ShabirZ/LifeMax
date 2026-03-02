package com.shabir.lifemax.config;

import com.shabir.lifemax.service.JWTService;
import com.shabir.lifemax.service.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //  Bearer eyJhbGci... (token format)
        // extract auth header after Bearer and validate it, then set the user in the security context
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String uidString = null;
        int prefixLength = 0;
        System.out.println("Auth Header: " + authHeader);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            prefixLength = "Bearer ".length();
            token = authHeader.substring(prefixLength);
            uidString = jwtService.extractUserName(token);
        }
        UUID uid = null;
        if(uidString != null) {
            try {
                uid = UUID.fromString(uidString);
            } catch (IllegalArgumentException e) {
                System.out.println("Invalid UID format in token: " + uidString);
            }
        }

        if (uid != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUid(uid);
            
            if (jwtService.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource()
                        .buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}