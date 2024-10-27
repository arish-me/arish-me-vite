# frozen_string_literal: true

class CreateBlogs < ActiveRecord::Migration[7.1]
  def change
    create_table :blogs, id: :uuid do |t|
      t.string :title
      t.text :brief
      t.string :url
      t.string :author_name
      t.string :author_username
      t.string :profile_picture
      t.text :tags, array: true, default: []
      t.timestamps
    end
  end
end
