class AjaxController < ApplicationController
  include Mongo
  
  def comments
#    puts params[:type]
#    puts params[:identifier]
#    puts params[:start]
#    puts params[:limit]
    
    headers["Content-Type"] = "application/json"
    
    db = Connection.new.db("vardb")
    coll = db.collection("comments")
    
    #List<CComment> comments=userService.getComments(type,identifier,paging);
    @comments = coll.find()

    render({:json => { :comments => @comments, :count => @comments.count() }.to_json()})

    #render({:text => 'Hi', :layout => false})
  end
  
  def submit_comment
    puts params[:type]
    puts params[:identifier]
    puts params[:text]
    
    #userService.addComment(getUserId(),type,identifier,text.trim());

    comment = {"user_id" => "todo", "type" => params[:type], "identifier" => params[:identifier],
      "text" => params[:text], "date" => "9/24/2010"}
      
    db = Connection.new.db("vardb")
    coll = db.collection("comments")
    coll.insert(comment)
    
    headers["Content-Type"] = "application/json"
    #render :layout => false
    render({:text => "{'success':true}"})
  end
  
  def announcements
    headers["Content-Type"] = "text/xml"
    render :layout => false
  end
end
