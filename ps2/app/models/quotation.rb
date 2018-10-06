class Quotation < ApplicationRecord
  attr_accessor :new_category 
  def self.search(search)
    where("quote LIKE", "%#{search}%")
  end
  #def only_one_at_a_time
   # logger.debug(:new_category.present?)
    #if :category.present? && :new_category.present?
     # errors.add(:new_category, "only one category at a time")
      #errors.add(:new_category, "only one category at a time")
    #end

  #end

  validates_presence_of :author_name, :message => "Please enter author name"


  #validates_presence_of :category, :message => "Please select category name"
  validates_presence_of :quote, :message =>"Please enter quote"
  #validate :only_one_at_a_time



end
