package com.shabir.lifemax.service.Finance;
import com.shabir.lifemax.dto.FinanceDTO.TransactionRequest;
import com.shabir.lifemax.repository.Finance.BudgetRepository;
import com.shabir.lifemax.repository.UserRepository;
import com.shabir.lifemax.repository.Finance.TransactionRepository;
import com.shabir.lifemax.model.Transactions;
import com.shabir.lifemax.model.Users;
import java.util.UUID;
import org.springframework.stereotype.Service;

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
}
