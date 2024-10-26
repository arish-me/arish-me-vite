import React from 'react'
import { Link, useLocation } from "react-router-dom"
import Logo from '@/images/arishme.png';
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-selector"
import { BlurImage } from '@/components/blur-image'
export function MainNav() {
  const location = useLocation() // use useLocation to get current path
  return (
    <>
    <Link to="/" className="flex items-center justify-center gap-1">
       <BlurImage
          src={Logo}
          alt="Arish's avatar"
          fallbackText="A"
          size="sm"
          className="rounded-full"
        />
    </Link>
    <div className='flex items-center gap-2'>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {docsConfig.mainNav.map((item, index) => (
          <Link
            to={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              location.pathname === item.href ? "text-foreground" : "text-foreground/60"
            )}
          >
          {item.title}
        </Link>
        ))}
        <Separator orientation='vertical' className='h-6' />
        <ThemeToggle/>
      </nav>
  </div>
  </>

  )
}
