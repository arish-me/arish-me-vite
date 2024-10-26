# frozen_string_literal: true

# api/v1/projects_controller.rb
module Api
  module V1
    # api/v1/projects_controller.rb
    class ProjectsController < ApplicationController
      def index
        projects = Project.includes(:technologies).all
        render json: {
          projects: projects.map do |project|
            json_response(project)
          end
        }, status: :ok
      end

      def show
        project = Project.friendly.find(params[:id])

        render json: json_response(project), status: :ok
      end

      def create
        project = Project.new(project_params)
        if project.save
          render json: project, status: :created
        else
          render json: project.errors, status: :unprocessable_entity
        end
      end

      def update
        project = Project.friendly.find(params[:id])
        if project.update(project_params)
          render json: project
        else
          render json: project.errors, status: :unprocessable_entity
        end
      end

      def destroy
        project = Project.friendly.find(params[:id])
        project.destroy
        head :no_content
      end

      private

      def json_response(project)
        {
          id: project.id,
          title: project.title,
          description: project.description,
          github_url: project.github_url,
          live_url: project.live_url,
          slug: project.slug,
          body: project.body.to_s,
          image_url: image_urls(project),
          technologies: technologies_json(project)
        }
      end

      # Helper method to get image URLs if attached
      def image_urls(project)
        return nil unless project.image.attached?

        project.image_variants_urls
      end

      # Method to map technologies to JSON
      def technologies_json(project)
        project.technologies.map { |tech| { id: tech.id, name: tech.name } }
      end

      def project_params
        params.require(:project).permit(:title, :description, :github_url, :live_url, technology_ids: [])
      end
    end
  end
end
