Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
    # get '/rails/active_storage/blobs/:signed_id/*filename' => 'active_storage/blobs#show', as: 'rails_blob'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :projects
      resources :abouts
    end
  end

  root "pages#index"

  get '*path', to: 'pages#index', constraints: lambda { |req|
    req.path !~ %r{^/rails/active_storage}
  }, defaults: { format: :html }
end
