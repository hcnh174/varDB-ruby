class Tag
  include MongoMapper::Document

  #key :user_id, String
  key :identifier, String

  timestamps!
  
end
