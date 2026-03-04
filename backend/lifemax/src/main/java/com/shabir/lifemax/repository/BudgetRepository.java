package com.shabir.lifemax.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.shabir.lifemax.model.Budget;
import com.shabir.lifemax.model.Users;
import java.util.List;
import java.util.UUID;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUser(Users user);
    boolean existsByCategoryNameAndUserUid(String categoryName, UUID userUid);
}
