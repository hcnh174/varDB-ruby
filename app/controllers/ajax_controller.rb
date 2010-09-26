class AjaxController < ApplicationController
  include Mongo
  
  def comments

    db = Connection.new.db("vardb")
    coll = db.collection("comments")

    @comments = coll.find({"type" => params[:type], "identifier" => params[:identifier]},
      {:skip => params[:start].to_i, :limit => params[:limit].to_i, :sort => ["date",:desc]})

    render({:json => { :comments => @comments, :count => @comments.count() }.to_json()})
  end
  
  def submit_comment
    
    comment = Comment.create({
      "user_id" => "todo",
      "type" => params[:type],
      "identifier" => params[:identifier],
      "text" => params[:text],
      "date" => DateTime.now
    })
    puts comment.user_id
 
    render({:json => {:success => true}})
  end
  
  def announcements
    headers["Content-Type"] = "text/xml"
    render :layout => false
  end
  
  def sequences
    db = Connection.new.db("vardb")
    coll = db.collection("sequences")

    @sequences = coll.find()
      #{:skip => params[:start].to_i, :limit => params[:limit].to_i, :sort => ["date",:desc]})

    render({:json => { :sequences => @sequences, :count => @sequences.count() }.to_json()})
  end
  
  def families
    db = Connection.new.db("vardb")
    coll = db.collection("tags")
   
    @families = coll.find()
      #{:skip => params[:start].to_i, :limit => params[:limit].to_i, :sort => ["date",:desc]})

    render({:json => { :families => @families, :count => @families.count() }.to_json()})
  end
end
