class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @post = Post.find params[:post_id]
    @comment = Comment.new params.require(:comment).permit(:body)
    @comment.user = current_user
    @comment.post = @post
    if @comment.save
      redirect_to post_path(@post), status: 303
    else
      @comments = @post.comments.order(created_at: :desc)
      render 'posts/show', status: 303
    end
  end

  def destroy
    @comment = Comment.find params[:id]
    @comment.destroy
    redirect_to post_path(@comment.post), status: 303
  end
end
