package com.shabir.lifemax.controller.Finance;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.shabir.lifemax.dto.FinanceDTO.CsvImportResponse;
import com.shabir.lifemax.dto.FinanceDTO.TransactionRequest;
import com.shabir.lifemax.dto.FinanceDTO.UpdateTransactionRequest;
import com.shabir.lifemax.dto.FinanceDTO.WeeklySpendingEntry;
import com.shabir.lifemax.model.Transactions;
import com.shabir.lifemax.model.UserPrincipal;
import com.shabir.lifemax.service.Finance.CsvImportService;
import com.shabir.lifemax.service.Finance.TransactionService;

import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;


@RestController
@RequestMapping("/api/finance")
public class TransactionController {

    private final TransactionService transactionService;
    private final CsvImportService csvImportService;

    public TransactionController(TransactionService transactionService, CsvImportService csvImportService) {
        this.transactionService = transactionService;
        this.csvImportService = csvImportService;
    }

    @PostMapping("/createTransaction")
    public ResponseEntity<String> createTransaction(@RequestBody TransactionRequest transactionRequest,
                                                    @AuthenticationPrincipal UserPrincipal userPrincipal) {
        transactionService.createTransaction(transactionRequest, userPrincipal.getUid());
        return ResponseEntity.status(HttpStatus.CREATED).body("Transaction created successfully");
    }

    @GetMapping("/getTransactions")
    public ResponseEntity<List<Transactions>> getTransactions(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<Transactions> transactions = (start != null && end != null)
                ? transactionService.getTransactionsByDateRange(userPrincipal.getUid(), start, end)
                : transactionService.getTransactions(userPrincipal.getUid());
        return ResponseEntity.ok(transactions);
    }

    @PatchMapping("/updateTransaction")
    public ResponseEntity<String> updateTransaction(@RequestBody UpdateTransactionRequest request,
                                                    @AuthenticationPrincipal UserPrincipal userPrincipal) {
        transactionService.updateTransaction(request, userPrincipal.getUid());
        return ResponseEntity.ok("Transaction updated successfully");
    }

    @PostMapping(value = "/importTransactions", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CsvImportResponse> importTransactions(@RequestParam("file") MultipartFile file,
                                                                @AuthenticationPrincipal UserPrincipal userPrincipal) {
        CsvImportResponse result = csvImportService.importTransactions(file, userPrincipal.getUid());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/weeklySpending")
    public ResponseEntity<List<WeeklySpendingEntry>> getWeeklySpending(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(transactionService.getWeeklySpending(userPrincipal.getUid()));
    }
    
}
