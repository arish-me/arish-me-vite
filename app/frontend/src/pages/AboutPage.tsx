import PageTitle from '@/components/page-title'
import { useEffect, useState } from "react";
import HelmetWrapper from '@/components/HelmetWrapper';

const AboutPage = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  const title = 'About Me';
  const description = '👋 Hi there! I am Arish, a Senior Fullstack Developer passionate about creating powerful web applications and enhancing user experiences.';

  useEffect(() => {
    // Fetch the project data from the API based on the slug
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/v1/abouts`);
        if (!response.ok) {
          throw new Error("About not found");
        }
        const data = await response.json();
        setAbout(data.about_me);
      } catch (error) {
        console.error("Error fetching project:", error);
        navigate("/404"); // Navigate to a 404 page if the project is not found
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!about) {
    return <div>About not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <HelmetWrapper
        title={title}
        url={window.location.href}
      />
      <PageTitle title={about.title} description={about.description} />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mt-8">
        <div className="mt-2" dangerouslySetInnerHTML={{ __html: about.body }} />
      </div>
    </div>
  );
};

export default AboutPage;
