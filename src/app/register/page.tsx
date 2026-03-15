'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormSchema } from "@/lib/validations"
import useAuthStore from "@/stores/authStore"
import Container from "@/components/ui/container"
import FormField from "@/components/FormField"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const { register: registerUser, loading, error, token, errorClear } = useAuthStore()

  useEffect(() => {
    if (token) router.replace('/dashboard')
  }, [token, router])

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema)
  })

  const onFormSubmit = async (data: RegisterFormSchema) => {
    errorClear()
    await registerUser(data)
  }

  return (
    <Container>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md rounded-2xl shadow-md p-8 bg-white dark:bg-gray-800">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Fill in your details to get started
          </p>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="First Name"
                placeholder="John"
                error={errors.first_name?.message}
                {...register('first_name')}
              />
              <FormField
                label="Last Name"
                placeholder="Doe"
                error={errors.last_name?.message}
                {...register('last_name')}
              />
            </div>

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
              placeholder="Min 8 characters"
              error={errors.password?.message}
              {...register('password')}
            />

            <FormField
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              error={errors.confirm_password?.message}
              {...register('confirm_password')}
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
              {loading ? "Creating account..." : "Register"}
            </Button>

          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </Container>
  )
}