class Family < Tag
  
  key :pathogen, String
  key :ortholog, String
  
  key :familysize, String
  key :switchingrate, String
  key :chromosomes, String
  key :expression, String
  key :introns, String
  
  key :protein, String
  key :daltons, String
  key :location, String
  key :function, String
  key :ligands, String
  key :antigenicvariation, String
  
  key :url, String
  key :notes, String
  key :numsequences, Integer
  
  key :kegg_ortholog, String
  key :kegg_pathway, String
  key :kegg_family, String
  
end