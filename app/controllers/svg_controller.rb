class SvgController < ApplicationController
  
   #after_filter :set_content_type
   
  def set_content_type  
    headers["Content-Type"] = "image/svg+xml"  
  end  
  
  def sequence
     render :layout => false
  end

end
