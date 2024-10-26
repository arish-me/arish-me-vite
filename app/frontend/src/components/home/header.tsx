'use client'

import { useState, useEffect } from "react";
import { motion, useAnimate } from 'framer-motion'
import { BlurImage } from '@/components/blur-image'
import Logo from '@/images/arishme.png';
const TEXTS = [
  {
    text: 'amazing',
    className:
      'bg-clip-text text-center text-transparent bg-gradient-to-r from-[#ff1835] to-[#ffc900]'
  },
  {
    text: 'stunning',
    className:
      'bg-clip-text text-center text-transparent bg-gradient-to-r from-[#0077ff] to-[#00e7df]'
  },
  {
    text: 'fantastic',
    className:
      'bg-clip-text text-center text-transparent bg-gradient-to-r from-[#7f00de] to-[#ff007f]'
  },
  {
    text: 'amazing',
    className:
      'bg-clip-text text-center text-transparent bg-gradient-to-r from-[#ff1835] to-[#ffc900]'
  }
]

const Header = () => {
  const [scope, animate] = useAnimate()


  useEffect(() => {
    void animate(
      [
        [scope.current, { y: '0%' }, { duration: 0 }],
        [scope.current, { y: '-25%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '-50%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '-75%' }, { duration: 0.3, at: '+1.3' }]
      ],
      {
        repeat: Number.POSITIVE_INFINITY
      }
    )
  }, [animate, scope])

  return (
    <div className='my-16 space-y-6'>
      <div className='flex justify-between items-start gap-8'>
        <motion.div
          className='flex flex-col gap-4 md:max-w-xl'
          initial={{
            y: 40,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            duration: 0.5
          }}
        >
          <h1 className='font-title bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-2xl font-bold leading-9 text-transparent sm:text-4xl sm:leading-[3.5rem] dark:from-white dark:via-white/90 dark:to-white/70'>
            I'm Arish, a Full Stack Developer creating{' '}
            <div className='inline-grid h-9 overflow-hidden sm:h-14'>
              <div ref={scope}>
                {TEXTS.map(({ text, className }, i) => (
                  <div className={className} key={i}>
                    {text}
                  </div>
                ))}
              </div>
            </div>{' '}
            apps using Rails and React.
          </h1>
          <div className='text-muted-foreground text-sm'>India • UTC/GMT +5:30</div>
        </motion.div>
        <motion.div
          className='relative hidden size-56 md:block'
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            duration: 0.3
          }}
        >
          <BlurImage
            src={Logo}
            alt="Arish's avatar"
            fallbackText="A"
            size="4xl"
            className="rounded-full"
          />
          <div className='absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 opacity-50 blur-3xl' />
        </motion.div>
      </div>
    </div>
  )
}

export default Header