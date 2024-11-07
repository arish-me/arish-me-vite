# frozen_string_literal: true

# app/models/project.rb
class Project < ApplicationRecord
  extend FriendlyId
  include Imagable
  friendly_id :title, use: :slugged
  has_rich_text :body

  default_scope { order(:position) }

  has_many :project_technologies, dependent: :destroy
  has_many :technologies, through: :project_technologies

  validates :title, presence: true

  def should_generate_new_friendly_id?
    title_changed?
  end
end
