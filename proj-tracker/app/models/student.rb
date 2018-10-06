class Student < ApplicationRecord
    has_many :teachers
    has_many :projects, through: :teachers
    
end
