package com.shabir.lifemax.controller;
import org.springframework.web.bind.annotation.RestController;

import com.shabir.lifemax.dto.loginRequest;
import com.shabir.lifemax.dto.signupRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.shabir.lifemax.dto.signupResponse;
import com.shabir.lifemax.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public ResponseEntity<signupResponse> addUser(@RequestBody signupRequest signupRequest) {

        if (userService.existingEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        userService.addUser(signupRequest);

        signupResponse signupResponse = new signupResponse();
        signupResponse.setFirstName(signupRequest.getFirstName());
        signupResponse.setLastName(signupRequest.getLastName());
        signupResponse.setEmail(signupRequest.getEmail());

        return ResponseEntity.ok(signupResponse);
    }
    
    @PostMapping("/loginUser")
    public String postMethodName(@RequestBody loginRequest loginRequest) {
        return userService.verify(loginRequest);
    }
    
}
