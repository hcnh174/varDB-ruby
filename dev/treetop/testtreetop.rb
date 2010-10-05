require 'treetop'
require 'pp'

class ParenNode < Treetop::Runtime::SyntaxNode
  def depth
    if nonterminal?
      parenthesized_letter.depth + 1
    else
      0
    end
  end
end

#module ParenNode
#  def depth
#    if nonterminal?
#      parenthesized_letter.depth + 1
#    else
#      0
#    end
#  end
#end


#Treetop.load 'arithmetic'
Treetop.load 'paren_language'

#query = '1+2*3'
query="(((a)))"

#puts query
parser = ParenLanguageParser.new
result = parser.parse(query)
pp result
if result
  puts 'success'
  #pp result.content
else
  puts 'failure'
  puts "reason: #{parser.failure_reason}"  
end