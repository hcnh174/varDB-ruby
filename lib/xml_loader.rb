module XmlLoader
  include Mongo
  
  def XmlLoader.loadxmlfile(path)
    xml=REXML::Document.new(File.open(path))
    #puts "Root element: #{xml.root.name}"
    xml.elements.each('vardb/family') do |ele|
      createfamily(ele)
    end
  end
  
  def XmlLoader.createfamily(element)
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
