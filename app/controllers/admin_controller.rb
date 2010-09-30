#require 'vardb_utils'
#require 'xml_loader'
#require 'sequence_loader'

class AdminController < ApplicationController
  include Mongo
  include REXML
  
  before_filter :authenticate_user!

  def index
    @users = User.all
  end
  
  def show
    @user = User.find(params[:id])
  end

  def loadxmlfolder
    load_xml_folder("c:/projects/vardb/data/")
    render({:text => "Done"})
  end
  
  def loadsequencefolder
    #folder = "c:/Documents and Settings/nhayes/My Documents/My Dropbox/vardb/dr-5/sequence/"
    #folder = "c:/dropbox/My Dropbox/vardb/dr-5/sequence/"
    folder="c:/temp/testload/"
    load_sequence_folder(folder)
    render({:text => "Done"})
  end
  
  def updaterefs
    download_references(Array.new([20637204,20576307,20498322,20219897,20180261,18776192,15807414,15669971,15252728]))
    render({:text => "Done"})
  end
  
  def updatetaxa
    download_taxa(Array.new([770,139,5833]))
    render({:text => "Done"})
  end
  
  
  
  def download_taxa(ids)
    str = Bio::NCBI::REST::efetch(ids, {:rettype => 'xml', :db => 'taxonomy'})
    puts str
    xml=REXML::Document.new(str)
    puts "Root element: #{xml.root.name}"
    taxa = Hash.new
    xml.elements.each("/TaxaSet/Taxon") do |element|
      parse_taxon(element,taxa)
    end
    puts taxa
  end
  
  def parse_taxon(element,taxa)
    taxon =  Hash.new()
    taxid = get_element_value(element, "TaxId") #XPath.first(element, "TaxId").text() 
    taxon[:identifier] = taxid
    taxon[:taxid] = taxid
    taxon[:name] = get_element_value(element, "ScientificName")
    taxon[:level] = get_element_value(element, "Rank")
    taxon[:parent] = get_element_value(element, "ParentTaxId")
    taxa[taxid] = taxon

    #add parents to taxon list and set each parent
    parent = nil
    element.elements.each("LineageEx/Taxon") do |child|
      taxid = get_element_value(child,"TaxId").to_i
      if !taxa.has_key?(taxid)    
        ancestor = Hash.new
        ancestor[:taxid] = taxid
        ancestor[:name] = get_element_value(child,"ScientificName")
        ancestor[:level] = get_element_value(child,"Rank")
        taxa[taxid] = ancestor
        if !parent.nil?
          ancestor[:parent] = parent[:taxid]
        end
      end
      parent = taxa[taxid]
    end
    #puts taxon
  end
  
  
  
end
