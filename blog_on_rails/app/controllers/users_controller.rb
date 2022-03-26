class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[edit update]
  before_action :find_user, only: %i[edit update]

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, status: 303
    else
      render :new, status: 303
    end
  end

  def edit; end

  def update
    if @user&.update user_params.except(:password, :password_confirmation)
      redirect_to root_path, status: 303
    else
      render :edit, status: 303
    end
  end

  private

  def find_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
