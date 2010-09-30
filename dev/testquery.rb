require 'treetop'
require 'pp'

Treetop.load 'query2'

query = 'family="var" OR family="rif"'
#query = 'family="var"'
#query = '"dinner"'
#query = '>='
#query = 'family="var"'
#query = 'family'

#puts query
parser = QueryParser.new
result = parser.parse(query)
#pp result
#puts dumptree(result)
pp result.content
if result
  puts 'success'  
else
  puts 'failure'
end