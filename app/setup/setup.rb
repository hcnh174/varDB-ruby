require 'optparse'
require 'optparse/time'
require 'ostruct'
require 'pp'

class Setup

 def self.parse(args)
    options = OpenStruct.new
    
    opts = OptionParser.new do |opts|
      opts.banner = "Usage: example.rb [options]"    
    
      opts.on_tail("-h", "--help", "Show this message") do
        puts opts
        exit
      end
      
      opts.on_tail("--version", "Show version") do
        puts OptionParser::Version.join('.')
        exit
      end
    end
    
    opts.parse!(args)
    options
 end

end

options = Setup.parse(ARGV)
pp options