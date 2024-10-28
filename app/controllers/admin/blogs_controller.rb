# app/controllers/admin/blogs_controller.rb
class Admin::BlogsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_blog, only: [:show, :edit, :update, :destroy]

  # GET /admin/blogs
  def index
    @blogs = Blog.all
  end

  # GET /admin/blogs/new
  def new
    @blog = Blog.new
  end

  def show
  end

  # POST /admin/blogs
  def create
    @blog = Blog.new(blog_params)
    if @blog.save
      redirect_to admin_blogs_path, notice: 'Blog was successfully created.'
    else
      render :new
    end
  end

  # GET /admin/blogs/:id/edit
  def edit; end

  # PATCH/PUT /admin/blogs/:id
  def update
    if @blog.update(blog_params)
      redirect_to admin_blogs_path, notice: 'Blog was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /admin/blogs/:id
  def destroy
    @blog.destroy
    redirect_to admin_blogs_path, notice: 'Blog was successfully deleted.'
  end

  private

  def set_blog
    @blog = Blog.friendly.find(params[:id])
  end

  def blog_params
    params.require(:blog).permit(:title, :brief, :url, :author_name, :author_username, :profile_picture, :body, :tags => [])
  end
end
