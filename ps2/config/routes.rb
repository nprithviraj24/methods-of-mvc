Rails.application.routes.draw do
  get 'basics/quotations'
  post 'basics/quotations'

  get "basics/quotations/:id", to: "basics#kill"
  get "basics/erase", to: "basics#erase"
  get "basics/search", to: "basics#search"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
