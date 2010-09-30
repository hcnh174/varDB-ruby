class Disease < Resource
  
  key :icd10, String
  key :host, String
  key :vector, String
  key :human, Boolean
  key :distribution, String
  key :morbidity, String
  key :mortality, String
  key :pathogenesis, String
  key :transmission, String
  key :symptoms, String
  key :diagnosis, String
  key :prevention, String
  key :treatment, String
  key :vaccines, String
  key :history, String
  key :url, String
  key :kegg_disease, String
  key :kegg_pathway, String
  key :list, Boolean
  key :pathogens, Array
  key :drugs, Array
  
end