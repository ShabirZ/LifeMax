package com.shabir.lifemax.controller;
import org.springframework.web.bind.annotation.RestController;

import com.shabir.lifemax.dto.UserRequest;

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
    public ResponseEntity<UserResponse> addUser(@RequestBody UserRequest userRequest) {

        if (userService.existingEmail(userRequest.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        userService.addUser(userRequest);

        UserResponse userResponse = new UserResponse();
        userResponse.setFirstName(userRequest.getFirstName());
        userResponse.setLastName(userRequest.getLastName());
        userResponse.setEmail(userRequest.getEmail());

        return ResponseEntity.ok(userResponse);
    }

}
