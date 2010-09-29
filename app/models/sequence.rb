class Sequence
  include MongoMapper::Document

  key :identifier, String
  key :accession, String
  key :description, String  

  key :sequence, String
  key :cds, String
  key :translation, String

  key :ntlength, Integer
  key :cdslength, Integer
  key :aalength, Integer

  key :start, Integer
  key :finish, Integer
  key :strand, String
  key :numexons, Integer
  key :splicing, String
  key :pseudogene, Boolean

  key :method, String
  key :model, String
  key :score, Float
  key :evalue, Float
  key :hmmloc, String

  key :domainnum, Integer
  key :totaldomainnum, Integer
  key :domains, String
  key :architecture, String

  key :gc, Float
  key :gc3, Float
  key :gc3skew, Float

  key :pathogen, String
  key :family, String
  key :subgroup, String
  key :ortholog, String
  key :disease, String
  key :taxon, String
  key :source, String
  key :country, String
  key :sequenceset, String
  key :genome, String
  key :chromosome, String
  
  key :tags, Array
  key :refs, Array

end
