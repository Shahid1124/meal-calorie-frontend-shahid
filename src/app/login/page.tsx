'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormSchema } from "@/lib/validations"
import useAuthStore from "@/stores/authStore"
import Container from "@/components/ui/container"
import FormField from "@/components/FormField"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  const { login, loading, error, token, errorClear } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (token) router.replace('/dashboard')
  }, [token, router])

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema)
  })

  const onFormSubmit = async (data: LoginFormSchema) => {
    errorClear()
    await login(data)
  }

  return (
    <Container>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md rounded-2xl shadow-md p-8 bg-white dark:bg-gray-800">

          <h1 className="text-2xl text-center font-bold text-gray-900 dark:text-white mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
            Login to your account
          </p>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

            <FormField
              label="Email"
              type="email"
              placeholder="john@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <FormField
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password')}
            />

            {error && (
              <p className="text-red-500 text-sm bg-red-50 dark:bg-red-950 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>
    </Container>
  )
}