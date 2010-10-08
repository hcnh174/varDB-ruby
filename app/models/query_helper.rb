require 'treetop'
require 'pp'

class QueryHelper
  
  def parse(query)
    Treetop.load 'query'
    
    parser = QueryParser.new
    result = parser.parse(query)
    pp result
    #puts parser.inspect
    #puts dumptree(result)
    if result
      puts 'success'
      pp result.filters
      puts result.filters.text
      return filter
    else
      puts 'failure'
      puts "reason: #{parser.failure_reason}"
      puts "problem on line #{parser.failure_line} column #{parser.index+1}"
      return nil
    end
  end
  
end