class PagesController < ApplicationController
  include Mongo
  
  def homepage
    @title = 'varDB: Antigenic variation database'
    #render({:text => "<h1>Homepage</h1>"})

    connection = Connection.new
    connection.database_names.each { |name| puts name }
    #connection.database_info.each { |info| puts info.inspect}
    
    #db = Connection.new.db("vardb")
    
  end
  
  def feedback
    @title = 'varDB Feedback Form'
    @curpage = 'feedback'
  end
  
  def submitfeedback
    @title = 'varDB Feedback Form'
    @curpage = 'feedback'
    puts params[:email]
    render({:text => "Submitted. (#{params[:email]})"})
  end
end
