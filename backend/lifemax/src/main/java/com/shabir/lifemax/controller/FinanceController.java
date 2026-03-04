package com.shabir.lifemax.controller;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.shabir.lifemax.model.UserPrincipal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.shabir.lifemax.dto.BudgetRequest;


import com.shabir.lifemax.service.BudgetService;
@RestController
@RequestMapping("/api/finance")
public class FinanceController {

    private final BudgetService budgetService; 

    public FinanceController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    
    @PostMapping("/createBudget")
    public ResponseEntity<String> CreateBudget(@RequestBody BudgetRequest budgetRequest, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean response = budgetService.createBudget(budgetRequest, userPrincipal.getUid());


        // return 400 if duplicate category, else return 201 (budget created)
        if (!response) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body("Category already exists for this user");
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                            .body("Budget created successfully");
        
    }
}
    


