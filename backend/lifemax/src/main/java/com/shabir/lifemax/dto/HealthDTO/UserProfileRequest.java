package com.shabir.lifemax.dto.HealthDTO;

import java.time.LocalDate;

public class UserProfileRequest {

    private LocalDate dateOfBirth;
    private String biologicalSex;
    private Double height;
    private Double currentWeight;
    private Double targetWeight;
    private String activityLevel;
    private String unitsPreference;

    public UserProfileRequest() {}

    public UserProfileRequest(LocalDate dateOfBirth, String biologicalSex, Double height,
                              Double currentWeight, Double targetWeight,
                              String activityLevel, String unitsPreference) {
        this.dateOfBirth = dateOfBirth;
        this.biologicalSex = biologicalSex;
        this.height = height;
        this.currentWeight = currentWeight;
        this.targetWeight = targetWeight;
        this.activityLevel = activityLevel;
        this.unitsPreference = unitsPreference;
    }

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
