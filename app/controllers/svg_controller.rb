class SvgController < ApplicationController
  
   after_filter :set_content_type
   
  def set_content_type  
    headers["Content-Type"] = "image/svg+xml"  
  end  
  
  def sequence
#     respond_to do |format|  
#       format.svg {  
#         render :svg => "<svg height=\"100%\" version=\"1.1\" width=\"100%\"><rect height=\"100\" style="" width=\"100\"></rect>"  
#       }  
#     end  
  end

end
