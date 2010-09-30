#"clans.txt", "pfamA.txt", "clan_membership.txt"

require 'open-uri'
require 'pp'
require 'net/ftp'
require 'zlib'

def download_pfam_files(filenames)
  ftp = Net::FTP.new('ftp.sanger.ac.uk')
  ftp.login
  ftp.chdir('pub/databases/Pfam/releases/Pfam24.0/database_files/')
  filenames.each do |filename|
    if File.exists?(filename)
      puts "file exists, skipping: #{filename}"
      next
    end
    puts "downloading pfam file #{filename}"
    ftp.getbinaryfile(filename,filename,1024)
  end
end

def unzip_files(filenames)
  filenames.each do |filename|
    unzip_file(filename)
  end
end

def unzip_file(filename)
  if !File.exists?(filename)
    return
  end
  newfilename = filename.chop.chop.chop # take off .gz extension
  puts newfilename
  Zlib::GzipReader.open(filename) {|gz|
    File.open(newfilename, 'w') do |outfile|  
      outfile.puts gz.read  
    end
  }
end

def load_pfam_file(filename)
  IO.foreach(filename) do |line|
      line.chomp!
      values=line.split("\t")
      values = values.collect {|value| value.reverse.chop.reverse.chop }
      hash = Hash.new
      hash[:auto_pfama] = values[0]
      hash[:identifier] = values[2] #pfama_id
      hash[:name] = values[1] #pfamA_acc
      hash[:description] = values[4]
      hash[:type] = values[8]
      #hash[:clan] = values[0] #clans.clan_id
      puts hash
  end
end

def load_clan_file(filename)
  IO.foreach(filename) do |line|
      line.chomp!
      values=line.split("\t")
      values = values.collect {|value| value.reverse.chop.reverse.chop }
      hash = Hash.new
      hash[:auto_clan] = values[0]
      hash[:identifier] = values[2] #clan_id
      hash[:name] = values[1] #clan_acc
      hash[:description] = values[4] #clan_description
      puts hash
  end
end

filenames = %w{clans.txt.gz pfamA.txt.gz clan_membership.txt.gz}

#download_pfam_files(filenames)
#unzip_files(filenames)
#load_pfam_file('pfamA.txt')
load_clan_file('clans.txt')

