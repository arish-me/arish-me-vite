# frozen_string_literal: true

# /db/migrate/create_projects.rb
class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects, id: :uuid do |t|
      t.string :title
      t.text :description
      t.string :live_url
      t.string :github_url

      t.timestamps
    end
  end
end
