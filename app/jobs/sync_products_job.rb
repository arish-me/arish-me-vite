# frozen_string_literal: true

# app/jobs/sync_products_job.rb
class SyncProductsJob
  include Sidekiq::Job

  def perform
    Rails.logger.info('Starting sync with Product Hunt')
    ProductHuntSyncService.new.fetch_and_sync_products
    Rails.logger.info('Product Hunt sync completed')
  end
end
