package com.routeoptimizer.controller;

import com.routeoptimizer.model.Country;
import com.routeoptimizer.model.OptimizationResult;
import com.routeoptimizer.service.CountryService;
import com.routeoptimizer.service.RouteOptimizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowCredentials = "false") 
public class RouteController {
    
    private final CountryService countryService;
    private final RouteOptimizerService routeOptimizerService;
    
    @Autowired
    public RouteController(CountryService countryService, RouteOptimizerService routeOptimizerService) {
        this.countryService = countryService;
        this.routeOptimizerService = routeOptimizerService;
    }
    
    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }
    
    @GetMapping("/countries/{code}")
    public ResponseEntity<Country> getCountry(@PathVariable String code) {
        Country country = countryService.getCountryByCode(code);
        if (country == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(country);
    }
    
    @PostMapping("/optimize")
    public ResponseEntity<OptimizationResult> optimizeRoute(
            @RequestBody List<String> countryCodes,
            @RequestParam(defaultValue = "1000") int iterations) {
        
        if (countryCodes == null || countryCodes.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        OptimizationResult result = routeOptimizerService.optimizeRoute(countryCodes, iterations);
        return ResponseEntity.ok(result);
    }
}