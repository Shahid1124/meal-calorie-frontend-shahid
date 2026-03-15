'use client'

import { useRouter } from "next/navigation"
import useAuthGuard from "@/hooks/useAuthGuard"
import useAuthStore from "@/stores/authStore"
import Container from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import MealHistory from "@/components/MealHistoryTable"
import Loader from "@/components/ui/loader"

const DashboardPage = () => {
  const router = useRouter()
  const { token, isLoading } = useAuthGuard()
  const { user } = useAuthStore()

  if (isLoading) return <Loader />
  if (!token) return null

  return (
    <Container>
      <div className="max-w-2xl mx-auto mt-10 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.first_name}!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Search for any meal to see its calorie breakdown
          </p>

          <Button onClick={() => router.push('/calories')} className="bg-black hover:bg-green-700 transition duration-300 ease-in-out cursor-pointer">
            Search Calories →
          </Button>

        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-10 mb-10">
        <MealHistory />
      </div>
    </Container>
  )
}

export default DashboardPage