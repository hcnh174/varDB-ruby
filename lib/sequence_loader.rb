module SequenceLoader
  include Mongo
  
  def SequenceLoader.loadSequenceFolder(folder)
    excludes = [".svn"]
    Find.find(folder) do |path|      
      if FileTest.directory?(path)
        if excludes.include?(File.basename(path))
          Find.prune       # Don't look any further into this directory.
        else
          next
        end
      else
        if File.extname(path) == ".txt"
            puts path
            loadSequenceFile(path)
        end
      end
    end
  end
  
  def SequenceLoader.loadSequenceFile(path)
    puts "loadSequenceFile"
    File.open(path) do |file|
      line=file.gets
      fields=line.split('\t')
      puts fields
      while line=file.gets
        values=line.split('\t')
        params={}
        1..values.length do |index|
          field = fields[index]
          value = values[index]
          puts "#{field} = #{value}"
          params[field] = value
        end
        createSequence(params)
      end
    end
  end
  
  def SequenceLoader.createSequence(params)
    Sequence.create(params)
  end
end