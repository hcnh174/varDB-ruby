require 'erb'
include ERB::Util

input = %{\
<% high.downto(low) do |n| %>
  <%= n %> bottles on the wall
  <%= n %> bottles on the wall
  and if one should happen to fall
  there'd be <%= n-1 %> bottles on the wall
  <%= html_escape("hello world & all that") %>
  <%= url_encode("hello world & all that") %>
<% end %>
}
high, low=10,8
erb = ERB.new(input)
erb.run
