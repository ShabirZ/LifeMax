package com.shabir.lifemax.service;

import org.springframework.stereotype.Service;

import com.shabir.lifemax.model.Users;
import com.shabir.lifemax.repository.UserRepository;
import com.shabir.lifemax.dto.signupRequest;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {
    private final UserRepository userRepository;
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
}
