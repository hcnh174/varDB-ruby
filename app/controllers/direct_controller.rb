class DirectController < ApplicationController
  include Mongo
  include Rails::ExtJS::Direct::Controller

  def index
    render(:json => {"name" => "nelson"})
  end
  
  def test(str)
    puts str
    res = XResponse.new(@xrequest)
    res.status = true
    res.message = "Direct#test"
    res.result = {:foo => 'bar'}
    render(:json => res)
  end
end