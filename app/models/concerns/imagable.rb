# frozen_string_literal: true

# app/models/imagable.rb
module Imagable
  extend ActiveSupport::Concern

  included do
    has_one_attached :image do |attachable|
      attachable.variant :thumb, resize_to_limit: [32, 32]
      attachable.variant :thumb_2x, resize_to_limit: [64, 64]
    end

    validates :image, content_type: ['image/png', 'image/jpeg', 'image/jpg'],
                      max_file_size: 5.megabytes

    before_save :anonymize_image_filename

    def image_variants_urls
      return {} unless image.attached?

      {
        original: Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true),
        thumb: Rails.application.routes.url_helpers.rails_representation_url(image.variant(:thumb).processed,
                                                                             only_path: true),
        thumb_2x: Rails.application.routes.url_helpers.rails_representation_url(image.variant(:thumb_2x).processed,
                                                                                only_path: true)
      }
    end

    private

    def anonymize_image_filename
      return unless image.attached?

      image.blob.filename = "image#{image.filename.extension_with_delimiter}"
    end
  end
end
