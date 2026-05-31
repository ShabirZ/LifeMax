package com.shabir.lifemax.model.Health;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shabir.lifemax.model.Users;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "supplements")
public class Supplements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "supplement_name", nullable = false)
    private String supplementName;

    @Column(name = "dosage_mg")
    private Double dosageMg;

    @Column(name = "time")
    private LocalTime time;

    public Supplements() {}

    public Supplements(Users user, LocalDate date, String supplementName, Double dosageMg, LocalTime time) {
        this.user = user;
        this.date = date;
        this.supplementName = supplementName;
        this.dosageMg = dosageMg;
        this.time = time;
    }

    public Integer getId() { return id; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getSupplementName() { return supplementName; }
    public void setSupplementName(String supplementName) { this.supplementName = supplementName; }

    public Double getDosageMg() { return dosageMg; }
    public void setDosageMg(Double dosageMg) { this.dosageMg = dosageMg; }

    public LocalTime getTime() { return time; }
    public void setTime(LocalTime time) { this.time = time; }
}
