class Tag
  include MongoMapper::Document

  key :_type, String
  key :tagidentifier, String, :required => true
  key :tagtype, String, :required => true
  key :identifier, String, :required => true
  key :name, String
  key :description, String
  #key :color, String
  #key :bgcolor, String
  key :numitems, Integer  
  timestamps!
  
  def initialize(params)
    super(params)
    self[:tagtype] = self[:_type].downcase
    self[:tagidentifier] = "#{self[:tagtype]}:#{self[:identifier]}"
    puts self
  end
  
end
