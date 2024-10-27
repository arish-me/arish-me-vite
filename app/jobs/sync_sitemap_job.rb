# frozen_string_literal: true

# app/jobs/sync_sitemap_job.rb.rb
class SyncSiteMapJob < ApplicationJob
  queue_as :default

  def perform
    Rails.logger.info('Starting sync with sitemap')

    # Execute the Rake task
    Rake::Task['sitemap:generate'].invoke

    Rails.logger.info('Sitemap sync completed')
  end
end
