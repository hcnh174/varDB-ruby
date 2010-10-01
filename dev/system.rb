#system("dir c:\\projects\\vardbruby\\dev\\")

#require 'open3'
#stdin, stdout, stderr = Open3.popen3('dir c:\\')
#puts stdout.gets
#puts stdout.gets
#puts stdout.gets
#puts stdout.gets

require 'open3'
Open3.popen3('dir c:\\') do |stdin, stdout, stderr|
  puts "stdout - #{stdout.readlines}"
  puts "stderr - #{stderr.readlines}"
end
#puts stdout.gets
#puts stdout.gets
#puts stdout.gets
#puts stdout.gets


#gem install open4

#require "open4"
##pid, stdin, stdout, stderr = Open4::popen4 "dir c:\\" 
##puts $?
##puts pid
##ignored, status = Process::waitpid2 pid
##puts status.to_i
#
#
#status = Open4::popen4("false") do |pid, stdin, stdout, stderr|
#  puts "PID #{pid}" 
#end
#puts status
