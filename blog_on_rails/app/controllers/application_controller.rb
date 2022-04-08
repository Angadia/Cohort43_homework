class ApplicationController < ActionController::Base
  private

  def authenticate_user!
    redirect_to new_session_path, { status: 303, alert: 'Please Sign In or Sign Up' } unless user_signed_in?
  end
  helper_method :authenticate_user!

  def user_signed_in?
    current_user.present?
  end
  helper_method :user_signed_in?

  def current_user
    @current_user ||= User.find_by_id session[:user_id]
  end
  helper_method :current_user
end
