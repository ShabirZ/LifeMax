package com.shabir.lifemax.repository.Finance;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shabir.lifemax.model.Transactions;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transactions, Integer> {
    boolean existsByCategoryAndUser_Uid(String category, UUID userUid);
    Optional<Transactions> findByTransactionIdAndUser_Uid(Integer transactionId, UUID userUid);
    List<Transactions> findByUser_Uid(UUID userUid);
    Optional<Transactions> findFirstByDescriptionAndUser_Uid(String description, UUID userUid);
}
