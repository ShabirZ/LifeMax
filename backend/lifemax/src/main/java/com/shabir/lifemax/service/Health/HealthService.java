package com.shabir.lifemax.service.Health;

import com.shabir.lifemax.dto.HealthDTO.UserProfileRequest;
import com.shabir.lifemax.dto.HealthDTO.UserProfileResponse;
import com.shabir.lifemax.model.Health.UserProfile;
import com.shabir.lifemax.model.Users;
import com.shabir.lifemax.repository.Health.ProfileRepository;
import com.shabir.lifemax.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;


@Service
public class HealthService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public HealthService(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public UserProfileResponse getHealthProfile(UUID uid) {
        Users user = userRepository.findByUid(uid);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        return profileRepository.findByUser_Uid(uid)
                .map(UserProfileResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Health profile not found"));
    }
    @Transactional
    public boolean setUserProfile(UUID uid, UserProfileRequest request) {
        Users user = userRepository.findByUid(uid);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        UserProfile profile = profileRepository.findByUser_Uid(uid)
                .orElseGet(() -> { UserProfile p = new UserProfile(); p.setUser(user); return p; });

        applyRequest(profile, request);
        profileRepository.save(profile);
        return true;
    }

    private void applyRequest(UserProfile profile, UserProfileRequest request) {
        if (request.getDateOfBirth()     != null) profile.setDateOfBirth(request.getDateOfBirth());
        if (request.getBiologicalSex()   != null) profile.setBiologicalSex(request.getBiologicalSex());
        if (request.getHeight()          != null) profile.setHeight(request.getHeight());
        if (request.getCurrentWeight()   != null) profile.setCurrentWeight(request.getCurrentWeight());
        if (request.getTargetWeight()    != null) profile.setTargetWeight(request.getTargetWeight());
        if (request.getActivityLevel()   != null) profile.setActivityLevel(request.getActivityLevel());
        if (request.getUnitsPreference() != null) profile.setUnitsPreference(request.getUnitsPreference());
    }
}
