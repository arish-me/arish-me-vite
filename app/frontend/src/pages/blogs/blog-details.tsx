import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from './header'
import { ProjectImage } from '@/components/blur-project-image'
import { Separator } from "@/components/ui/separator"
import { BlurImage } from '@/components/blur-image';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
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

function PreWithCopyButton({ node }) {
  const codeText = node.children[0]?.data || ""; // Get the code text within <pre>

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText)
      .then(() => alert("Code copied!"))
      .catch(err => console.error("Failed to copy text: ", err));
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          padding: '4px 8px',
          fontSize: '12px',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Copy
      </button>
      <pre>{codeText}</pre>
    </div>
  );
}

  const transform = (node) => {
    if (node.type === 'tag' && node.name === 'pre') {
      return <PreWithCopyButton node={node} />;
    }
    return convertNodeToElement(node);
  };

   useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block) => {
      // Create "Copy" button
      const button = document.createElement('button');
      button.innerText = 'Copy';
      button.className = 'copy-button';
      button.style = `
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 4px 8px;
        font-size: 12px;
        background-color: #333;
        color: #fff;
        border: none;
        cursor: pointer;
        border-radius: 4px;
      `;

      // Copy code to clipboard on button click
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(block.innerText)
          .then(() => {
            button.innerText = 'Copied!';
            setTimeout(() => button.innerText = 'Copy', 2000);
          })
          .catch((err) => console.error('Copy failed:', err));
      });

      // Position button inside <pre> block and style container
      block.style.position = 'relative';
      block.insertBefore(button, block.firstChild);
    });
  }, [blog.brief]); // Run this effect whenever `blog.brief` changes

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
             <div dangerouslySetInnerHTML={{ __html: blog.brief }} />


        </CardContent>
        <Separator className="mb-2" />
         <CardFooter className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <div key={index} className="rounded-full border bg-zinc-50 px-3 py-2 text-xs leading-4 dark:bg-zinc-900">
                    {tag}
                  </div>
                ))}
              </div>
            </CardFooter>
      </Card>

    </div>
  );
};

export default BlogDetail;
