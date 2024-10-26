# frozen_string_literal: true

# app/models/topic.rb
class Topic < ApplicationRecord
  belongs_to :product
end
