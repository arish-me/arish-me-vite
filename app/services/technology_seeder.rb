# frozen_string_literal: true

# app/services/seedTechnologies/technology_seeder.rb
class TechnologySeeder
  TECHNOLOGIES = [
    'Ruby',
    'Ruby on Rails',
    'React',
    'Docker',
    'AWS',
    'PostgreSQL',
    'Redis',
    'GraphQL',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'Git',
    'Kubernetes',
    'Kafka',
    'AWS Lambda',
    'AWS S3',
    'AWS CloudFront',
    'Firebase',
    'Vercel',
    'Heroku',
    'Webpack',
    'Bootstrap',
    'ElasticSearch',
    'CI/CD (e.g., Jenkins, GitHub Actions)',
    'Terraform',
    'Microservices Architecture',
    'Serverless Framework',
    'API Development',
    'OAuth',
    'gRPC',
    'Sidekiq',
    'RSpec',
    'Cypress',
    'Puma',
    'Nginx',
    'Google Cloud',
    'Stripe',
    'Twilio',
    'Sinatra',
    'Vue.js',
    'Spring',
    'Hibernate',
    'MySQL',
    'Android Development',
    'Java'
  ].freeze

  def self.seed
    TECHNOLOGIES.each do |tech_name|
      Technology.find_or_create_by(name: tech_name)
    end
  end
end
