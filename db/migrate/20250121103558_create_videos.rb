class CreateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos, id: :uuid do |t|
      t.string :title
      t.string :video_id
      t.string :url
      t.string :resource

      t.timestamps
    end
  end
end
