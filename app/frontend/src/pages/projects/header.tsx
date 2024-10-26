'use client'

import React from "react";
import { buttonVariants } from '@/components/ui/button'
import { Link } from "react-router-dom"
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowUpRightIcon } from 'lucide-react'


const animation = {
  hide: {
    x: -30,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1
  }
}

type HeaderProps = Project

const Header = (props: HeaderProps) => {
  const { title, description, live_url, github_url } = props

  return (
    <div className='space-y-8'>
      <motion.div
        className='flex items-center gap-3'
        initial={animation.hide}
        animate={animation.show}
      >
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          <h2 className='text-muted-foreground'>{description}</h2>
        </div>
      </motion.div>
      <motion.div
        className='flex flex-col items-start gap-2 sm:flex-row sm:gap-4'
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        {live_url ? (
          <Link to={live_url} target="_blank" className={cn(buttonVariants(), 'group')}>
             Visit Website
            <ArrowUpRightIcon className='ml-2 size-5 transition-transform group-hover:-rotate-12' />
          </Link>
        ) : null}
       {github_url ? (
        <Link to={github_url} target="_blank" className={cn(buttonVariants(), 'group')}>
          Github
          <ArrowUpRightIcon className='ml-2 size-5 transition-transform group-hover:-rotate-12' />
        </Link>) : null}
      </motion.div>
    </div>
  )
}
export default Header