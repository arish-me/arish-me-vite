# frozen_string_literal: true

# /db/migrate/create_about.rb
class CreateAbouts < ActiveRecord::Migration[7.1]
  def change
    create_table :abouts, id: :uuid do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
