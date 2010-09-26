class User
  include MongoMapper::Document
  
  #attr_accessor :name, :email
  
  key :username, String
  key :first_name, String
  key :last_name, String
  key :email, String
  key :affiliation, String
  timestamps!

end
