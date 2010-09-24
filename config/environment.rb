# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Vardbruby::Application.initialize!


# added by nelson 9/24/2010
#config.gem 'mongo'
#config.gem 'mongo_mapper'

# remove AR 
#config.frameworks -= [ :active_record, :active_resource ]

require 'mongo'