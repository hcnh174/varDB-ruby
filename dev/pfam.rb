#"clans.txt", "pfamA.txt", "clan_membership.txt"

require 'open-uri'
require 'pp'
require 'net/ftp'

ftp = Net::FTP.new('ftp.sanger.ac.uk')
ftp.login
ftp.chdir('pub/databases/Pfam/releases/Pfam24.0/database_files/')
files = ftp.list('n*')
ftp.getbinaryfile('pfamA.txt.gz','pfamA.gz',1024)

#
#filename = 'pfamA.txt.gz'
#open("ftp://ftp.sanger.ac.uk/pub/databases/Pfam/releases/Pfam24.0/database_files/#{filename}") do |file|
#  puts file
#end
#
#
#Zlib::GzipReader.open('pfamA.txt.gz') {|gz|
#  print gz.read
#}

#File.open('hoge.gz') do |f|
#  gz = Zlib::GzipReader.new(f)
#  print gz.read
#  gz.close
#end
