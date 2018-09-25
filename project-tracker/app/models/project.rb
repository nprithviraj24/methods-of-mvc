class Project < ApplicationRecord
    has_many :relations
    has_many :students, through: :relations
end
