// src/pages/Projects.tsx
import React, { useEffect, useState } from "react";
import PageTitle from '@/components/page-title'
import ProjectCards from '@/components/project-cards'
import projectsApi from "@/apis/projects";
import HelmetWrapper from '@/components/HelmetWrapper';

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const {
        data: { projects },
      } = await projectsApi.fetch();
      setProjects(projects);
    } catch (error) {
      console.warn(error)
    } finally {

    }
  };

  const title = 'Projects'
  const description = 'The list of my projects. Everything was made with ❤️.'

  return (
    <div className="container mx-auto">
      <HelmetWrapper
        title={title}
        url={window.location.href}
      />
      <PageTitle title={title} description={description} />
      <ProjectCards projects={projects} />
    </div>
  );
};

export default Projects;
