package com.shabir.lifemax;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import com.shabir.lifemax.service.JWTService;


@SpringBootTest
@AutoConfigureMockMvc
class LifemaxApplicationTests {

	@Autowired
    private MockMvc mockMvc;
    @Autowired
    private JWTService jwtService; 


    @Value("${test_uid}")
    private String testUid; 

    private String token;
    @BeforeEach // This runs right before every test
    public void setup() {
        System.out.println("userID: " + testUid);
        token = jwtService.generateToken(testUid);
        System.out.println("Generated JWT for testing: " + token); 

    }

}
