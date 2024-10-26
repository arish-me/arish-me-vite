# frozen_string_literal: true

# app/models/about.rb
class About < ApplicationRecord
  has_rich_text :body
end
