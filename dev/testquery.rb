require 'treetop'
require 'pp'

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

#filter = CompositeFilter.new(nil,'AND',nil)

#filter1 = ElementaryFilter.new('family','=','var')
#filter2 = ElementaryFilter.new('family','=','rif')
#filter = CompositeFilter.new(filter1,'OR',filter2)
#puts filter.text


Treetop.load 'query4'

#query = 'family="var" OR family="rif"'
#query = 'family="var"'
#query = '"dinner"'
#query = '>='
#query = 'family="var"'
query = 'family="var" OR family="rif" OR family="vsg"'
#query = 'family'

#puts query
parser = QueryParser.new
result = parser.parse(query)
#pp result
#puts dumptree(result)
if result
  puts 'success'
  pp result.content
else
  puts 'failure'
end