import HomeLayout from '@/layouts/HomeLayout';
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import Projects from "@/pages/Projects";
import Blog from "@/pages/Blog";
import LatestStartups from "@/pages/LatestStartups";
import ProjectDetail from '@/pages/projects/project-detail'
import BlogDetail from '@/pages/blogs/blog-details'
import Demo from '@/pages/blogs/Demo'
import NotFound from '@/pages/not-found'
import { Navigate, Route, Routes } from 'react-router';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="demo" element={<Demo />} />
        <Route path="projects" element={<Projects />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="startups" element={<LatestStartups />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
};

export default AppRouter;