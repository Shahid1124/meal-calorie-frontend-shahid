'use client'

import useMealStore from "@/stores/mealStore"

const MealHistory = () => {
  const { history } = useMealStore()

  if (history.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-4">
        No search history yet.
      </p>
    )
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3 dark:text-white">
        Search History
      </h2>
      <div className="rounded-xl border dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-400">Dish</th>
              <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-400">Servings</th>
              <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-400">Calories</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr
                key={index}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3 capitalize dark:text-white">{item.dish_name}</td>
                <td className="px-4 py-3 dark:text-white">{item.servings}</td>
                <td className="px-4 py-3 font-medium dark:text-white">{item.total_calories} kcal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MealHistory