package com.shabir.lifemax.model;
import java.io.Serializable;
import java.util.Objects;

public class AssetId implements Serializable {
    private Users user;
    private String assetName;

    public AssetId() {}

    public AssetId(Users user, String assetName) {
        this.user = user;
        this.assetName = assetName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AssetId assetId = (AssetId) o;
        return Objects.equals(user, assetId.user) && 
               Objects.equals(assetName, assetId.assetName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, assetName);
    }
}