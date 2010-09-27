require 'xml_loader'

class AdminController < ApplicationController
  #include xml_loader

  #include rexml
  
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
#    family = Family.create(params)    
#  end
#  
#  def loadxmlfile(path)
#    xml=REXML::Document.new(File.open(path))
#    #puts "Root element: #{xml.root.name}"
#    xml.elements.each('vardb/family') do |ele|
#      createfamily(ele)
#    end
#  end
#  
  def loadxmlfolder
    #Dir.foreach("c:/projects/vardb/data/pathogens/protists/plasmodium.falciparum/") do |entry|
    #   puts entry
    #end
    excludes = [".svn"]
    Find.find("c:/projects/vardb/data/") do |path|      
      if FileTest.directory?(path)
        if excludes.include?(File.basename(path))
          Find.prune       # Don't look any further into this directory.
        else
          next
        end
      else
        if File.extname(path) == ".xml"
            puts path
            XmlLoader.loadxmlfile(path)
        end
      end
    end

    
#    File.open(postings_list_file).each do |file|
#    file.each do |line|
#      line.split(',').each {|id| postings << id.to_i}
#    end
    render({:text => "Done"})
  end
  
  
  def preload
    
    xml=REXML::Document.new(File.open('d:/projects/vardb/data/pathogens/protists/plasmodium.falciparum/plasmodium.falciparum.var.xml'))
    puts "Root element: #{xml.root.name}"
    xml.elements.each('vardb/family') do |ele|
       puts ele.attributes["identifier"]
    end

    
#     sequence = Sequence.create({
#      "accession" => "ABC123",
#      "sequence" => "aacgaacgaacgaacgaacgaacgaacgaacgaacgaacgaacgaacg"
#    })
#    puts sequence.accession
#    sequence = Sequence.create({
#      "accession" => "DEF456",
#      "sequence" => "ttctctttctctttctctttctctttctctttctctttctctttctctttctct"
#    })
#    
#    family = Family.create({
#      "identifier" => "plasmodium.falciparum.var",
#      "pathogen" => "plasmodium.falciparum"
#    })
#    puts family.identifier
#    family = Family.create({
#      "identifier" => "plasmodium.falciparum.rifin_stevor",
#      "pathogen" => "plasmodium.falciparum"
#    })
#    puts family.identifier
    render({:text => "Done"})
  end
end
