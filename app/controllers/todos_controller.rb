class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show edit update destroy ]

  def index
    @todos = Todo.all
  end

  def show; end
  def edit; end

  def new
    @todo = Todo.new
  end

  def create
    @todo = Todo.new(todo_params)
    @todo.save ? (redirect_to todo_url(@todo)) : (render :new)
  end

  def update
    @todo.update(todo_params) ? (redirect_to todo_url(@todo)) : (render :edit)
  end

  def destroy
    @todo.destroy
    redirect_to todos_url
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :description, :done)
  end
end
