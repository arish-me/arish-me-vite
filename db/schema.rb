# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 20_241_027_130_529) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'abouts', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'title'
    t.string 'description'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'action_text_rich_texts', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'name', null: false
    t.text 'body'
    t.string 'record_type', null: false
    t.uuid 'record_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[record_type record_id name], name: 'index_action_text_rich_texts_uniqueness', unique: true
  end

  create_table 'active_storage_attachments', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.uuid 'record_id', null: false
    t.uuid 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness',
                                                    unique: true
  end

  create_table 'active_storage_blobs', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.string 'service_name', null: false
    t.bigint 'byte_size', null: false
    t.string 'checksum'
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'active_storage_variant_records', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.uuid 'blob_id', null: false
    t.string 'variation_digest', null: false
    t.index %w[blob_id variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
  end

  create_table 'blogs', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'title'
    t.text 'brief'
    t.string 'url'
    t.string 'author_name'
    t.string 'author_username'
    t.string 'profile_picture'
    t.text 'tags', default: [], array: true
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'products', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'name'
    t.string 'tagline'
    t.text 'description'
    t.integer 'comments_count'
    t.integer 'votes_count'
    t.string 'url'
    t.string 'website'
    t.datetime 'featured_at'
    t.string 'thumbnail_url'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'node_id'
  end

  create_table 'project_technologies', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.uuid 'project_id', null: false
    t.uuid 'technology_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['project_id'], name: 'index_project_technologies_on_project_id'
    t.index ['technology_id'], name: 'index_project_technologies_on_technology_id'
  end

  create_table 'projects', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'title'
    t.text 'description'
    t.string 'live_url'
    t.string 'github_url'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'slug'
    t.index ['slug'], name: 'index_projects_on_slug', unique: true
  end

  create_table 'technologies', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'topics', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'name'
    t.text 'description'
    t.uuid 'product_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['product_id'], name: 'index_topics_on_product_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.integer 'role', default: 0
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'active_storage_variant_records', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'project_technologies', 'projects'
  add_foreign_key 'project_technologies', 'technologies'
  add_foreign_key 'topics', 'products'
end
