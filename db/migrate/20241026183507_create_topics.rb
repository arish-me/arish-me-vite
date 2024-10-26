# frozen_string_literal: true

# db/migrate/20241026183507_create_topics.rb
class CreateTopics < ActiveRecord::Migration[7.1]
  def change
    create_table :topics, id: :uuid do |t|
      t.string :name
      t.text :description
      t.references :product, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
