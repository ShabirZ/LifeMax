package com.shabir.lifemax.model.Health;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shabir.lifemax.model.Users;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "body_measurements")
public class BodyMeasurements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "body_fat_percentage")
    private Double bodyFatPercentage;

    @Column(name = "waist_circumference")
    private Double waistCircumference;

    @Column(name = "chest")
    private Double chest;

    @Column(name = "arms")
    private Double arms;

    @Column(name = "thighs")
    private Double thighs;

    public BodyMeasurements() {}

    public BodyMeasurements(Users user, LocalDate date, Double bodyFatPercentage, Double waistCircumference,
                            Double chest, Double arms, Double thighs) {
        this.user = user;
        this.date = date;
        this.bodyFatPercentage = bodyFatPercentage;
        this.waistCircumference = waistCircumference;
        this.chest = chest;
        this.arms = arms;
        this.thighs = thighs;
    }

    public Integer getId() { return id; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Double getBodyFatPercentage() { return bodyFatPercentage; }
    public void setBodyFatPercentage(Double bodyFatPercentage) { this.bodyFatPercentage = bodyFatPercentage; }

    public Double getWaistCircumference() { return waistCircumference; }
    public void setWaistCircumference(Double waistCircumference) { this.waistCircumference = waistCircumference; }

    public Double getChest() { return chest; }
    public void setChest(Double chest) { this.chest = chest; }

    public Double getArms() { return arms; }
    public void setArms(Double arms) { this.arms = arms; }

    public Double getThighs() { return thighs; }
    public void setThighs(Double thighs) { this.thighs = thighs; }
}
