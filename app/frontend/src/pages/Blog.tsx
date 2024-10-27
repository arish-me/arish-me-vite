import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/page-title';
import { BlurImage } from '@/components/blur-image';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator"
import HelmetWrapper from '@/components/HelmetWrapper';

const Blog = () => {
  const title = 'Blog';
  const description = 'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences.';

  // State to store blog data
  const [blogs, setBlogs] = useState(null);

  // Fetch blog data from Rails backend API
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('/api/v1/blogs');
        const result = await response.json();
        setBlogs(result);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, []);

  if (!blogs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <HelmetWrapper title={title} url={window.location.href} />
      <PageTitle title={title} description={description} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {blogs.map((post, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex space-x-2">
                <BlurImage
                  src={post.profile_picture}
                  size="sm"
                  imageClassName="group-hover:scale-105"
                  alt={title}
                  className="rounded-lg"
                />
                <div>
                  <CardTitle className="text-sm">{post.author_name}</CardTitle>
                  <CardDescription>@{post.author_username}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <Separator className="mb-2" />
            <CardContent>
              <CardTitle className="text-md">{post.title}</CardTitle>
              <CardDescription>
                {post.brief}
                <Link to={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Read more
                </Link>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <div key={index} className="rounded-full border bg-zinc-50 px-3 py-2 text-xs leading-4 dark:bg-zinc-900">
                    {tag}
                  </div>
                ))}
              </div>
              <Link to="/" className={cn(buttonVariants(), 'rounded-full border bg-black px-3 py-2 text-xs leading-4 dark:bg-zinc-900')}>
                Follow
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
