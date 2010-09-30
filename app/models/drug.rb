class Drug < Resource
  
  key :names, String
  key :formula, String
  key :mass, String
  key :target, String
  key :activity, String
  key :notes, String
  key :numsequences, Integer
  key :pathogens, Array
  key :diseases, Array
  key :hierarchies, Array
  
end