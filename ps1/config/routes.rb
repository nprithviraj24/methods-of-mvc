Rails.application.routes.draw do
  get 'extractor/index'  #this is for ps1 
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#index" 
  get '/parallel' => 'parallel#parallelrate'  #this is for google news
end
