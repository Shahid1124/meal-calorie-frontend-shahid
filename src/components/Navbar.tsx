
'use client'

import ThemeToggle from './ThemeToggle'
import useAuthStore from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
    const { user, logout, token } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        logout();
        router.replace('/login')
    }

    return (
        <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between dark:bg-gray-800">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                <Link href={'/dashboard'}>Meal Calorie App</Link>
            </h1>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                {
                    token && (<span className="text-gray-600 text-sm dark:text-white">
                        Hello, {user?.first_name}
                    </span>)
                }

                {
                    token ? (
                        <Button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
                        >
                            Logout
                        </Button>
                    ) : (
                        <div>
                            {pathname === '/login' && (
                                <Button
                                    onClick={() => router.push('/register')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    Register
                                </Button>
                            )}
                            {pathname === '/register' && (
                                <Button
                                    onClick={() => router.push('/login')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    Login
                                </Button>
                            )}


                        </div>
                    )
                }

            </div>
        </nav>
    )
}

export default Navbar