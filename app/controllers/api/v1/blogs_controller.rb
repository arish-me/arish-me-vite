# frozen_string_literal: true

# api/v1/blogs_controller.rb
module Api
  module V1
    # api/v1/blogs_controller.rb
    class BlogsController < ApplicationController
      def index
        @blogs = Blog.all.order(created_at: :desc)
        render json: @blogs
      end
    end
  end
end
