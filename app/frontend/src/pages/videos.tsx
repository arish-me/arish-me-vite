'use client'

import React, { useState, useEffect } from "react"
import PageTitle from '@/components/page-title'
import { Skeleton } from "@/components/ui/skeleton"
import HelmetWrapper from '@/components/HelmetWrapper';
import { Card, CardContent } from '@/components/ui/card'

const Videos = () => {
  const [posts, setPosts] = useState([]) // Ensure posts is initialized as an array
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const title = 'Latest Learning Videos By Me'
  const description = 'Watch the latest tutorials and learning videos on Ruby on Rails, where I dive into the challenges and solutions I encounter while coding. Join me as I explore advanced concepts and share insights for fellow developers.'

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/v1/videos')
        const data = await response.json()
        setPosts(data.videos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div className="container mx-auto px-4">
      <HelmetWrapper
        title={title}
        url={window.location.href}
      />
      <PageTitle title={title} description={description} />

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="space-y-4">
            {/* Show Skeleton loaders while data is being fetched */}
            <Skeleton className="h-56" />
            <Skeleton className="h-56" />
            <Skeleton className="h-56" />
          </div>
        ) : (
          posts.map((video, index) => (
                <iframe
                  width="100%"
                  height="315"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

          ))
        )}
      </div>



    </div>
  )
}

export default Videos
