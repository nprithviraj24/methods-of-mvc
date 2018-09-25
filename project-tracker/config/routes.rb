Rails.application.routes.draw do
  devise_for :students
  resources :projects
  resources :students
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "students#index"
end
