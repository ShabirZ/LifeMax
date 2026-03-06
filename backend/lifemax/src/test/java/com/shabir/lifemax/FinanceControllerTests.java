package com.shabir.lifemax;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import com.shabir.lifemax.service.JWTService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import org.springframework.http.MediaType;

@AutoConfigureMockMvc
@SpringBootTest
public class FinanceControllerTests {
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
    
    @Test
    public void testCreateBudget_WithValidToken_ReturnsSuccess() throws Exception {
        Map<String, Object> dataPayload = Map.of(
                "category", "food",
                "amount", 200
            );
        String jsonRequest = objectMapper.writeValueAsString(dataPayload);
        // 2. Perform the request, injecting the generated token into the header
        mockMvc.perform(post("/api/finance/createBudget")
            .header("Authorization", "Bearer " + token) // Using your JWT
            .contentType(MediaType.APPLICATION_JSON)    // Telling Spring this is JSON
            .content(jsonRequest))                      // Attaching the payload
            .andDo(org.springframework.test.web.servlet.result.MockMvcResultHandlers.print())
            .andExpect(status().isCreated())
            .andExpect(content().string("Budget created successfully"));
    }

}