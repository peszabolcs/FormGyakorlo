# Parallel API Queries Implementation

This document explains the detailed implementation of parallel API queries in the Formik Practice application. It covers how multiple API queries are executed in parallel, their state management, error handling, and user interface integration.

## Table of Contents

1. [Overview](#overview)
2. [Implementation Steps](#implementation-steps)
3. [Code Structure](#code-structure)
4. [Flow Diagram](#flow-diagram)
5. [API Query Types](#api-query-types)
6. [Error Handling](#error-handling)
7. [UI Integration](#ui-integration)

## Overview

The application implements a pattern for executing multiple API requests in parallel, managing their collective state, and providing feedback to the user. Instead of sequential API calls that could block each other if one fails, this implementation runs all API calls independently and concurrently.

Key features:

- Parallel API execution (between 2-5 queries)
- Combined loading state management
- Centralized error handling
- Success feedback (200 OK)
- Typed response data

## Implementation Steps

Here's a step-by-step breakdown of how the parallel queries functionality works:

1. **Define Data Structure**

   - Create a common `DataItem` interface to ensure type safety
   - Each API response adheres to the same shape: `{ code: string, name: string }`

2. **Create Mock API Functions**

   - Each data type has its own fetch function (fetchCities, fetchDamageTypes, etc.)
   - Each function simulates a network delay using setTimeout
   - Functions can optionally simulate errors for testing

3. **Configure Available Queries**

   - Define an array of available query configurations
   - Each configuration includes queryKey, queryFn, and dataKey

4. **Create the useParallelQueries Hook**

   - Accept a parameter for the number of queries to run (2-5)
   - Use TanStack Query's `useQueries` hook to run multiple queries in parallel
   - Track loading, error, and success states across all queries
   - Combine results into a single response object

5. **Integrate with React Components**
   - Components use the hook to get data and status
   - UI reflects loading state with spinners
   - Success and error notifications appear based on combined status

## Code Structure

### Data Interface (`mockApi.ts`)

```typescript
// Define common interfaces for data types
export interface DataItem {
  code: string;
  name: string;
}
```

### Mock API Functions (`mockApi.ts`)

```typescript
// Example of one API function
export const fetchCities = async () => {
  await new Promise((res) => setTimeout(res, 1500));
  return [
    { code: "BP", name: "Budapest" },
    { code: "DEB", name: "Debrecen" },
    { code: "SZEG", name: "Szeged" },
    { code: "GYOR", name: "Győr" },
  ];
};

// Additional API functions follow same pattern:
// - fetchDamageTypes
// - fetchPhoneBrands
// - fetchInsuranceTypes
// - fetchPaymentOptions
```

### Available Queries Configuration (`mockApi.ts`)

```typescript
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
```

### useParallelQueries Hook Implementation (`mockApi.ts`)

```typescript
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
  const result = {
    queries: queryResults,
    status,
  };

  // Add each query's data to the result using its dataKey
  selectedQueries.forEach((query, index) => {
    result[query.dataKey] = queryResults[index].data || [];
  });

  return result;
};
```

### Component Implementation (`FormPage2.tsx`)

```typescript
function FormPage2() {
  // Other component code...

  // Use the hook to get data and status
  const {
    cities = [],
    damageTypes = [],
    phoneBrands = [],
    insuranceTypes = [],
    status,
  } = useParallelQueries(4);
  const { isLoading, isError, isSuccess, errorMessage } = status;

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Component UI with loading state and results...
}
```

## Flow Diagram

```
┌────────────────────┐       ┌────────────────────┐
│                    │       │                    │
│  Component mounts  │──────▶│ useParallelQueries │
│                    │       │       (hook)       │
└────────────────────┘       └──────────┬─────────┘
                                        │
                                        ▼
                             ┌────────────────────┐
                             │                    │
                             │ useQueries starts  │
                             │  multiple queries  │
                             │                    │
                             └──────────┬─────────┘
                                        │
                      ┌────────────────┬┴───────────────┐
                      │                │                │
                      ▼                ▼                ▼
           ┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
           │                 │ │             │ │                 │
           │  fetchCities    │ │fetchDamage  │ │  fetchPhone     │ ... more
           │                 │ │Types        │ │  Brands         │
           └────────┬────────┘ └──────┬──────┘ └───────┬─────────┘
                    │                 │                │
                    ▼                 ▼                ▼
           ┌──────────────┐   ┌──────────────┐   ┌────────────┐
           │ Cities Data  │   │ Damage Types │   │Phone Brands│
           └──────────────┘   └──────────────┘   └────────────┘
                    │                 │                │
                    └─────────┬───────┴────────────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │                     │
                   │ Combined Status:    │
                   │ - isLoading         │
                   │ - isError           │
                   │ - isSuccess         │
                   │ - errorMessage      │
                   │                     │
                   └─────────┬───────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │                       │
                  │ Component UI Updates  │
                  │ - Loading spinners    │
                  │ - Success message     │
                  │ - Error message       │
                  │ - Display data        │
                  │                       │
                  └───────────────────────┘
```

## API Query Types

The application supports the following API query types:

1. **Cities** (`fetchCities`)

   - Returns list of cities
   - Delay: 1500ms
   - Data format: `[{ code: "BP", name: "Budapest" }, ...]`

2. **Damage Types** (`fetchDamageTypes`)

   - Returns list of damage categories
   - Delay: 2000ms
   - Data format: `[{ code: "SCREEN", name: "Képernyő törés" }, ...]`

3. **Phone Brands** (`fetchPhoneBrands`)

   - Returns list of phone manufacturers
   - Delay: 1800ms
   - Data format: `[{ code: "APPLE", name: "Apple" }, ...]`

4. **Insurance Types** (`fetchInsuranceTypes`)

   - Returns list of insurance options
   - Delay: 2200ms
   - Data format: `[{ code: "BASIC", name: "Alap" }, ...]`

5. **Payment Options** (`fetchPaymentOptions`)
   - Returns list of payment methods
   - Delay: 1300ms
   - Data format: `[{ code: "CARD", name: "Bankkártya" }, ...]`

## Error Handling

The implementation provides comprehensive error handling:

1. **Error Detection**

   - Each query's error state is monitored
   - If any query fails, the overall status shows an error

2. **Error Messages**

   - Specific error messages from each failed query are collected
   - Messages include query name for easier debugging

3. **Error Simulation**

   - The `simulateError` function can be used to test error handling
   - Can set probability of errors for testing robustness

4. **UI Feedback**
   - Error state triggers error notification
   - Failed queries don't prevent other successful queries from displaying data

## UI Integration

The parallel queries are integrated with the UI as follows:

1. **Loading Indicators**

   - Spinners appear in select dropdowns during loading
   - Global loading indicator shows when any query is still loading

2. **Success Notification**

   - Shows "All API requests completed successfully (200 OK)" when all queries finish
   - Automatically disappears after 3 seconds

3. **Error Notification**

   - Shows detailed error message when any query fails
   - Includes which queries failed and why

4. **Data Display**

   - Form fields use cities and damage types for selection options
   - Additional data (phone brands, insurance types) is displayed for demonstration

5. **Form Interaction**
   - Form fields are disabled during loading
   - Form validation continues to work independently of API state

---

This implementation provides a robust pattern for handling multiple concurrent API requests, combining their states, and providing clear user feedback. It ensures that independent API calls don't block each other while still offering a unified status and error handling approach.
