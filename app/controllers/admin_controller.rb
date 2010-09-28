require 'xml_loader'
require 'sequence_loader'

class AdminController < ApplicationController
  
  before_filter :authenticate_user!

  def index
    @users = User.all
  end
  
  def show
    @user = User.find(params[:id])
  end

  def loadxmlfolder
    XmlLoader.loadXmlFolder("c:/projects/vardb/data/")
    render({:text => "Done"})
  end
  
  def loadsequencefolder
    #folder = "c:/Documents and Settings/nhayes/My Documents/My Dropbox/vardb/dr-5/sequence/"
    folder="d:/temp/testload/"
    SequenceLoader.loadSequenceFolder(folder)
    render({:text => "Done"})
  end
end
