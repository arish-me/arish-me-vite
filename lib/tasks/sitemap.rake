# frozen_string_literal: true

# lib/tasks/sitemap.rake
namespace :sitemap do
  desc 'Generate sitemap.xml'
  task generate: :environment do
    require 'builder'

    # Define file path
    file_path = Rails.root.join('public', 'sitemap.xml')

    # Open file for writing
    File.open(file_path, 'w+') do |file|
      xml = Builder::XmlMarkup.new(target: file, indent: 2)

      # Sitemap structure
      xml.instruct! :xml, version: '1.0', encoding: 'UTF-8'
      xml.urlset xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' do
        # List all static and dynamic URLs
        xml.url do
          xml.loc 'www.arishdev.com/'
          xml.lastmod Time.now.strftime('%Y-%m-%d')
          xml.changefreq 'houry'
          xml.priority '1.0'
        end

        # Example: Iterate over your dynamic resources
        Project.find_each do |project|
          xml.url do
            xml.loc "/project/#{project.slug}"
            xml.lastmod project.updated_at.strftime('%Y-%m-%d')
            xml.changefreq 'weekly'
            xml.priority '0.8'
          end
        end

        Product.find_each do |product|
          xml.url do
            xml.loc product.website
            xml.lastmod product.updated_at.strftime('%Y-%m-%d')
            xml.changefreq 'daily'
            xml.priority '0.5'
          end
        end

        xml.url do
          xml.loc '/blogs'
          xml.lastmod Time.now.utc
          xml.changefreq 'weekly'
          xml.priority '0.8'
        end

        xml.url do
          xml.loc '/startups'
          xml.lastmod Time.now.utc
          xml.changefreq 'hourly'
          xml.priority '0.8'
        end

        # Add more URLs as needed
      end
    end

    puts "Sitemap generated at #{file_path}"
  end
end
