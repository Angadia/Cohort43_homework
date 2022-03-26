Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root 'posts#index'
  resources :posts, except: [:index] do
    resources :comments, shallow: true, only: %i[create destroy]
  end

  resources :users, only: %i[new create]
  resource :session, only: %i[new create destroy]
end
