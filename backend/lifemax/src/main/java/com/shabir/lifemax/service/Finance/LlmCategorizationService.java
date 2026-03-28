package com.shabir.lifemax.service.Finance;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LlmCategorizationService {

    @Value("${anthropic.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String API_URL = "https://api.anthropic.com/v1/messages";

    /**
     * Given a transaction description and list of existing budget categories,
     * returns either an exact category name or "NEW: <suggested name>" if none fit.
     */
    @SuppressWarnings("unchecked")
    public String categorize(String description, List<String> existingCategories) {
        if (existingCategories.isEmpty()) {
            return "NEW: " + suggestCategoryName(description);
        }

        String categoriesList = String.join(", ", existingCategories);
        String prompt = "Given this bank transaction description: \"" + description + "\", "
                + "assign it to one of these budget categories: " + categoriesList + ". "
                + "Reply with ONLY the exact category name. "
                + "If none of the categories are a reasonable match, reply with \"NEW: <suggested category name>\" "
                + "where you suggest a short, descriptive category name (2-3 words max).";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("x-api-key", apiKey);
            headers.set("anthropic-version", "2023-06-01");

            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            Map<String, Object> body = new HashMap<>();
            body.put("model", "claude-haiku-4-5-20251001");
            body.put("max_tokens", 50);
            body.put("messages", List.of(message));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            Map<String, Object> response = restTemplate.postForObject(API_URL, entity, Map.class);

            List<Map<String, Object>> content = (List<Map<String, Object>>) response.get("content");
            String result = ((String) content.get(0).get("text")).trim();
            return result;

        } catch (Exception e) {
            System.err.println("LLM categorization failed for description \"" + description + "\": " + e.getMessage());
            return "NEW: Uncategorized";
        }
    }

    private String suggestCategoryName(String description) {
        // Simple fallback: take first meaningful word(s) from description
        String[] words = description.split("\\s+");
        if (words.length >= 2) {
            return words[0] + " " + words[1];
        }
        return words.length > 0 ? words[0] : "Uncategorized";
    }
}
