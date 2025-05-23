import { useQueries, useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { useState, useEffect } from "react";

// Define common interfaces for data types
export interface DataItem {
  code: string;
  name: string;
}

// Mock API functions that return promises
export const fetchCities = async () => {
  // Increased delay to 1500ms (1.5 seconds)
  await new Promise((res) => setTimeout(res, 1500));
  return [
    { code: "BP", name: "Budapest" },
    { code: "DEB", name: "Debrecen" },
    { code: "SZEG", name: "Szeged" },
    { code: "GYOR", name: "Győr" },
  ];
};

export const fetchDamageTypes = async () => {
  // Increased delay to 2000ms (2 seconds)
  await new Promise((res) => setTimeout(res, 2000));
  return [
    { code: "SCREEN", name: "Képernyő törés" },
    { code: "WATER", name: "Beázás" },
    { code: "BATTERY", name: "Tönkrement akkumulátor" },
    { code: "THEFT", name: "Lopás" },
    { code: "OTHER", name: "Egyéb" },
  ];
};

// Individual hooks if needed separately
export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });
};

export const useDamageTypes = () => {
  return useQuery({
    queryKey: ["damageTypes"],
    queryFn: fetchDamageTypes,
  });
};

// Utility to simulate random errors (for testing error handling)
export const simulateError = (probability = 0) => {
  if (Math.random() < probability) {
    throw new Error("Simulated API error");
  }
};

// Additional mock API functions for demonstration purposes (to show variable number of queries)
export const fetchPhoneBrands = async () => {
  await new Promise((res) => setTimeout(res, 1800));

  // Uncomment to simulate random errors with 20% probability
  // simulateError(0.2);

  return [
    { code: "APPLE", name: "Apple" },
    { code: "SAMSUNG", name: "Samsung" },
    { code: "XIAOMI", name: "Xiaomi" },
    { code: "GOOGLE", name: "Google Pixel" },
  ];
};

export const fetchInsuranceTypes = async () => {
  await new Promise((res) => setTimeout(res, 2200));
  return [
    { code: "BASIC", name: "Alap" },
    { code: "MEDIUM", name: "Közepes" },
    { code: "PREMIUM", name: "Prémium" },
  ];
};

export const fetchPaymentOptions = async () => {
  await new Promise((res) => setTimeout(res, 1300));
  return [
    { code: "CARD", name: "Bankkártya" },
    { code: "TRANSFER", name: "Banki átutalás" },
    { code: "CASH", name: "Készpénz" },
  ];
};

// An array of all available queries for dynamic selection
const availableQueries = [
  { queryKey: ["cities"], queryFn: fetchCities, dataKey: "cities" },
  {
    queryKey: ["damageTypes"],
    queryFn: fetchDamageTypes,
    dataKey: "damageTypes",
  },
  {
    queryKey: ["phoneBrands"],
    queryFn: fetchPhoneBrands,
    dataKey: "phoneBrands",
  },
  {
    queryKey: ["insuranceTypes"],
    queryFn: fetchInsuranceTypes,
    dataKey: "insuranceTypes",
  },
  {
    queryKey: ["paymentOptions"],
    queryFn: fetchPaymentOptions,
    dataKey: "paymentOptions",
  },
];

// This hook handles a variable number of API requests in parallel and provides overall status
export const useParallelQueries = (queriesCount = 2) => {
  // Ensure we have between 2 and 5 queries
  const count = Math.max(2, Math.min(5, queriesCount));

  // Take the first 'count' queries from available queries
  const selectedQueries = availableQueries.slice(0, count);

  // Run the selected queries in parallel
  const queryResults = useQueries({
    queries: selectedQueries.map((query) => ({
      queryKey: query.queryKey,
      queryFn: query.queryFn,
    })),
  });

  const [status, setStatus] = useState<{
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    errorMessage: string | null;
  }>({
    isSuccess: false,
    isError: false,
    isLoading: true,
    errorMessage: null,
  });

  useEffect(() => {
    // Check if all queries are done loading
    const isLoading = queryResults.some((query) => query.isLoading);

    // Check if any query has an error
    const hasError = queryResults.some((query) => query.isError);

    // If all queries are done and no errors, mark as success
    const isSuccess =
      !isLoading && !hasError && queryResults.every((query) => query.isSuccess);

    // Collect error messages if any
    let errorMessage = null;
    if (hasError) {
      const errors = queryResults
        .filter((query) => query.error)
        .map(
          (query, index) =>
            `${selectedQueries[index].dataKey}: ${query.error?.message || "Unknown error"}`
        );
      errorMessage = errors.join(", ");
    }

    setStatus({
      isLoading,
      isError: hasError,
      isSuccess,
      errorMessage,
    });
  }, [queryResults, selectedQueries]);

  // Create a result object with all the data
  const result: any = {
    queries: queryResults,
    status,
  };

  // Add each query's data to the result using its dataKey
  selectedQueries.forEach((query, index) => {
    result[query.dataKey] = queryResults[index].data || [];
  });

  // Always include the first two queries for backward compatibility
  if (!result.cities) result.cities = [];
  if (!result.damageTypes) result.damageTypes = [];

  return result;
};
