'use client'

import React from "react";
import { BlurImage } from '@/components/blur-image'
import { Link } from "react-router-dom"
import { ProjectImage } from '@/components/blur-project-image'


type ProjectCardProps = Project
type ProjectCardsProps = {
  projects: Project[]
}

const ProjectCards = (props: ProjectCardsProps) => {
  const { projects } = props

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </div>
  )
}

const ProjectCard = (props: ProjectCardProps) => {
  const { title, description, slug, technologies, image_url } = props
  return (
    <Link
      to={`/projects/${slug}`}
      className='shadow-feature-card dark:shadow-feature-card-dark hover:scale-105 bg-white group rounded-xl px-2 py-4'
    >
      <ProjectImage
        src={image_url?.original}
        width={600}
        height={400}
        size="auto"
        imageClassName='rounded-xl'
        alt={title}
        className='rounded-lg'
      />
      <div className='flex-1 px-2 py-4'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <div className='text-muted-foreground'>{description}</div>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {technologies.map((t) => {
            const { name } = t
            return (
              <div
                key={name}
                className='rounded-full border bg-zinc-50 px-3 py-2 text-xs leading-4 dark:bg-zinc-900'
              >
                {name}
              </div>
            )
          })}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCards