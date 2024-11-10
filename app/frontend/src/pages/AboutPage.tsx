import PageTitle from '@/components/page-title'
import { useEffect, useState } from "react";
import HelmetWrapper from '@/components/HelmetWrapper';
import { PDFViewer } from '@react-pdf/renderer';
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

  const pdfUrl = "/resume.pdf";

  return (
    <div className="container mx-auto py-8">
      <HelmetWrapper
        title={title}
        url={window.location.href}
      />
      <PageTitle title={about.title} description={about.description} />
        <iframe
          src={pdfUrl}
          width="100%"
          height="800px"
          title="Resume"
          style={{ border: 'none' }}
        />
    </div>
  );
};

export default AboutPage;
