package com.shabir.lifemax.service.Finance;

import com.shabir.lifemax.dto.FinanceDTO.BudgetRequest;
import com.shabir.lifemax.dto.FinanceDTO.CsvImportResponse;
import com.shabir.lifemax.dto.FinanceDTO.TransactionRequest;
import com.shabir.lifemax.model.Budget;
import com.shabir.lifemax.repository.Finance.BudgetRepository;
import com.shabir.lifemax.repository.Finance.TransactionRepository;
import com.shabir.lifemax.repository.UserRepository;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CsvImportService {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("MM/dd/yyyy");

    private final TransactionService transactionService;
    private final BudgetService budgetService;
    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final LlmCategorizationService llmCategorizationService;

    public CsvImportService(TransactionService transactionService,
                             BudgetService budgetService,
                             BudgetRepository budgetRepository,
                             TransactionRepository transactionRepository,
                             UserRepository userRepository,
                             LlmCategorizationService llmCategorizationService) {
        this.transactionService = transactionService;
        this.budgetService = budgetService;
        this.budgetRepository = budgetRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.llmCategorizationService = llmCategorizationService;
    }

    public CsvImportResponse importTransactions(MultipartFile file, UUID userId) {
        int transactionsCreated = 0;
        int budgetsCreated = 0;
        List<String> errors = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                     .builder()
                     .setHeader("Details", "Posting Date", "Description", "Amount", "Type", "Balance", "Check or Slip #", "Category")
                     .setSkipHeaderRecord(true)
                     .setTrim(true)
                     .build())) {

            for (CSVRecord record : csvParser) {
                try {
                    String description = record.get("Description");
                    String amountStr = record.get("Amount");
                    String dateStr = record.get("Posting Date");

                    BigDecimal amount = new BigDecimal(amountStr);
                    LocalDate date = LocalDate.parse(dateStr, DATE_FORMAT);

                    String providedCategory = null;
                    try {
                        String val = record.get("Category");
                        if (val != null && !val.isBlank()) providedCategory = val.trim();
                    } catch (IllegalArgumentException ignored) {
                        // Column not present in this file
                    }

                    String category = (providedCategory != null)
                            ? providedCategory
                            : resolveCategory(description, userId, errors);

                    // Create budget if it doesn't exist yet
                    BigDecimal defaultBudgetLimit = new BigDecimal("100"); // Default limit for new categories
                    boolean budgetCreated = budgetService.createBudget(
                            new BudgetRequest(defaultBudgetLimit, category), userId);
                    if (budgetCreated) {
                        budgetsCreated++;
                    }

                    transactionService.createTransaction(
                            new TransactionRequest(amount, category, description, date), userId);
                    transactionsCreated++;

                } catch (Exception e) {
                    errors.add("Row " + csvParser.getCurrentLineNumber() + ": " + e.getMessage());
                }
            }

        } catch (Exception e) {
            errors.add("Failed to parse CSV: " + e.getMessage());
        }

        return new CsvImportResponse(transactionsCreated, budgetsCreated, errors);
    }

    private String resolveCategory(String description, UUID userId, List<String> errors) {
        // 1. Check if we've seen this description before for this user
        var existingTransaction = transactionRepository.findFirstByDescriptionAndUser_Uid(description, userId);
        if (existingTransaction.isPresent()) {
            return existingTransaction.get().getCategory();
        }

        // 2. Get all existing budget categories for this user
        var userRef = userRepository.getReferenceById(userId);
        List<String> categoryNames = budgetRepository.findByUser(userRef)
                .stream()
                .map(Budget::getCategoryName)
                .collect(Collectors.toList());

        // 3. Ask the LLM to match or suggest a new category
        String llmResult = llmCategorizationService.categorize(description, categoryNames);

        if (llmResult.startsWith("NEW: ")) {
            return llmResult.substring(5).trim();
        }
        return llmResult;
    }
}
