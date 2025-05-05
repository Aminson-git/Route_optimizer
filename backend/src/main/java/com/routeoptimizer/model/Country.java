package com.routeoptimizer.model;

import lombok.Data;

@Data
public class Country {
    private String code;
    private String name;
    private double latitude;
    private double longitude;
    
    // For calculating distances
    public double distanceTo(Country other) {
        // Haversine formula to calculate distance between two points on the Earth
        double earthRadius = 6371; // km
        
        double lat1 = Math.toRadians(this.latitude);
        double lon1 = Math.toRadians(this.longitude);
        double lat2 = Math.toRadians(other.latitude);
        double lon2 = Math.toRadians(other.longitude);
        
        double dlon = lon2 - lon1;
        double dlat = lat2 - lat1;
        
        double a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dlon / 2) * Math.sin(dlon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return earthRadius * c;
    }
}