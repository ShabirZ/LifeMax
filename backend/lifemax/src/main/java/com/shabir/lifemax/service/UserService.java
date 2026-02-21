package com.shabir.lifemax.service;

import org.springframework.stereotype.Service;

import com.shabir.lifemax.model.Users;
import com.shabir.lifemax.repository.UserRepository;
import com.shabir.lifemax.dto.UserRequest;

@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean existingEmail(String email) {
        Users user = this.userRepository.findByEmail(email);
        return user != null;
    }

    public void addUser(UserRequest userRequest) {
        String firstName = userRequest.getFirstName();
        String lastName = userRequest.getLastName();
        String email = userRequest.getEmail();
        String password = userRequest.getPassword();
        // TODO: Hash the password before saving to the database
        Users user = new Users(email, password, firstName, lastName);
        this.userRepository.save(user);
    }
}
