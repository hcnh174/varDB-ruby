class Filter
  
  def text
    raise 'This method should be overriden in a derived class'
  end
end
 

class ElementaryFilter < Filter

  attr_accessor :field, :operator, :value
 
#  def initialize(field, operator, value)
#    super
#    @field=field
#    @operator=operator
#    @value=value
#  end
  
  def text
    return "#{@field}#{@operator}#{@value}"
  end
  
end

class CompositeFilter < Filter

  attr_accessor :left, :operator, :right
    
#  def initialize(left, operator, right)
#    super
#    @left=left
#    @operator=operator
#    @right=right
#  end
  
  def text
    return "#{@left.text} #{@operator} (#{@right.text})"
  end
end
