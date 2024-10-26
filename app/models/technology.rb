# frozen_string_literal: true

# app/models/technology.rb
class Technology < ApplicationRecord
  has_many :project_technologies
  has_many :projects, through: :project_technologies
end
