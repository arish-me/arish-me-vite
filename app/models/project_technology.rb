# frozen_string_literal: true

# app/models/project_technology.rb
class ProjectTechnology < ApplicationRecord
  belongs_to :project
  belongs_to :technology
end
