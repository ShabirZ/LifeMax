package com.shabir.lifemax.repository.Finance;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shabir.lifemax.model.Transactions;
import com.shabir.lifemax.model.Users;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transactions, Integer> {
    boolean existsByCategoryAndUser_Uid(String category, UUID userUid);

}
