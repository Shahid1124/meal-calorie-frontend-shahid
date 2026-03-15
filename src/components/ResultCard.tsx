'use client'

import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "./ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Button } from "./ui/button"
import { ChevronDownIcon } from "lucide-react"
import useMealStore from "@/stores/mealStore"

const ResultCard = () => {
  const { result } = useMealStore()

  if (!result) return null

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Card className="dark:bg-gray-800">

        <CardHeader>
          <CardTitle className="capitalize">{result.dish_name}</CardTitle>
          <CardDescription>{result.servings} serving(s) · {result.source}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Calories Row */}
          <div className="flex justify-between items-center py-3 border-b dark:border-gray-700">
            <span className="font-medium">Total Calories</span>
            <span className="text-xl font-bold">{result.total_calories} kcal</span>
          </div>

          {/* Key Macros */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Protein', value: result.macronutrients_per_serving.protein },
              { label: 'Carbs', value: result.macronutrients_per_serving.carbohydrates },
              { label: 'Fat', value: result.macronutrients_per_serving.total_fat },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <p className="text-lg font-semibold">{value}g</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

        </CardContent>

        {/* Full Nutrition Collapsible */}
        <CardFooter>
          <Collapsible className="w-full">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="group w-full justify-between">
                <span className="text-sm">View Nutrition Facts</span>
                <ChevronDownIcon className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 space-y-1">
                {Object.entries(result.macronutrients_per_serving).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm px-2 py-1.5 border-b dark:border-gray-700">
                    <span className="capitalize text-muted-foreground">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="font-medium">{value}g</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardFooter>

      </Card>
    </div>
  )
}

export default ResultCard