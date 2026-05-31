package com.shabir.lifemax.controller.Health;


import com.shabir.lifemax.service.Health.HealthService;
import org.springframework.web.bind.annotation.RestController;

import com.shabir.lifemax.dto.loginRequest;
import com.shabir.lifemax.dto.signupRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.shabir.lifemax.dto.signupResponse;
import com.shabir.lifemax.dto.HealthDTO.UserProfileRequest;
import com.shabir.lifemax.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.shabir.lifemax.dto.HealthDTO.UserProfileRequest;
import com.shabir.lifemax.dto.HealthDTO.UserProfileResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.shabir.lifemax.model.UserPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;

@RestController
@RequestMapping("/api/health/profile")
public class profile {
    

    private final HealthService healthService;
    
    public profile(HealthService healthService, UserService userService) {
        this.healthService = healthService;
    }

    @GetMapping("/getHealthProfile")
    public UserProfileResponse getHealthProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return healthService.getHealthProfile(userPrincipal.getUid());
    }

    @PatchMapping("/setHealthProfile")
    public boolean setHealthProfile(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody UserProfileRequest request) {
        return healthService.setUserProfile(userPrincipal.getUid(), request);
    }
    
    
}
