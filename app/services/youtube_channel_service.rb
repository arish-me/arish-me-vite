# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

class YoutubeChannelService
  BASE_URL = 'https://youtube.googleapis.com/youtube/v3/search'
  API_KEY = ENV.fetch('GOOGLE_API_KEY', nil)
  CHANNEL_ID = 'UCEpqmJ8k_jq2n-50xQaYE1g' # Replace with the channel ID you want to search for

  def self.search_channel_videos
    uri = URI.parse("#{BASE_URL}?part=snippet&channelId=#{CHANNEL_ID}&key=#{API_KEY}")

    # Send GET request to the YouTube API
    response = Net::HTTP.get(uri)

    # Parse the JSON response
    result = JSON.parse(response)

    # Extract the video details
    if result['items'].any?
      result['items'].each do |item|
        next unless item['id']['kind'] == 'youtube#video'

        video_id = item['id']['videoId']
        video_title = item['snippet']['title']
        video_url = "https://www.youtube.com/embed/#{video_id}"

        # Save or update the video in the database
        save_or_update_video(video_id, video_title, video_url)
      end
    else
      puts 'No videos found for this channel.'
    end
  end

  # Save or update the video in the database
  def self.save_or_update_video(video_id, video_title, video_url)
    video = Video.find_or_initialize_by(video_id: video_id)
    video.update(
      title: video_title,
      url: video_url,
      resource: 'youtube'
    )
    puts "Saved/Updated Video: #{video.title} (ID: #{video.video_id})"
  end
end
