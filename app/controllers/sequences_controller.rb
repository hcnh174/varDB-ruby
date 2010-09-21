class SequencesController < ApplicationController
  def homepage
    render({:text => "<h1>Homepage</h1>"})
  end
end
