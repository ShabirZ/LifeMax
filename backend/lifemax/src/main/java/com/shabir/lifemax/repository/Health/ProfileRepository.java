package com.shabir.lifemax.repository.Health;

import com.shabir.lifemax.model.Health.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface ProfileRepository extends JpaRepository<UserProfile, Integer> {
    Optional<UserProfile> findByUser_Uid(UUID uid);
    
}
