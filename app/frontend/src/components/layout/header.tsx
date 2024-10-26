'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from "@/config/site"
import { NavLink as Link } from "react-router-dom";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"

const Header = () => {
  console.log(siteConfig.links.github)
  return (
    <header className="bg-background/30 fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-5xl items-center justify-between rounded-2xl px-8 shadow-sm saturate-100 backdrop-blur-[10px] transition-colors">
      <MainNav/>
      <MobileNav />
    </header>
  )
}

export default Header
