// Közös form konfig, query kulcs, validációs sémák, queryClient
import { z } from "zod";
import { QueryClient } from "@tanstack/react-query";
import { validateIBAN } from "./utils/ibanValidation";

export const FORM_QUERY_KEY: string[] = ["claim-form"];
export const queryClient = new QueryClient();

export const page1ValidationSchema = z.object({
  name: z
    .string()
    .min(2, "A név legalább 2 karakter legyen!")
    .max(50, "A név legfeljebb 50 karakter lehet!"),
  email: z.string().email("Érvényes email címet adj meg!"),
  phone: z
    .string()
    .regex(
      /^[+]?[0-9]{10,15}$/,
      "Adj meg érvényes telefonszámot! (pl. +36301234567)"
    ),
});

export type Page1FormValues = z.infer<typeof page1ValidationSchema>;

export const page2ValidationSchema = z.object({
  deviceNumber: z
    .string()
    .min(5, "Az eszközszám legalább 5 karakter legyen!")
    .max(20, "Az eszközszám legfeljebb 20 karakter lehet!"),
  insuranceNumber: z
    .string()
    .regex(/^[0-9]{8,12}$/, "A biztosítási szám 8-12 számjegy legyen!"),
  city: z
    .string()
    .min(2, "A lakhely legalább 2 karakter legyen!")
    .max(50, "A lakhely legfeljebb 50 karakter lehet!"),
  birthDate: z
    .date({ required_error: "A születési dátum kötelező!" })
    .refine(
      (d) => d instanceof Date && !isNaN(d.getTime()),
      "Adj meg érvényes dátumot!"
    ),
  iban: z
    .string()
    .min(1, "Az IBAN szám megadása kötelező")
    .refine((value) => {
      const { isValid } = validateIBAN(value);
      return isValid;
    }, "Érvénytelen IBAN formátum"),
});

export type Page2FormValues = z.infer<typeof page2ValidationSchema>;

// UserData interfész, amely tartalmazza a felhasználói adatokat
export type UserData = {
  name: string;
  email: string;
  phone: string;
  deviceNumber: string;
  insuranceNumber: string;
  city: string;
  birthDate: Date | null;
  iban: string;
};
