/**
 * IBAN validation utility functions
 *
 * This module provides functions for validating IBAN numbers according to the standard format.
 * The validation includes:
 * 1. Basic format check (length and character validation)
 * 2. Checksum validation using the MOD-97 algorithm
 */

/**
 * Validates if a string contains only valid IBAN characters (letters and numbers)
 * @param iban - The IBAN string to validate
 * @returns boolean indicating if the string contains only valid characters
 */
const hasValidCharacters = (iban: string): boolean => {
  return /^[A-Z0-9]+$/.test(iban);
};

/**
 * Validates if the IBAN length is correct for the given country
 * @param iban - The IBAN string to validate
 * @returns boolean indicating if the length is valid
 */
const hasValidLength = (iban: string): boolean => {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, "").toUpperCase();

  // Common IBAN lengths for different countries
  const ibanLengths: { [key: string]: number } = {
    HU: 28, // Hungary
    DE: 22, // Germany
    AT: 20, // Austria
    SK: 24, // Slovakia
    RO: 24, // Romania
    MK: 19, // North Macedonia
    BE: 16, // Belgium
    // Add more countries as needed
  };

  const countryCode = cleanIban.substring(0, 2);
  const expectedLength = ibanLengths[countryCode];

  return expectedLength ? cleanIban.length === expectedLength : false;
};

/**
 * Validates the IBAN checksum using the MOD-97 algorithm
 * @param iban - The IBAN string to validate
 * @returns boolean indicating if the checksum is valid
 */
const hasValidChecksum = (iban: string): boolean => {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, "").toUpperCase();

  // Move first 4 chars to end and convert letters to numbers
  const rearranged = cleanIban.substring(4) + cleanIban.substring(0, 4);
  const numeric = rearranged
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code >= 65 ? (code - 55).toString() : char;
    })
    .join("");

  // Calculate modulo 97
  let remainder = 0;
  for (let i = 0; i < numeric.length; i++) {
    remainder = (remainder * 10 + parseInt(numeric[i])) % 97;
  }

  return remainder === 1;
};

/**
 * Main IBAN validation function that combines all validation steps
 * @param iban - The IBAN string to validate
 * @returns object containing validation result and error message if invalid
 */
export const validateIBAN = (
  iban: string
): { isValid: boolean; error?: string } => {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, "").toUpperCase();

  // Check if empty
  if (!cleanIban) {
    return { isValid: false, error: "Az IBAN szám megadása kötelező" };
  }

  // Check characters
  if (!hasValidCharacters(cleanIban)) {
    return {
      isValid: false,
      error: "Az IBAN szám csak betűket és számokat tartalmazhat",
    };
  }

  // Check length
  if (!hasValidLength(cleanIban)) {
    return { isValid: false, error: "Az IBAN szám hossza nem megfelelő" };
  }

  // Check checksum
  if (!hasValidChecksum(cleanIban)) {
    return {
      isValid: false,
      error: "Az IBAN szám ellenőrző összege nem megfelelő",
    };
  }

  return { isValid: true };
};
