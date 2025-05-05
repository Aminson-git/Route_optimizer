package com.routeoptimizer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptimizationResult {
    private List<String> countryCodes;  // Ordered list of country codes
    private List<Country> countries;    // Ordered list of countries with details
    private double totalDistance;       // Total distance in kilometers
    private int iterations;             // Number of iterations performed
    private long computationTime;       // Time taken to compute in milliseconds
}