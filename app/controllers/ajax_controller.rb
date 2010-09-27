class AjaxController < ApplicationController
  include Mongo

  def categories
    db = Connection.new.db("vardb")
    coll = db.collection("tags")

    @categories =
    {
      :pathogens => coll.find({"tagtype" => "pathogen"}, {:sort => ["name",:asc]}),
      :families => coll.find({"tagtype" => "family"}, {:sort => ["name",:asc]}),
      :diseases=> coll.find({"tagtype" => "disease"}, {:sort => ["name",:asc]})
    }
    
    render({:json => @categories})
  end 
 
  def comments

    #db = Connection.new.db("vardb")
    #coll = db.collection("comments")

    #@comments = coll.find({"identifier" => params[:identifier]},
    #  {:skip => params[:start].to_i, :limit => params[:limit].to_i, :sort => ["date",:desc]})
    #render({:json => { :comments => @comments, :count => @comments.count() }.to_json()})
 
    
    @comments = Comment.where(:identifier => params[:identifier]).sort(:date.desc).skip(params[:start].to_i).limit(params[:limit].to_i).all
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
