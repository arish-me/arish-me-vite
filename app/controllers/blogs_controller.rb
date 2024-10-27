# frozen_string_literal: true

class BlogsController < ApplicationController
  def index
    @blogs = BlogPost.order(created_at: :desc).limit(10)
    render json: @blogs
  end
end
