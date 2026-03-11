package com.shabir.lifemax.controller.Finance;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shabir.lifemax.dto.FinanceDTO.BudgetRequest;
import com.shabir.lifemax.model.UserPrincipal;
import com.shabir.lifemax.service.Finance.BudgetService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
@RestController
@RequestMapping("/api/finance")
public class BudgetController {

    private final BudgetService budgetService; 

    public BudgetController(BudgetService budgetService) {
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
    @DeleteMapping("/deleteBudget")
    public ResponseEntity<String> DeleteBudget(@RequestBody BudgetRequest budgetRequest, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean response = budgetService.deleteBudget(budgetRequest, userPrincipal.getUid());
        
        // return 400 if category does not exist, else return 201 (budget deleted)
        if (!response) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body("Category does not exist for this user");
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                            .body("Budget deleted successfully");
        
    }
    @PatchMapping("/updateBudget")
    public ResponseEntity<String> UpdateBudget(@RequestBody BudgetRequest budgetRequest, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        budgetService.updateBudget(budgetRequest, userPrincipal.getUid());
        return ResponseEntity.ok("Budget updated successfully");
        
    }
}
    


