
package com.routeoptimizer.service;

import com.routeoptimizer.algorithm.TSPSolver;
import com.routeoptimizer.model.Country;
import com.routeoptimizer.model.OptimizationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteOptimizerService {
    
    private final CountryService countryService;
    private final TSPSolver tspSolver;
    
    @Autowired
    public RouteOptimizerService(CountryService countryService, TSPSolver tspSolver) {
        this.countryService = countryService;
        this.tspSolver = tspSolver;
    }
    
    public OptimizationResult optimizeRoute(List<String> countryCodes, int iterations) {
        List<Country> countries = countryService.getCountriesByCodes(countryCodes);
        
        // Apply the TSP solver algorithm to find the optimal route
        return tspSolver.optimizeRoute(countries, iterations);
    }
}