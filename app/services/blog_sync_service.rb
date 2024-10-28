# frozen_string_literal: true

# app/services/blog_sync_service.rb
require 'net/http'
require 'json'

class BlogSyncService
  HASHNODE_QUERY = <<-GRAPHQL
    query {
      publication(host: "arish.hashnode.dev") {
        url
        author {
          id
          username
          name
          profilePicture
        }
        posts(first: 3) {
          edges {
            node {
              tags {
                id
                name
              }
              title
              brief
              url
            }
          }
        }
      }
    }
  GRAPHQL

  HASHNODE_API_URL = 'https://gql.hashnode.com'

  def initialize
    @url = URI(HASHNODE_API_URL)
    @headers = {
      'Content-Type' => 'application/json'
    }
  end

  def sync
    blogs = []
    blogs.concat(fetch_hashnode_blogs)
    blogs.each { |blog| Blog.find_or_create_by(url: blog[:url]) { |b| b.assign_attributes(blog) } }
  end

  def fetch_data_from_query
    body = {
      query: HASHNODE_QUERY
    }.to_json

    response = Net::HTTP.post(@url, body, @headers)
    JSON.parse(response.body)
  rescue StandardError => e
    Rails.logger.error("Failed to fetch data from Hashnode: #{e.message}")
    nil
  end

  def fetch_hashnode_blogs
    data = fetch_data_from_query

    if data&.dig('data', 'publication')
      data['data']['publication']['posts']['edges'].map do |post|
        {
          title: post['node']['title'],
          brief: post['node']['brief'],
          url: post['node']['url'],
          author_name: data['data']['publication']['author']['name'],
          author_username: data['data']['publication']['author']['username'],
          profile_picture: data['data']['publication']['author']['profilePicture'],
          tags: post['node']['tags'].map { |tag| tag['name'] },
          resource_type: 1
        }
      end
    else
      Rails.logger.error("Hashnode API returned an error: #{data['errors']}")
      []
    end
  end

  def self.fetch_devto_blogs
    # Fetch data from Dev.to API and parse response
  end
end
