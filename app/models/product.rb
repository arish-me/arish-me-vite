# frozen_string_literal: true

# app/models/product.rb
class Product < ApplicationRecord
  has_many :topics, dependent: :destroy
end
