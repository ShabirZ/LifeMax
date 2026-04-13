package com.shabir.lifemax.service.Finance;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.shabir.lifemax.util.StringUtils;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;

import java.util.List;


@Service
public class LlmCategorizationService {

    @Value("${gemini.api.key}")
    private String apiKey;

    /**
     * Given a transaction description and list of existing budget categories,
     * returns either an exact category name or "NEW: <suggested name>" if none fit.
     */
    public String categorize(String description, List<String> existingCategories) {
        if (existingCategories.isEmpty()) {
            return "NEW: " + suggestCategoryName(description);
        }

        String categoriesList = String.join(", ", existingCategories);
        String prompt = "You are categorizing a bank transaction.\n\n"
                + "Transaction description: \"" + description + "\"\n\n"
                + "Existing categories: " + categoriesList + "\n\n"
                + "Instructions:\n"
                + "- If the transaction clearly belongs to one of the existing categories, reply with ONLY that exact category name.\n"
                + "- If the transaction does not clearly fit an existing category, reply with \"NEW: <name>\" "
                + "where <name> is a short (1-3 words) descriptive category name.\n"
                + "- Do NOT force-fit a transaction into an existing category just because the list is small. "
                + "It is perfectly fine to create a new category.\n"
                + "- Reply with ONLY the category name or NEW: <name>. No explanation.";

        try {
            Client client = Client.builder().apiKey(apiKey).build();
            GenerateContentConfig config = GenerateContentConfig.builder()
                    .maxOutputTokens(20)
                    .temperature(0.0f)
                    .build();
            GenerateContentResponse response = client.models.generateContent(
                    "gemini-2.0-flash", prompt, config);

            String text = response.text();
            if (text == null || text.isBlank()) {
                System.err.println("LLM returned empty response for: " + description);
                return existingCategories.get(0);
            }
            return StringUtils.capitalizeWords(text.trim());

        } catch (Exception e) {
            System.err.println("LLM categorization failed for \"" + description + "\": "
                    + e.getClass().getSimpleName() + " - " + e.getMessage());
            return existingCategories.get(0);
        }
    }

    private String suggestCategoryName(String description) {
        String[] words = description.split("\\s+");
        if (words.length >= 2) {
            return words[0] + " " + words[1];
        }
        return words.length > 0 ? words[0] : "Uncategorized";
    }
}
