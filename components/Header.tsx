'use client'
import { Button } from "./ui/button"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

export function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    const handleSignOut = () => {
        localStorage.removeItem('user')
        router.push('/')
    }

    return (
        <header className="border-b">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    {isHomePage ? (
                        <>
                            <span className="text-xl font-bold text-gray-400 cursor-not-allowed">Dashboard</span>
                            <span className="text-xl font-bold text-gray-400 cursor-not-allowed">Task List</span>
                        </>
                    ) : (
                        <>
                            <Link 
                                href="/dashboard" 
                                className={`text-xl font-bold ${pathname === '/dashboard' ? 'text-purple-600' : 'text-black'} hover:text-purple-600`}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href="/tasks" 
                                className={`text-xl font-bold ${pathname === '/tasks' ? 'text-purple-600' : 'text-black'} hover:text-purple-600`}
                            >
                                Task List
                            </Link>
                        </>
                    )}
                </div>
                {!isHomePage && (
                    <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </Button>
                )}
            </div>
        </header>
    )
}
