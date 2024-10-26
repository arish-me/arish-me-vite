# frozen_string_literal: true

# /db/migrate/create_technologies.rb
class CreateTechnologies < ActiveRecord::Migration[7.1]
  def change
    create_table :technologies, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
  end
end
