class Feedback
  include MongoMapper::Document

  key :name, String
  key :affiliation, String
  key :email, String
  key :purpose, String
  key :comments, String
  key :date, DateTime
  timestamps!
  
end