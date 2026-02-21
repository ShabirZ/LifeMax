package com.shabir.lifemax.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.shabir.lifemax.model.Users;

public interface UserRepository extends JpaRepository<Users, UUID> {
    Users findByEmail(String email);
}
