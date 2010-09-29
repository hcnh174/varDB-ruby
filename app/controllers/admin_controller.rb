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
    loadXmlFolder("c:/projects/vardb/data/")
    render({:text => "Done"})
  end
  
  def loadsequencefolder
    #folder = "c:/Documents and Settings/nhayes/My Documents/My Dropbox/vardb/dr-5/sequence/"
    #folder = "c:/dropbox/My Dropbox/vardb/dr-5/sequence/"
    folder="c:/temp/testload/"
    loadSequenceFolder(folder)
    render({:text => "Done"})
  end
  
  def updaterefs
    downloadReferences(Array.new([20637204,20576307,20498322,20219897,20180261,18776192,15807414,15669971,15252728]))
    render({:text => "Done"})
  end
  
  def updatetaxa
    downloadTaxa(Array.new([770,139,5833]))
    render({:text => "Done"})
  end
  
  Bio::NCBI.default_email="nelsonhayes4@gmail.com"
  
  def downloadTaxa(ids)
    str = Bio::NCBI::REST::efetch(ids, {:rettype => 'xml', :db => 'taxonomy'})
    #puts str
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
  end
end
