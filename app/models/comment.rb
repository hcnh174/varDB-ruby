class Comment
  include MongoMapper::Document

  key :user_id, String
  key :type, String
  key :identifier, String
  key :text, String
  key :date, String
  timestamps!
  
end
