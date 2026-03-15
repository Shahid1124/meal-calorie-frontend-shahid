'use client'

import useAuthGaurd from "@/hooks/useAuthGuard"
import MealForm from "@/components/MealForm"
import ResultCard from "@/components/ResultCard"
import useMealStore from "@/stores/mealStore"
import Container from "@/components/ui/container"
import Loader from "@/components/ui/loader"

const CaloriPage = () => {
    const { token } = useAuthGaurd()
    const { loading } = useMealStore()


    if (!token) return null



    return (
        <Container>
            <MealForm />
            {
                loading && (
                    <Loader />
                )
            }
            {!loading && <ResultCard />}
        </Container>
    )
}

export default CaloriPage