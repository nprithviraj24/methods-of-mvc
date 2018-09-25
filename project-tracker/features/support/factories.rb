FactoryBot.define do
    factory :teacher, class: Teacher do
    email "joe_teacher@ait.asia"
    password "password"
    password_confirmation "password"
    end
end