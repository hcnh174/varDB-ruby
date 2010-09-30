class Term  
  include MongoMapper::Document
  
  key :identifier, String
  key :term, String
  key :definition, String
  key :pages, String
  key :ref, String
  timestamps!
end