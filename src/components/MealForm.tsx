'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { mealSchema, type MealFormSchema } from "@/lib/validations"
import useMealStore from "@/stores/mealStore"
import FormField from "@/components/FormField"
import { Button } from "@/components/ui/button"

const MealForm = () => {
  const { fetchCalories, loading, error } = useMealStore()

  const { register, handleSubmit, formState: { errors } } = useForm<MealFormSchema>({
    resolver: zodResolver(mealSchema)
  })

  const onFormSubmit = async (data: MealFormSchema) => {
    await fetchCalories(data)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">
          Calorie Lookup
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
          Enter a dish name to get its nutritional breakdown
        </p>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

          <FormField
            label="Dish Name"
            type="text"
            placeholder="e.g. Chicken Biryani"
            error={errors.dish_name?.message}
            {...register('dish_name')}
          />

          <FormField
            label="Number of Servings"
            type="number"
            placeholder="e.g. 2"
            error={errors.servings?.message}
            {...register('servings', { valueAsNumber: true })}
          />

          {error && (
            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-950 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Searching..." : "Get Calories"}
          </Button>

        </form>
      </div>
    </div>
  )
}

export default MealForm