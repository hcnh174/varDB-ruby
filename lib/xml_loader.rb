module XmlLoader
  include Mongo
  
  def XmlLoader.loadXmlFolder(folder) #"c:/projects/vardb/data/"
    excludes = [".svn"]
    Find.find(folder) do |path|      
      if FileTest.directory?(path)
        if excludes.include?(File.basename(path))
          Find.prune       # Don't look any further into this directory.
        else
          next
        end
      else
        if File.extname(path) == ".xml"
            puts path
            loadXmlFile(path)
        end
      end
    end
  end
  
  def XmlLoader.loadXmlFile(path)
    xml=REXML::Document.new(File.open(path))
    #puts "Root element: #{xml.root.name}"
    xml.elements.each('vardb/family') do |ele|
      createFamily(ele)
    end
  end
  
  def XmlLoader.createFamily(element)
    params={
      "tagtype" => "family",
      "identifier" => element.attributes["identifier"],
      "pathogen" => element.attributes["pathogen"]
    }
    element.each_element do |child|
      if !child.text().empty?
        puts "#{child.name} = #{child.text()}"
        params[child.name] = child.text()
      end
    end
    Family.create(params)    
  end
end
