package com.shabir.lifemax.model.Health;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shabir.lifemax.model.Users;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_profile", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id"})
})
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "biological_sex")
    private String biologicalSex;

    @Column(name = "height")
    private Double height;

    @Column(name = "current_weight")
    private Double currentWeight;

    @Column(name = "target_weight")
    private Double targetWeight;

    @Column(name = "activity_level")
    private String activityLevel;

    @Column(name = "units_preference")
    private String unitsPreference;

    public UserProfile() {}

    public UserProfile(Users user, LocalDate dateOfBirth, String biologicalSex, Double height,
                       Double currentWeight, Double targetWeight, String activityLevel, String unitsPreference) {
        this.user = user;
        this.dateOfBirth = dateOfBirth;
        this.biologicalSex = biologicalSex;
        this.height = height;
        this.currentWeight = currentWeight;
        this.targetWeight = targetWeight;
        this.activityLevel = activityLevel;
        this.unitsPreference = unitsPreference;
    }

    public Integer getId() { return id; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

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
