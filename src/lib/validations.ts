import { z } from "zod";

export const registerSchema = z
  .object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const mealSchema = z.object({
    dish_name: z.string().min(2, "Enter proper dish name"),
    servings: z.number().min(1, "Serving should be greater then 0"),
})

export type RegisterFormSchema = z.infer<typeof registerSchema>;
export type LoginFormSchema = z.infer<typeof loginSchema>;
export type MealFormSchema = z.infer< typeof mealSchema>;
