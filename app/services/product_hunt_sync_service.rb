# frozen_string_literal: true

require 'net/http'
require 'json'

# app/services/product_hunt_sync_service.rb
class ProductHuntSyncService
  PRODUCT_HUNT_API_URL = 'https://api.producthunt.com/v2/api/graphql'

  def initialize
    @url = URI(PRODUCT_HUNT_API_URL)
    @headers = {
      'Authorization' => "Bearer #{ENV.fetch('PRODUCT_HUNT_API', nil)}",
      'Content-Type' => 'application/json'
    }
  end

  def fetch_and_sync_products
    response = fetch_data_from_product_hunt
    data = JSON.parse(response.body)

    if data['data'].nil?
      Rails.logger.error("Product Hunt API returned an error: #{data['errors']}")
      return
    end

    data['data']['posts']['edges'].each do |edge|
      product_data = edge['node']
      sync_product_and_topics(product_data)
    end
  end

  private

  GRAPHQL_QUERY = <<-GRAPHQL
        {
          posts {
            edges {
              node {
                id
                name
                tagline
                description
                commentsCount
                votesCount
                url
                website
                featuredAt
                thumbnail {
                  url
                }
                topics {
                  edges {
                    node {
                      id
                      name
                      description
                    }
                  }
                }
              }
            }
          }
        }
  GRAPHQL

  def fetch_data_from_product_hunt
    body = {
      query: GRAPHQL_QUERY
    }.to_json

    Net::HTTP.post(@url, body, @headers)
  rescue StandardError => e
    Rails.logger.error("Failed to fetch data from Product Hunt: #{e.message}")
  end

  def sync_product_and_topics(product_data)
    product = Product.find_or_initialize_by(node_id: product_data['id'])
    product.update!(
      name: product_data['name'],
      tagline: product_data['tagline'],
      description: product_data['description'],
      comments_count: product_data['commentsCount'],
      votes_count: product_data['votesCount'],
      url: product_data['url'],
      website: product_data['website'],
      featured_at: product_data['featuredAt'],
      thumbnail_url: product_data['thumbnail']['url']
    )

    Rails.logger.info("Product #{product.name} updated successfully")
    sync_topic(product_data, product)
  end

  def sync_topic(product_data, product)
    # Sync topics
    product_data['topics']['edges'].each do |topic_data|
      topic = product.topics.find_or_initialize_by(id: topic_data['node']['id'])
      topic.update!(
        name: topic_data['node']['name'],
        description: topic_data['node']['description']
      )

      Rails.logger.info("Topic #{topic.name} for product #{product.name} updated successfully")
    end
  end
end
