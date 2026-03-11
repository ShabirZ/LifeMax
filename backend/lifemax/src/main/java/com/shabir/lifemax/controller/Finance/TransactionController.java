package com.shabir.lifemax.controller.Finance;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shabir.lifemax.dto.FinanceDTO.TransactionRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.shabir.lifemax.model.UserPrincipal;
import com.shabir.lifemax.service.Finance.TransactionService;

@RestController
@RequestMapping("/api/finance")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/createTransaction")
    public ResponseEntity<String> postMethodName(@RequestBody TransactionRequest transactionRequest,  @AuthenticationPrincipal UserPrincipal userPrincipal) {
        System.out.println("Received transaction request: " + transactionRequest);
        transactionService.createTransaction(transactionRequest, userPrincipal.getUid());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                            .body("Transaction created successfully");
    }
    
}
