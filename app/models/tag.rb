class Tag
  include MongoMapper::Document

  key :_type, String
  key :tagidentifier, String
  key :tagtype, String, :required => true  
  key :identifier, String
  key :name, String
  key :description, String
  #key :color, String
  #key :bgcolor, String
  key :numitems, Integer  
  timestamps!
  
end
