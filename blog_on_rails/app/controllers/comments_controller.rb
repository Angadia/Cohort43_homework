class CommentsController < ApplicationController
  def create
    @comment = Comment.new({ body: params[:body], post_id: params[:post_id] })
    @comment.save
    redirect_to post_path(params[:post_id]), status: 303
  end

  def destroy
    @comment = Comment.find params[:id]
    @comment.destroy
    redirect_to post_path(@comment.post_id), status: 303
  end
end
