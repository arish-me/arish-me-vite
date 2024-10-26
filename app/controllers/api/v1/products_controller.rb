# frozen_string_literal: true

module Api
  module V1
    # app/controllers/api/products_controller.rb
    class ProductsController < ApplicationController
      def index
        products = Product.all.order(featured_at: :desc)
        render json: products, include: [:topics]
      end
    end
  end
end
