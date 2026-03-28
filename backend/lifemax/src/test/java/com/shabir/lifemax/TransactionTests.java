package com.shabir.lifemax;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import com.shabir.lifemax.service.JWTService;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
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

    @BeforeEach
    public void setup() {
        token = jwtService.generateToken(testUid);
    }

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
            .andDo(print())
            .andExpect(status().isCreated())
            .andExpect(content().string("Transaction created successfully"));
    }

    @Test
    public void GetTransactionsTest() throws Exception {
        mockMvc.perform(get("/api/finance/getTransactions")
            .header("Authorization", "Bearer " + token))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray());
    }

    @Test
    @SuppressWarnings("unchecked")
    public void UpdateTransactionTest() throws Exception {
        // 1. Create a transaction to update
        Map<String, Object> createPayload = Map.of(
                "amount", 50.00,
                "category", "food",
                "description", "Dinner at Olive Garden",
                "transactionDate", "2026-03-15"
            );
        mockMvc.perform(post("/api/finance/createTransaction")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(createPayload)))
            .andExpect(status().isCreated());

        // 2. GET transactions and extract the ID of the one we just created
        MvcResult getResult = mockMvc.perform(get("/api/finance/getTransactions")
            .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andReturn();

        List<Map<String, Object>> transactions = objectMapper.readValue(
                getResult.getResponse().getContentAsString(), List.class);

        Integer transactionId = transactions.stream()
                .filter(t -> "Dinner at Olive Garden".equals(t.get("description")))
                .map(t -> (Integer) t.get("transactionId"))
                .findFirst()
                .orElseThrow(() -> new AssertionError("Created transaction not found in GET response"));

        // 3. Update the transaction
        Map<String, Object> updatePayload = Map.of(
                "transactionId", transactionId,
                "amount", 65.00,
                "description", "Dinner at Olive Garden (updated)"
            );
        mockMvc.perform(patch("/api/finance/updateTransaction")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(updatePayload)))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string("Transaction updated successfully"));
    }

    @Test
    public void ImportTransactionsTest() throws Exception {
        // CSV contains one row with a description that matches an existing transaction
        // ("Lunch at Chipotle" was created in CreateTransactionTest or may already exist),
        // so the import uses description-matching and skips the LLM call.
        String csvContent = "Details,Posting Date,Description,Amount,Type,Balance,Check or Slip #\n"
                + "DEBIT,03/20/2026,Lunch at Chipotle,-12.50,MISC_DEBIT,500.00,";

        MockMultipartFile csvFile = new MockMultipartFile(
                "file", "transactions.csv", "text/csv", csvContent.getBytes());

        mockMvc.perform(multipart("/api/finance/importTransactions")
            .file(csvFile)
            .header("Authorization", "Bearer " + token))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.transactionsCreated").value(1))
            .andExpect(jsonPath("$.errors").isArray());
    }
}
