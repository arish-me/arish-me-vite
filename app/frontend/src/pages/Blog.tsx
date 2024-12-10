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

  // Fetch blog data from Hashnode GraphQL API
  useEffect(() => {
    const fetchBlogData = async () => {
      const query = `
        query Publication {
          publication(host: "arish.hashnode.dev") {
            url
            author {
              id
              username
              name
              profilePicture
            }
            posts(first: 3) {
              edges {
                node {
                  tags {
                    id
                    name
                  }
                  title
                  brief
                  url
                }
              }
            }
          }
        }
      `;
      try {
        const response = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        const result = await response.json();
        setBlogs(result.data.publication);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, []);

  // If the data is still being fetched
  if (!blogs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <HelmetWrapper
        title={title}
        url={window.location.href}
      />
      <PageTitle title={title} description={description} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {blogs.posts.edges.map((post, index) => (
          <Card  key={index}>
            <CardHeader>
              <div className="flex space-x-2">
                <BlurImage
                  src={blogs.author.profilePicture}
                  size="sm"
                  imageClassName='group-hover:scale-105'
                  alt={title}
                  className='rounded-lg'
                />
                <div>
                  <CardTitle className="text-sm">{blogs.author.name}</CardTitle>
                  <CardDescription>@{blogs.author.username}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <Separator className="mb-2"/>
            <CardContent>
              <CardTitle className="text-md">{post.node.title}</CardTitle>
              <CardDescription>
                {post.node.brief}
                <Link to={post.node.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Read more
                </Link>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className='flex flex-wrap gap-2'>
                {post.node.tags.map((tag) => (
                  <div
                    key={tag.id} // Use a unique key for each tag
                    className='rounded-full border bg-zinc-50 px-3 py-2 text-xs leading-4 dark:bg-zinc-900'
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
              <Link to={blogs.url} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full border bg-black px-3 py-2 text-xs leading-4 dark:bg-zinc-900')}>
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
