# frozen_string_literal: true

# app/validators/attached_validator.rb
class AttachedValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors.add(attribute, :attached, **options) unless value.attached?
  end
end
