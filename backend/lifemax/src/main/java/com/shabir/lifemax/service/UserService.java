package com.shabir.lifemax.service;

import org.springframework.stereotype.Service;

import com.shabir.lifemax.model.Users;
import com.shabir.lifemax.repository.UserRepository;
import com.shabir.lifemax.dto.signupRequest;
import com.shabir.lifemax.dto.loginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.Authentication;


@Service
public class UserService {
    
    @Autowired
    private final UserRepository userRepository;
    @Autowired 
    AuthenticationManager authManager;
    
    @Autowired
    JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean existingEmail(String email) {
        Users user = this.userRepository.findByEmail(email);
        return user != null;
    }

    public void addUser(signupRequest signupRequest) {
        String hashed = encoder.encode(signupRequest.getPassword());
        
        Users user = new Users(
            signupRequest.getEmail(), 
            hashed, 
            signupRequest.getFirstName(), 
            signupRequest.getLastName()
        );
        
        this.userRepository.save(user);
    }

     public String verify(loginRequest loginRequest) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(loginRequest.getEmail()); 
            } else {
                return "fail";
            }
    }
}
