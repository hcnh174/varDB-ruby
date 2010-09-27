module AdminHelper
#  def loadxmlfile(path)
#    xml=REXML::Document.new(File.open(path))
#    #puts "Root element: #{xml.root.name}"
#    xml.elements.each('vardb/family') do |ele|
#      createfamily(ele)
#    end
#  end
#  
#  def createfamily(element)
#    params={
#      "tagtype" => "family",
#      "identifier" => element.attributes["identifier"],
#      "pathogen" => element.attributes["pathogen"]
#    }
#    element.each_element do |child|
#      puts "#{child.name} = #{child.text()}"
#      params[child.name] = child.text()
#    end
#    Family.create(params)    
#  end  
end
