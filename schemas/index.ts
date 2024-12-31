import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
  totalOrders: z.number().int().positive("Total orders must be a positive number"),
  totalSavings: z.number().nonnegative("Total savings must be a non-negative number"),
  email: z.string().email("Invalid email address"),
  membershipExpiry: z.string().min(2,"Need Expiry Date"),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

