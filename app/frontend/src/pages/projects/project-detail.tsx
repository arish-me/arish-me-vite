import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from './header'
import { ProjectImage } from '@/components/blur-project-image'
import { Separator } from "@/components/ui/separator"

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

const ProjectDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL params
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For handling "not found" case

  useEffect(() => {
    // Fetch the project data from the API based on the slug
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/v1/projects/${slug}`);
        if (!response.ok) {
          throw new Error("Project not found");
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
        navigate("/404"); // Navigate to a 404 page if the project is not found
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  const { title, description, body, github_url, live_url, technologies } = project;
  return (
    <div className='mx-auto max-w-3xl'>
      <HelmetWrapper
        title={title}
        url={window.location.href}
      />
      <Card>
        <CardHeader>
          <Header {...project} />
          <Separator className="mb-2" />
          <CardTitle>

            {true && <ProjectImage
              src={project.image_url.medium_2x}
              width={1280}
              height={832}
              size="4xl"
              imageClassName='group-hover:scale-105 my-6'
              alt={title}
              className='my-6 mb-6 rounded-lg'
            />
            }
          </CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent>
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: body }} />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className='flex flex-wrap gap-2'>
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
        </CardFooter>
      </Card>

    </div>
  );
};

export default ProjectDetail;
