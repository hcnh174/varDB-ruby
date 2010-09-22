module ApplicationHelper
  def title
    base_title = "varDB: Antigenic variation database"
    if @title.nil?
      base_title
    else
      "#{@title}"
    end
  end
  
  def extjs_url
    "http://extjs.cachefly.net/ext-3.2.1"
  end
end
