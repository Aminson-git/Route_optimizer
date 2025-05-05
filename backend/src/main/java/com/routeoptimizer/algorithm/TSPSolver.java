package com.routeoptimizer.algorithm;

import com.routeoptimizer.model.Country;
import com.routeoptimizer.model.OptimizationResult;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Component
public class TSPSolver {
    private final Random random = new Random();

    /**
     * Solves the TSP problem using Simulated Annealing
     */
    public OptimizationResult optimizeRoute(List<Country> countries, int iterations) {
        long startTime = System.currentTimeMillis();
        
        // If fewer than 2 countries, just return the input
        if (countries.size() < 2) {
            return createResult(countries, 0, iterations, System.currentTimeMillis() - startTime);
        }

        // Build distance matrix
        int n = countries.size();
        double[][] distanceMatrix = new double[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    distanceMatrix[i][j] = 0;
                } else {
                    distanceMatrix[i][j] = countries.get(i).distanceTo(countries.get(j));
                    distanceMatrix[j][i] = distanceMatrix[i][j]; // Symmetric matrix
                }
            }
        }

        // Create initial tour (random permutation)
        ArrayList<Integer> currentTour = createInitialTour(n);
        
        // Apply Simulated Annealing algorithm
        double currentFitness = calculateFitness(currentTour, distanceMatrix);
        
        // Simulated Annealing parameters
        double initialTemperature = 1000.0;
        double finalTemperature = 0.01;
        double coolingRate = Math.pow(finalTemperature / initialTemperature, 1.0 / iterations);
        double currentTemperature = initialTemperature;
        
        for (int i = 0; i < iterations; i++) {
            // Cool down the temperature
            currentTemperature *= coolingRate;
            
            // Create a neighbor tour by swapping two cities
            ArrayList<Integer> newTour = smallChange(new ArrayList<>(currentTour));
            double newFitness = calculateFitness(newTour, distanceMatrix);
            
            // Decide whether to accept the new tour
            if (acceptanceProbability(currentFitness, newFitness, currentTemperature) > random.nextDouble()) {
                currentTour = newTour;
                currentFitness = newFitness;
            }
        }
        
        // Construct the optimized route
        List<Country> optimizedRoute = currentTour.stream()
                .map(countries::get)
                .collect(Collectors.toList());
        
        return createResult(optimizedRoute, currentFitness, iterations, System.currentTimeMillis() - startTime);
    }

    private ArrayList<Integer> createInitialTour(int n) {
        ArrayList<Integer> tour = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            tour.add(i);
        }
        Collections.shuffle(tour);
        return tour;
    }

    private double calculateFitness(List<Integer> tour, double[][] distanceMatrix) {
        double fitness = 0;
        int n = tour.size();
        
        for (int i = 0; i < n - 1; i++) {
            fitness += distanceMatrix[tour.get(i)][tour.get(i + 1)];
        }
        
        // Add distance from last to first city
        fitness += distanceMatrix[tour.get(n - 1)][tour.get(0)];
        
        return fitness;
    }

    private ArrayList<Integer> smallChange(ArrayList<Integer> tour) {
        int n = tour.size();
        int pos1 = random.nextInt(n);
        int pos2 = random.nextInt(n);
        
        // Swap the positions
        int temp = tour.get(pos1);
        tour.set(pos1, tour.get(pos2));
        tour.set(pos2, temp);
        
        return tour;
    }

    private double acceptanceProbability(double currentFitness, double newFitness, double temperature) {
        // If new solution is better, accept it
        if (newFitness < currentFitness) {
            return 1.0;
        }
        
        // If temperature is very low, reject worse solutions
        if (temperature < 0.0001) {
            return 0.0;
        }
        
        // Calculate acceptance probability
        return Math.exp((currentFitness - newFitness) / temperature);
    }

    private OptimizationResult createResult(List<Country> countries, double totalDistance, int iterations, long computationTime) {
        OptimizationResult result = new OptimizationResult();
        result.setCountries(countries);
        result.setCountryCodes(countries.stream().map(Country::getCode).collect(Collectors.toList()));
        result.setTotalDistance(totalDistance);
        result.setIterations(iterations);
        result.setComputationTime(computationTime);

        return result;
    }
  
  }