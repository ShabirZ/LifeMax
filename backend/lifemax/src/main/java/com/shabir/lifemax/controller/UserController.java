package com.shabir.lifemax.controller;
import org.springframework.web.bind.annotation.RestController;

import com.shabir.lifemax.dto.signupRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.shabir.lifemax.dto.UserResponse;
import com.shabir.lifemax.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public ResponseEntity<UserResponse> addUser(@RequestBody signupRequest signupRequest) {

        if (userService.existingEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        userService.addUser(signupRequest);

        UserResponse userResponse = new UserResponse();
        userResponse.setFirstName(signupRequest.getFirstName());
        userResponse.setLastName(signupRequest.getLastName());
        userResponse.setEmail(signupRequest.getEmail());

        return ResponseEntity.ok(userResponse);
    }
    
    @PostMapping("/loginUser")
    public String postMethodName(@RequestBody signupRequest userRequest) {
        //TODO: process POST request
        System.out.println(userRequest);
        return "User logged in successfully";
    }
    
}
