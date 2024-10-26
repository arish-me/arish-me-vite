# frozen_string_literal: true

# db/migrate/20241026183950_add_node_id_to_products.rb
class AddNodeIdToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :node_id, :string
  end
end
