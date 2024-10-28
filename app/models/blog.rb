# frozen_string_literal: true

class Blog < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  has_rich_text :body
  enum resource_type: { custom: 0, hashnode: 1, medium: 2 }

  def should_generate_new_friendly_id?
    title_changed?
  end
end
