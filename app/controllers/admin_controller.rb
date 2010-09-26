class AdminController < ApplicationController
  #include rexml
  
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
