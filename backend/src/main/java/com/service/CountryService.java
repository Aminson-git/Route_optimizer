package com.routeoptimizer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.routeoptimizer.model.Country;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CountryService {
    
    private Map<String, Country> countryMap = new HashMap<>();
    private List<Country> allCountries = new ArrayList<>();
    
    @PostConstruct
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is = getClass().getResourceAsStream("/data/countries.json");
            Country[] countries = mapper.readValue(is, Country[].class);
            
            for (Country country : countries) {
                countryMap.put(country.getCode(), country);
            }
            
            allCountries = new ArrayList<>(countryMap.values());
        } catch (Exception e) {
            throw new RuntimeException("Failed to load country data", e);
        }
    }
    
    public List<Country> getAllCountries() {
        return allCountries;
    }
    
    public Country getCountryByCode(String code) {
        return countryMap.get(code);
    }
    
    public List<Country> getCountriesByCodes(List<String> codes) {
        return codes.stream()
        .map(code -> this.getCountryByCode(code))
                .collect(Collectors.toList());
    }
}