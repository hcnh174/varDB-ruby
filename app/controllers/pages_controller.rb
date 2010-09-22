class PagesController < ApplicationController
  #include Mongo::Connection
  require 'rubygems'
  require 'mongo'
  include Mongo

  
  def homepage
    @title = 'varDB: Antigenic variation database'
    #render({:text => "<h1>Homepage</h1>"})
    
    connection = Mongo::Connection.new # (optional host/port args)
    connection.database_names.each { |name| puts name }
    connection.database_info.each { |info| puts info.inspect}
    
    db = Mongo::Connection.new.db("vardb")
    
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
