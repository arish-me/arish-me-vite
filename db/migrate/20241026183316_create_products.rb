# frozen_string_literal: true

# db/migrate/20241026183316_create_products.rb
class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products, id: :uuid do |t|
      t.string :name
      t.string :tagline
      t.text :description
      t.integer :comments_count
      t.integer :votes_count
      t.string :url
      t.string :website
      t.datetime :featured_at
      t.string :thumbnail_url

      t.timestamps
    end
  end
end
