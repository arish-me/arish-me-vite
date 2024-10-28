# frozen_string_literal: true

require 'sidekiq/web'
Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin/arish-me', as: 'rails_admin'
  authenticate :user, ->(u) { u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  devise_for :users, skip: %i[registrations passwords confirmations unlocks]
  get 'up' => 'rails/health#show', as: :rails_health_check
  # get '/rails/active_storage/blobs/:signed_id/*filename' => 'active_storage/blobs#show', as: 'rails_blob'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :projects
      resources :products
      resources :abouts
      resources :blogs
    end
  end

  namespace :admin do
    resources :blogs
  end
  root 'pages#index'

  get '*path', to: 'pages#index', constraints: lambda { |req|
    req.path !~ %r{^/rails/active_storage}
  }, defaults: { format: :html }
end
