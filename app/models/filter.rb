class Filter
  def text
    raise 'This method should be overriden in a derived class'
  end
end
 

class ElementaryFilter < Filter

  attr_accessor :field, :operator, :value
  
  def text
    return "#{@field}#{@operator}\"#{@value}\""
  end
  
end

class CompositeFilter < Filter

  attr_accessor :left, :operator, :right
      
  def text
    return "(#{@left.text} #{@operator} #{@right.text})"
  end
end