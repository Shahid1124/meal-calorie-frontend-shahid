export type RegisterPayload = {
    first_name: string
    last_name: string
    email: string
    password: string
}

export type LoginPayload = {
    email: string
    password: string
}

export type User = {
    id: number
    first_name: string
    last_name: string
    email: string
}

export type AuthenticationResponse = {
    user: User
    token: string
    message: string
}

export type ApiErrorResponse = {
    message: string
}

type Macronutrients = {
    protein: number,
    total_fat: number,
    carbohydrates: number,
    fiber?: number,
    sugars?: number,
    saturated_fat?: number
}

type IngredientBreakdown = {
    name: string
    calories_per_100g: number
    serving_size: string
    data_type: string
    fdc_id: number
    macronutrients_per_100g: Macronutrients
}

type MatchedFood = {
    name: string
    data_type: string
    fdc_id: number
    published_date: string
}

export type CalorieResponse = {
    dish_name: string
    servings: number
    calories_per_serving: number
    total_calories: number
    macronutrients_per_serving: Macronutrients
    total_macronutrients: Macronutrients
    source: string
    ingredient_breakdown: IngredientBreakdown[]
    matched_food: MatchedFood
}

export type CalorieRequest = {
    dish_name: string
    servings: number 
}