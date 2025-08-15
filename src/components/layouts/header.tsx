"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

// Define navigation menu type
type NavigationItem = {
  label: string
  href: string
}

// Navigation menu items
const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 left-0 right-0 w-full h-16 px-4 bg-background border-b border-border z-50">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center select-none">
            <div className="text-xl font-bold text-foreground">Planora</div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sign In / Sign Up Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href={pathname}>Sign In</Link>
          </Button>
          <Button asChild>
            <Link href={pathname}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
