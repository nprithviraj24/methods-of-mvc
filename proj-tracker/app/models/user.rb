class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_parameters)
    respond_to do |format|
      if @user.save
        format.html { redirect_to root_path, notice: "Successfully sign up" }
      else
        format.html { render :new, error: "Invalid input" }
      end
    end
  end
  
  private
  
  def user_parameters
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
