class PagesController < ApplicationController
  include Mongo
  #include Bio
  #include Rails::ExtJS::Direct::Controller
  #direct_actions :foo, :bar
  
  before_filter :authenticate_user!

  
  def homepage
    #puts current_user
    
    #@title = 'varDB: Antigenic variation database'
    #render({:text => "<h1>Homepage</h1>"})

    #connection = Connection.new
    #connection.database_names.each { |name| puts name }
    #connection.database_info.each { |info| puts info.inspect}
    
    #db = Connection.new.db("vardb")
    
    #seq = Bio::Sequence::NA.new("atgcatgcaaaa")
    #seq = Sequence::NA.new("atgcatgcaaaa")
    #puts seq
    
    db = Connection.new.db("vardb")
    coll = db.collection("tags")

    @pathogens = coll.find({"tagtype" => "pathogen"}, {:sort => ["name",:asc]})
    @families = coll.find({"tagtype" => "family"}, {:sort => ["name",:asc]})
    @diseases = coll.find({"tagtype" => "disease"}, {:sort => ["name",:asc]})
    
    @categoriesjson = { :pathogens => @pathogens, :families => @families, :diseases=> @diseases}.to_json()
  end
  
  def feedback
    #@title = 'varDB Feedback Form'
    #@curpage = 'feedback'
  end
  
  def submitfeedback
    #@title = 'varDB Feedback Form'
    #@curpage = 'feedback'
    puts params[:email]
    render({:text => "Submitted. (#{params[:email]})"})
  end
  
  def pathogens  
  end

  def pathogen
  end

  def families
    db = Connection.new.db("vardb")
    coll = db.collection("tags")

    @families = coll.find({"tagtype" => "family"}, {:sort => ["name",:asc]})

    #render({:json => { :families => @families, :count => @families.count() }.to_json()})
  end

  def family
  end

  def diseases  
  end

  def disease  
  end

  def pfams
  end

  def pfam
  end

  def structures  
  end

  def structure
  end

  def sequence
    db = Connection.new.db("vardb")
    coll = db.collection("sequences")
    @sequence = coll.find_one("accession" => params[:accession])
  end

  def antigenicvariation
  end

  def references
  end

  def terms
  end

  def database
  end
end
