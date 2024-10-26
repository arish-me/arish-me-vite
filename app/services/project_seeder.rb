# frozen_string_literal: true

require 'net/http'
# app/services/project_seeder.rb
class ProjectSeeder
  PROJECTS = [
    {
      title: 'Vineti - Personalized Therapy Software',
      image_url: 'https://mma.prnewswire.com/media/729967/Vineti_color_2x_Logo.jpg?p=facebook',
      description: 'Vineti is a cloud-based platform providing personalized therapy
      software solutions. It streamlines cell therapy production, collaborating
      with therapy companies, medical centers, and logistics providers.',
      body: <<~HTML
        <h2>Overview</h2>
        <p>Vineti is a cloud-based platform providing personalized therapy software solutions. It streamlines cell therapy production, collaborating with therapy companies, medical centers, and logistics providers.</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Built and maintained features for personalized therapy management using Ruby on Rails and React.</li>
          <li>Worked on scaling and improving performance for handling large datasets.</li>
          <li>Collaborated with cross-functional teams to design new features and improvements.</li>
        </ul>
        <h3>Technologies Used</h3>
        <ul>
          <li>Ruby on Rails</li>
          <li>ReactJS</li>
          <li>PostgreSQL</li>
        </ul>
      HTML
    },
    {
      title: 'neetoForm - Custom Form Builder',
      image_url: 'https://www.neeto.com/images/social-preview/neetoform/landing.png?neeto',
      description: 'neetoForm is a web-based platform for building custom forms, surveys,
      and data collection applications without writing code.',
      body: <<~HTML
        <h2>Overview</h2>
        <p>neetoForm is a web-based platform for building custom forms, surveys, and data collection applications without writing code.</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Developed scalable features for building forms and surveys.</li>
          <li>Integrated various third-party APIs to enhance functionality.</li>
          <li>Worked closely with the client to ensure a seamless user experience.</li>
        </ul>
        <h3>Technologies Used</h3>
        <ul>
          <li>Ruby on Rails</li>
          <li>ReactJS</li>
          <li>PostgreSQL</li>
        </ul>
      HTML
    },
    {
      title: 'Bukukas - Digital Bookkeeping App',
      image_url: 'https://play-lh.googleusercontent.com/bQg_IHIOY32-vSXehReNE3DAX8Y3ZeXDlESNXmvS5RatDHbeRM1qkl_CajgrQKu6gA=w600-h300-pc0xffffff-pd',
      description: 'Bukukas is a digital bookkeeping platform aimed at helping businesses
      in Southeast Asia manage cash flow more effectively.',
      body: <<~HTML
        <h2>Overview</h2>
        <p>Bukukas is a digital bookkeeping platform aimed at helping businesses in Southeast Asia manage cash flow more effectively.</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Developed the digital bookkeeping features using Ruby on Rails and React.</li>
          <li>Implemented GraphQL for real-time data querying.</li>
          <li>Worked on enhancing the scalability and security of the application.</li>
        </ul>
        <h3>Technologies Used</h3>
        <ul>
          <li>Ruby on Rails</li>
          <li>ReactJS</li>
          <li>GraphQL</li>
        </ul>
      HTML
    },
    {
      title: 'Market Dojo - eSourcing Software',
      image_url: 'https://i0.wp.com/marketdojo.com/wp-content/uploads/2019/12/Market-Dojo-Logo-Vertical-Black.png?fit=574%2C215&ssl=1',
      description: 'Market Dojo provides innovative eSourcing and procurement software solutions,
      offering various modules for supply chain management.',
      body: <<~HTML
        <h2>Overview</h2>
        <p>Market Dojo provides innovative eSourcing and procurement software solutions, offering various modules for supply chain management.</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Developed the supplier onboarding system from scratch.</li>
          <li>Integrated CI/CD pipelines with GitHub Actions and CodeClimate for maintaining code quality.</li>
          <li>Led a team responsible for bug fixes and enhancements.</li>
        </ul>
        <h3>Technologies Used</h3>
        <ul>
          <li>Ruby on Rails</li>
          <li>ReactJS</li>
          <li>MySQL</li>
        </ul>
      HTML
    },
    {
      title: 'Manofix - Handyman Service & Job Marketplace',
      image_url: 'https://www.manofix.com/assets/manofix-1a46dc9a99c210d1e6eb54da4dd4cfe5473bc688ba4af3a93b96cfa5f5534da4.png',
      description: 'Connect with freelance tasker near you, and get things done',
      body: <<~HTML
        <h2>Overview</h2>
        <p>Manofix - Connect with freelance tasker near you, and get things done</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Developed a scalable and maintainable Rails application for managing flight deals.</li>
          <li>Integrated Stripe for online payments and Twilio for SMS notifications.</li>
        </ul>
        <h3>Technologies Used</h3>
        <ul>
          <li>Ruby On Rails</li>
          <li>React.JS</li>
          <li>PostgreSQL</li>
        </ul>
      HTML
    },
    {
      title: 'FlightsMachine - Flight Deal Notification System',
      image_url: 'https://static.vecteezy.com/system/resources/previews/016/469/320/non_2x/aircraft-airplane-flight-taking-off-plane-logo-vector.jpg',
      description: 'FlightsMachine is a platform that alerts users about flight deals
                    according to their subscriptions and preferences.',
      body: <<~HTML
        <h2>Overview</h2>
        <p>FlightsMachine is a platform that alerts users about flight deals according to their subscriptions and preferences.</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Developed a scalable and maintainable Sinatra application for managing flight deals.</li>
          <li>Integrated Stripe for online payments and Twilio for SMS notifications.</li>
          <li>Implemented scrapers to fetch flight deals from multiple sources like Google Flights and Skyscanner.</li>
        </ul>
        <h3>Technologies Used</h3>
        <ul>
          <li>Sinatra</li>
          <li>Vue.js</li>
          <li>PostgreSQL</li>
        </ul>
      HTML
    }
  ].freeze

  def self.seed
    PROJECTS.each do |project_data|
      project = Project.find_or_create_by(title: project_data[:title]) do |project|
        project.description = project_data[:description]
        project.slug = project_data[:title].parameterize

        # Attach image from URL
        uri = URI.parse(project_data[:image_url])
        response = Net::HTTP.get_response(uri)

        if response.is_a?(Net::HTTPSuccess)
          project.image.attach(io: StringIO.new(response.body), filename: "#{project_data[:title].parameterize}.jpg",
                               content_type: 'image/jpeg')
        end

        project.body = project_data[:body]
      end

      puts "Seeded project: #{project.title}"
    end
  end
end
