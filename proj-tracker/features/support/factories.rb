FactoryBot.define do
    factory :admin, class: User do
        email "random@something"
        #role 1  
        password "password"
        password_confirmation "password"
    end

    factory :project do #account
        name "123456"
        url "50" #balance
    end
    
    factory :student do #user
        name "asdf"
        id "1"
    end
end