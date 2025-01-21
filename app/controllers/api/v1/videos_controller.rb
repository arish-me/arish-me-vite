# frozen_string_literal: true

# api/v1/abouts_controller.rb
module Api
  module V1
    # api/v1/abouts_controller.rb
    class VideosController < ApplicationController
      def index
        videos = Video.all
        render json: {
          videos:
        }, status: :ok
      end
    end
  end
end
