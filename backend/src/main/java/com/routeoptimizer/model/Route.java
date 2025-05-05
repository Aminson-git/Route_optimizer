package com.routeoptimizer.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Route {
    private List<Country> countries;
    private double totalDistance;
    
    public Route(List<Country> countries) {
        this.countries = countries;
        this.totalDistance = calculateTotalDistance();
    }
    
    private double calculateTotalDistance() {
        double distance = 0;
        
        for (int i = 0; i < countries.size() - 1; i++) {
            distance += countries.get(i).distanceTo(countries.get(i + 1));
        }
        
        // Add distance from last to first country (returning to origin)
        if (countries.size() > 1) {
            distance += countries.get(countries.size() - 1).distanceTo(countries.get(0));
        }
        
        return distance;
    }
}