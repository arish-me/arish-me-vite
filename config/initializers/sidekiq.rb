require 'sidekiq/cron/job'

Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://localhost:6379/0' } # Ensure your Redis URL is correct

  # Define cron jobs here
  config.on(:startup) do
    Sidekiq::Cron::Job.load_from_hash YAML.load_file(Rails.root.join("config/sidekiq_cron.yml"))
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://localhost:6379/0' }
end
