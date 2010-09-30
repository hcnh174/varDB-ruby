require 'bio'

include Bio
include REXML

  def parseTaxa(str)
    xml=REXML::Document.new(str)
    puts "Root element: #{xml.root.name}"
    xml.elements.each("/TaxaSet/Taxon") do |element|
      parseTaxon(element)
    end
  end


  def parseTaxon(element)
    params =  Hash.new()
    params[:identifier] = XPath.first(element, "TaxId").text()
    params[:taxid] = XPath.first(element, "TaxId").text()
    params[:name] = XPath.first(element, "ScientificName").text()
    params[:level] = XPath.first(element, "Rank").text()
    params[:parent] = XPath.first(element, "ParentTaxId").text()
    puts params
#    
#    xml.elements.each("LineageEx/Taxon") do |child|
#      
#      int taxid=Integer.parseInt(CDom4jHelper.getValue(element,"TaxId"));
#      if (!taxa.containsKey(taxid))
#      {
#        ITaxon ancestor=new NcbiTaxon(taxid);
#        ancestor.setName(CDom4jHelper.getValue(element,"ScientificName"));
#        ancestor.setLevel(CConstants.TaxonomicLevel.lookup(CDom4jHelper.getValue(element,"Rank")));
#        taxa.put(taxid,ancestor);
#        if (parent!=null)
#          ancestor.setParent_id(parent.getId());
#      }
#      parent=taxa.get(taxid);
#    }
  end
ids = Array.new([770,139,5833])

Bio::NCBI.default_email="nelsonhayes4@gmail.com"
#Bio::NCBI.default_tool="vardbruby"

entries = Bio::NCBI::REST::efetch(ids, {:rettype => 'xml', :db => 'taxonomy'})
#entries = Bio::NCBI::REST::EFetch.taxonomy(ids,{:rettype => 'xml'})
#puts entries
parseTaxa(entries)