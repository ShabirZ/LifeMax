package com.shabir.lifemax.model.Health;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shabir.lifemax.model.Users;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sleep")
public class Sleep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "bedtime")
    private LocalTime bedtime;

    @Column(name = "wake_time")
    private LocalTime wakeTime;

    @Column(name = "duration_hours")
    private Double durationHours;

    // 1–10 scale
    @Column(name = "quality_rating")
    private Integer qualityRating;

    public Sleep() {}

    public Sleep(Users user, LocalDate date, LocalTime bedtime, LocalTime wakeTime,
                 Double durationHours, Integer qualityRating) {
        this.user = user;
        this.date = date;
        this.bedtime = bedtime;
        this.wakeTime = wakeTime;
        this.durationHours = durationHours;
        this.qualityRating = qualityRating;
    }

    public Integer getId() { return id; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getBedtime() { return bedtime; }
    public void setBedtime(LocalTime bedtime) { this.bedtime = bedtime; }

    public LocalTime getWakeTime() { return wakeTime; }
    public void setWakeTime(LocalTime wakeTime) { this.wakeTime = wakeTime; }

    public Double getDurationHours() { return durationHours; }
    public void setDurationHours(Double durationHours) { this.durationHours = durationHours; }

    public Integer getQualityRating() { return qualityRating; }
    public void setQualityRating(Integer qualityRating) { this.qualityRating = qualityRating; }
}
