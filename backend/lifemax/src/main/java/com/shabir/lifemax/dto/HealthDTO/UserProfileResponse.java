package com.shabir.lifemax.dto.HealthDTO;

import com.shabir.lifemax.model.Health.UserProfile;
import java.time.LocalDate;

public class UserProfileResponse {

    private Integer id;
    private LocalDate dateOfBirth;
    private String biologicalSex;
    private Double height;
    private Double currentWeight;
    private Double targetWeight;
    private String activityLevel;
    private String unitsPreference;

    public UserProfileResponse() {}

    public static UserProfileResponse from(UserProfile profile) {
        UserProfileResponse res = new UserProfileResponse();
        res.id               = profile.getId();
        res.dateOfBirth      = profile.getDateOfBirth();
        res.biologicalSex    = profile.getBiologicalSex();
        res.height           = profile.getHeight();
        res.currentWeight    = profile.getCurrentWeight();
        res.targetWeight     = profile.getTargetWeight();
        res.activityLevel    = profile.getActivityLevel();
        res.unitsPreference  = profile.getUnitsPreference();
        return res;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getBiologicalSex() { return biologicalSex; }
    public void setBiologicalSex(String biologicalSex) { this.biologicalSex = biologicalSex; }

    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }

    public Double getCurrentWeight() { return currentWeight; }
    public void setCurrentWeight(Double currentWeight) { this.currentWeight = currentWeight; }

    public Double getTargetWeight() { return targetWeight; }
    public void setTargetWeight(Double targetWeight) { this.targetWeight = targetWeight; }

    public String getActivityLevel() { return activityLevel; }
    public void setActivityLevel(String activityLevel) { this.activityLevel = activityLevel; }

    public String getUnitsPreference() { return unitsPreference; }
    public void setUnitsPreference(String unitsPreference) { this.unitsPreference = unitsPreference; }
}
