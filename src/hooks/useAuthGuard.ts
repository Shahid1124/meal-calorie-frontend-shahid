import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/stores/authStore";

const useAuthGaurd = () => {
    const router = useRouter();

    const {token} = useAuthStore()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!token) {
        router.replace('/login')
      }
    }, 50)

    return () => clearTimeout(timer)
    
  }, [token, router])

    return {token, isLoading}
}

export default useAuthGaurd