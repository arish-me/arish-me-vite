'use client'

import React, { useState, useEffect } from "react"
import PageTitle from '@/components/page-title'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Vote, Eye, Triangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom";
import HelmetWrapper from '@/components/HelmetWrapper';

const LatestStartups = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const title = 'Latest Startups and Product Launches'
  const description = 'Discover the latest trending startups, product launches, and innovations in October 2024, curated from Product Hunt. Stay updated with the most popular new tech!'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/v1/products')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <HelmetWrapper
        title={title}
        url={window.location.href}
      />
      <PageTitle title={title} description={description} />
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/25"
            >
              <CardHeader className="p-4">
                <div className="flex items-center gap-4 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.thumbnail_url} alt={post.name} />
                    <AvatarFallback>{post.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                      {post.name}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-1">
                      {post.tagline}
                    </CardDescription>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.topics.map((node) => (
                    <Badge key={node?.id} variant="secondary" className="text-xs">
                      {node?.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{post.comments_count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Vote className="h-4 w-4 fill-current" />
                    <span>{post.votes_count}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View on Product Hunt
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default LatestStartups