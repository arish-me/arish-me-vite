import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from './header'
import { ProjectImage } from '@/components/blur-project-image'
import { Separator } from "@/components/ui/separator"
import { BlurImage } from '@/components/blur-image';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import HelmetWrapper from '@/components/HelmetWrapper';

const BlogDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL params
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For handling "not found" case

  useEffect(() => {
    // Fetch the project data from the API based on the slug
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/v1/blogs/${slug}`);
        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching project:", error);
        navigate("/404"); // Navigate to a 404 page if the project is not found
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const { title, brief } = blog;
  return (
    <div className='mx-auto max-w-3xl'>
      <HelmetWrapper
        title={title}
        url={window.location.href}
      />
      <Card>
        <CardHeader>
          <CardTitle>
          <div className="flex space-x-2">
            <BlurImage
              src={blog.profile_picture}
              size="sm"
              imageClassName="group-hover:scale-105"
              alt={title}
              className="rounded-lg"
            />

            <div>
              <CardTitle className="text-sm">{blog.author_name}</CardTitle>
              <CardDescription>@{blog.author_username}</CardDescription>
            </div>
          </div>
          </CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent>
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: brief }} />
        </CardContent>
      </Card>

    </div>
  );
};

export default BlogDetail;
