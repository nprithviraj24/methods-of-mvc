Rails.application.routes.draw do
  get 'users/new'
  # get 'projects/:id'
  devise_for :users
  
  resources :projects do
    resources :students
  end
  root to: "users#new"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
