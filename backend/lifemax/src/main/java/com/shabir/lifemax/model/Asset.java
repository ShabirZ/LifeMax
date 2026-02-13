package com.shabir.lifemax.model;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.time.LocalDateTime; 

@Entity
@Table(name = "assets")
@IdClass(AssetId.class)
public class Asset {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user; 

    @Id
    @Column(name = "asset_name", nullable = false)
    private String assetName; 

    @Column(name = "asset_value", nullable = false)
    private Long assetValue;

    @UpdateTimestamp
    private LocalDateTime lastUpdated;
    public Asset() {}
    public Asset(Users user, String assetName, Long assetValue) {
        this.user = user;
        this.assetName = assetName;
        this.assetValue = assetValue;
    }
    
    public Users getUser() {
        return user;
    }
    public void setUser(Users user) {
        this.user = user;
    }
    public String getAssetName() {
        return assetName;
    }
    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }
    public Long getAssetValue() {
        return assetValue;
    }
    public void setAssetValue(Long assetValue) {
        this.assetValue = assetValue;
    }
}
