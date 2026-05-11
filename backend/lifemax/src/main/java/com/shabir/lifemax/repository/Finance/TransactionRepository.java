package com.shabir.lifemax.repository.Finance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.shabir.lifemax.model.Transactions;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transactions, Integer> {
    boolean existsByCategoryAndUser_Uid(String category, UUID userUid);
    Optional<Transactions> findByTransactionIdAndUser_Uid(Integer transactionId, UUID userUid);
    List<Transactions> findByUser_Uid(UUID userUid);
    Optional<Transactions> findFirstByDescriptionAndUser_Uid(String description, UUID userUid);
    List<Transactions> findByUser_UidAndTransactionDateBetween(UUID userUid, LocalDate start, LocalDate end);

    @Modifying
    @Query("UPDATE Transactions t SET t.category = :newCategory WHERE t.category = :oldCategory AND t.user.uid = :userId")
    void updateCategoryForUser(@Param("newCategory") String newCategory, @Param("oldCategory") String oldCategory, @Param("userId") UUID userId);
}
