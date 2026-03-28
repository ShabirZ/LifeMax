package com.shabir.lifemax.service.Finance;

import com.shabir.lifemax.dto.FinanceDTO.TransactionRequest;
import com.shabir.lifemax.dto.FinanceDTO.UpdateTransactionRequest;
import com.shabir.lifemax.repository.Finance.BudgetRepository;
import com.shabir.lifemax.repository.UserRepository;
import com.shabir.lifemax.repository.Finance.TransactionRepository;
import com.shabir.lifemax.model.Transactions;
import com.shabir.lifemax.model.Users;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository, BudgetRepository budgetRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.budgetRepository = budgetRepository;
    }

    public void createTransaction(TransactionRequest request, UUID userId) {
        if (!this.budgetRepository.existsByCategoryNameAndUserUid(request.getCategory(), userId)) {
            throw new IllegalArgumentException("Budget category not found for user: " + userId);
        }
        Users userProxy = userRepository.getReferenceById(userId);

        Transactions newTransaction = new Transactions();
        newTransaction.setAmount(request.getAmount());
        newTransaction.setCategory(request.getCategory());
        newTransaction.setDescription(request.getDescription());
        newTransaction.setTransactionDate(request.getTransactionDate());
        newTransaction.setUser(userProxy);

        this.transactionRepository.save(newTransaction);
    }

    public List<Transactions> getTransactions(UUID userId) {
        return transactionRepository.findByUser_Uid(userId);
    }

    public void updateTransaction(UpdateTransactionRequest request, UUID userId) {
        Transactions existing = transactionRepository
                .findByTransactionIdAndUser_Uid(request.getTransactionId(), userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));

        if (request.getCategory() != null && !request.getCategory().equals(existing.getCategory())) {
            if (!budgetRepository.existsByCategoryNameAndUserUid(request.getCategory(), userId)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Budget category not found: " + request.getCategory());
            }
            existing.setCategory(request.getCategory());
        }
        if (request.getAmount() != null) {
            existing.setAmount(request.getAmount());
        }
        if (request.getDescription() != null) {
            existing.setDescription(request.getDescription());
        }
        if (request.getTransactionDate() != null) {
            existing.setTransactionDate(request.getTransactionDate());
        }

        transactionRepository.save(existing);
    }
}
