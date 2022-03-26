class PostsController < ApplicationController
  before_action :authenticate_user!, except: %i[index show]
  before_action :find_post, only: %i[show edit update destroy]

  def index
    @posts = Post.order(created_at: :DESC)
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new post_params
    @post.user = current_user
    if @post.save
      redirect_to post_path(@post), { status: 303, notice: 'Post created successfully' }
    else
      render :new, status: 303
    end
  end

  def show
    @comment = Comment.new
    @comments = @post.comments.order(created_at: :desc)
  end

  def edit; end

  def update
    if @post.update post_params
      redirect_to post_path(@post), { status: 303, notice: 'Post updated successfully' }
    else
      render :edit, status: 303
    end
  end

  def destroy
    @post.destroy
    redirect_to root_path, { status: 303, notice: 'Post deleted successfully' }
  end

  private

  def find_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
