# frozen_string_literal: true

# app/jobs/sync_sitemap_job.rb
class SyncSitemapJob
  include Sidekiq::Job

  def perform
    Rails.logger.info('Starting sync with sitemap')

    # Ensure Rake is loaded
    load_rake_tasks

    # Execute the Rake task
    Rake::Task['sitemap:generate'].invoke

    Rails.logger.info('Sitemap sync completed')
  end

  private

  def load_rake_tasks
    # Load Rake environment and tasks if not already loaded
    return if defined?(Rake.application)

    Rails.application.load_tasks
  end
end

