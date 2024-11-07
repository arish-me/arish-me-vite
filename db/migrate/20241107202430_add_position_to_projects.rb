class AddPositionToProjects < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :position, :integer, default: 0
  end
end
