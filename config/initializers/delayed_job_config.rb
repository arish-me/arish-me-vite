# config/initializers/delayed_job_config.rb
Delayed::Worker.logger = Logger.new(Rails.root.join("log", "delayed_job.log"))

