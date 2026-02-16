package com.shabir.lifemax.model;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.time.LocalDateTime; 

/**
 * Asset Table
 * Tracks total finances:
 *  example: Robinhood portfolio : $10,000
 *  example: Bank of America checking account: $5,000
 *  example: silver: $2,000
 *  example: cash: $1,000
 * 
 * 
 * @author Shabir
 * @since 1.0
 */

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
