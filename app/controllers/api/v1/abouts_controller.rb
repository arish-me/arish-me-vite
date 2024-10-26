# frozen_string_literal: true

# api/v1/abouts_controller.rb
module Api
  module V1
    # api/v1/abouts_controller.rb
    class AboutsController < ApplicationController
      def index
        about = About.first
        render json: {
          about_me:
            {
              id: about.id,
              title: about.title,
              description: about.description,
              body: about.body.to_s # Add this line to include the body
            }

        }, status: :ok
      end

      def show; end

      def create; end

      def update; end

      def destroy; end

      private

      def project_params
        params.require(:about).permit(:title, :description)
      end
    end
  end
end
