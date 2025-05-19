// Közös form konfig, query kulcs, validációs sémák, queryClient
import { z } from "zod";
import { validateIBAN } from "./utils/ibanValidation";
import { validateIMEI } from "./utils/validateIMEI";

export const FORM_QUERY_KEY: string[] = ["claim-form"];

// Validációs sémák
export const validationSchemas = {
  // Login validáció
  login: z.object({
    username: z
      .string()
      .min(3, "A felhasználónév legalább 3 karakter legyen!")
      .max(20, "A felhasználónév legfeljebb 20 karakter lehet!"),
    password: z
      .string()
      .min(6, "A jelszó legalább 6 karakter legyen!")
      .max(50, "A jelszó legfeljebb 50 karakter lehet!"),
  }),

  // Első oldal validáció
  page1: z.object({
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
  }),

  // Második oldal validáció
  page2: z.object({
    imeiNumber: z
      .string()
      .regex(/^\d{15}$/, "Az IMEI szám pontosan 15 számjegyből álljon!")
      .refine((value) => validateIMEI(value), {
        message: "Érvénytelen IMEI szám (Luhn-ellenőrzés sikertelen)",
      }),
    insuranceNumber: z
      .string()
      .regex(/^[0-9]{8,12}$/, "A biztosítási szám 8-12 számjegy legyen!"),
    city: z
      .string()
      .min(2, "A lakhely legalább 2 karakter legyen!")
      .max(50, "A lakhely legfeljebb 50 karakter lehet!"),
    cardType: z.string().min(1, "A kár típusa kötelező!"),
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
  }),
};

// Típusok a validációs sémákból
export type LoginFormValues = z.infer<typeof validationSchemas.login>;
export type Page1FormValues = z.infer<typeof validationSchemas.page1>;
export type Page2FormValues = z.infer<typeof validationSchemas.page2>;

// UserData interfész, amely tartalmazza a felhasználói adatokat
export type UserData = {
  name: string;
  email: string;
  phone: string;
  imeiNumber: string;
  insuranceNumber: string;
  city: string;
  cardType: string;
  birthDate: Date | null;
  iban: string;
};

// Mock user data for login validation
export const MOCK_USERS = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    username: "user",
    password: "user123",
    role: "user",
  },
];

// Mock login API function
export const mockLoginApi = async (credentials: LoginFormValues) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = MOCK_USERS.find(
    (u) =>
      u.username === credentials.username && u.password === credentials.password
  );

  if (!user) {
    throw new Error("Hibás felhasználónév vagy jelszó!");
  }

  return {
    user: {
      username: user.username,
      role: user.role,
    },
    token: "mock-jwt-token-" + Math.random(),
  };
};
