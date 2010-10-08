require 'treetop'
require 'pp'


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

#class ParentNode < Treetop::Runtime::SyntaxNode
#  
#  def filter_node(parent)
#    parent.left = left.filter_node
#    right.elements.each do |element|
#       if element.terminal?
#         parent.operator = element.text_value
#       else
#         parent.right = element.filter_node
#       end
#    end
#    nodes 
#  end
#end
#
#class TermNode < Treetop::Runtime::SyntaxNode
#  
#  def filter_node
#    filter = ElementaryFilter.new
#    filter.field =  elements[0].text_value
#    filter.operator =  elements[1].text_value
#    filter.value =  elements[2].text_value
#    filter
#  end
#end

Treetop.load 'query9'

#query = 'family="var" OR family="rif"'
#query = 'family="var" AND pathogen="pladmodium.falciparum"'
#query = '"dinner"'
#query = '>='
#query = 'family="var"'
#query = 'family="var" OR family="rif" OR family="vsg"'
#query = 'family'
#query = 'family="var" OR family="rif"'
query = '(family=var AND pathogen="pladmodium.falciparum") OR family=rif'

#puts query
parser = QueryParser.new
result = parser.parse(query)
pp result
#puts parser.inspect
#puts dumptree(result)
if result
  puts 'success'
  pp result.filters
  puts result.filters.text
  #filter = CompositeFilter.new
  #pp result.filter_node(filter)
  #pp result.content
else
  puts 'failure'
  puts "reason: #{parser.failure_reason}"
  puts "problem on line #{parser.failure_line} column #{parser.index+1}"
end