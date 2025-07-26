import { z } from "zod";
import { config } from "dotenv";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test", override: true });
} else {
  config();
}

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().url().min(1),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
  ADMIN_USERNAME: z.string().min(1, "Admin username is required"),
  ADMIN_PASSWORD: z.string().min(1, "Admin password is required"),
  FIREBASE_API_KEY: z.string().min(1, "Firebase API key is required"),
  FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase Auth domain is required"),
  FIREBASE_PROJECT_ID: z.string().min(1, "Firebase Project ID is required"),
  FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase Storage bucket is required"),
  FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "Firebase Messaging Sender ID is required"),
  FIREBASE_APP_ID: z.string().min(1, "Firebase App ID is required"),
  FIREBASE_MEASUREMENT_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);
  console.log("Environment variables loaded:", {
  ...env,
  ADMIN_USERNAME: "******", // Mask sensitive information
  ADMIN_PASSWORD: "******", // Mask sensitive information
})
