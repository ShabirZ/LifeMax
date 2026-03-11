package com.shabir.lifemax;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import com.shabir.lifemax.service.JWTService;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import org.springframework.http.MediaType;


@AutoConfigureMockMvc
@SpringBootTest
public class TransactionTests {
    @Autowired
    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper();
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
    /*
        TODO: Join create / delete tests
    */
    @Test
    public void CreateTransactionTest() throws Exception {
        Map<String, Object> dataPayload = Map.of(
                "amount", 18.75,
                "category", "food",
                "description", "Lunch at Chipotle",
                "transactionDate", "2026-03-11"
            );
        String jsonRequest = objectMapper.writeValueAsString(dataPayload);
        mockMvc.perform(post("/api/finance/createTransaction")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonRequest))        
            .andDo(org.springframework.test.web.servlet.result.MockMvcResultHandlers.print())
            .andExpect(status().isCreated())
            .andExpect(content().string("Transaction created successfully"));
    }
     


}