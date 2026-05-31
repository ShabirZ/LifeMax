package com.shabir.lifemax.model.Health;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shabir.lifemax.model.Users;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "calorie_tracking")
public class CalorieTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    // breakfast / lunch / dinner / snack
    @Column(name = "meal_type", nullable = false)
    private String mealType;

    @Column(name = "meal_name", nullable = false)
    private String mealName;

    @Column(name = "time")
    private LocalTime time;

    @Column(name = "estimated_calories")
    private Integer estimatedCalories;

    @Column(name = "protein")
    private Double protein;

    @Column(name = "carbs")
    private Double carbs;

    @Column(name = "fat")
    private Double fat;

    public CalorieTracking() {}

    public CalorieTracking(Users user, LocalDate date, String mealType, String mealName,
                           LocalTime time, Integer estimatedCalories, Double protein, Double carbs, Double fat) {
        this.user = user;
        this.date = date;
        this.mealType = mealType;
        this.mealName = mealName;
        this.time = time;
        this.estimatedCalories = estimatedCalories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
    }

    public Integer getId() { return id; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

    public String getMealName() { return mealName; }
    public void setMealName(String mealName) { this.mealName = mealName; }

    public LocalTime getTime() { return time; }
    public void setTime(LocalTime time) { this.time = time; }

    public Integer getEstimatedCalories() { return estimatedCalories; }
    public void setEstimatedCalories(Integer estimatedCalories) { this.estimatedCalories = estimatedCalories; }

    public Double getProtein() { return protein; }
    public void setProtein(Double protein) { this.protein = protein; }

    public Double getCarbs() { return carbs; }
    public void setCarbs(Double carbs) { this.carbs = carbs; }

    public Double getFat() { return fat; }
    public void setFat(Double fat) { this.fat = fat; }
}
