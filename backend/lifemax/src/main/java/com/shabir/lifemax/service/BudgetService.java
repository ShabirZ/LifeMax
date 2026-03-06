package com.shabir.lifemax.service;

import org.springframework.stereotype.Service;
import java.util.UUID;

import com.shabir.lifemax.model.Budget;
import com.shabir.lifemax.model.Users;

import com.shabir.lifemax.repository.BudgetRepository;
import com.shabir.lifemax.repository.UserRepository;

import com.shabir.lifemax.dto.BudgetRequest;
import jakarta.transaction.Transactional;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetService(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    public boolean createBudget(BudgetRequest request, UUID userId) {
        
        Users userProxy = userRepository.getReferenceById(userId);

        if (budgetRepository.existsByCategoryNameAndUserUid(request.getCategory(), userId)) {
            return false; 
        }
        Budget newBudget = new Budget(
            request.getCategory(), 
            request.getAmount(), 
            userProxy
        );

        budgetRepository.save(newBudget);
        return true;
    }

    @Transactional
    public boolean deleteBudget(BudgetRequest request, UUID userId) {
        // 1. Check if it exists first
        if (!budgetRepository.existsByCategoryNameAndUserUid(request.getCategory(), userId)) {
            System.out.println("Budget category not found for user: " + userId);
            return false; 
        }
    
        // 2. Perform the delete directly
        budgetRepository.deleteByCategoryNameAndUserUid(request.getCategory(), userId);
        return true;
    }
}