'use client'
import { Link } from "react-router-dom"
import { LinkIcon } from 'lucide-react'
import { StarIcon } from 'lucide-react'

import { FOOTER_LINKS } from '@/config/links'


const Footer = () => {

 return (
    <footer className='bg-background/30 relative mx-auto flex max-w-5xl flex-col rounded-2xl p-8 shadow-sm saturate-100 backdrop-blur-[10px] my-8'>
      <div className='mt-12 grid grid-cols-2 sm:grid-cols-3'>
        {FOOTER_LINKS.map((list) => (
          <div key={list.id} className='mb-10 flex flex-col items-start gap-4 pr-4'>
            {list.links.map((link) => {
              const { href, text } = link

              return (
                <Link key={href} target="_blank" to={href} variant='muted'>
                  {text}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
      <div className='mt-20 flex items-center justify-between text-sm'>
        <div>&copy; {new Date().getFullYear()} Arish</div>
        <Link
          href='https://github.com/arish-me'
          className='flex items-center justify-center overflow-hidden rounded-md border'
        >


        </Link>
      </div>
    </footer>
  )
}

export default Footer