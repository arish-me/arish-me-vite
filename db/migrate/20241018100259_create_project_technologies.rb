# frozen_string_literal: true

# db/migrate/20241018100259_create_project_technologies.rb
class CreateProjectTechnologies < ActiveRecord::Migration[7.1]
  def change
    create_table :project_technologies, id: :uuid do |t|
      t.references :project, null: false, foreign_key: true, type: :uuid
      t.references :technology, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
