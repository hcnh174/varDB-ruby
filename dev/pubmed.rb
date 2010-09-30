require 'bio'

ids = Array.new([10592173,14693808,20576307])

Bio::PubMed.efetch(ids).each do |entry|
  medline = Bio::MEDLINE.new(entry)
  reference = medline.reference
  puts reference.title
  puts reference.authors
end
 
 
#puts Bio::PubMed.query(20576307)

#keywords = ARGV.join(' ')
#keywords = '"Hayes CN"[Author]'
#
#options = {
#  #'maxdate' => '2003/05/31',
#  'retmax' => 1000,
#}
# 
#entries = Bio::PubMed.esearch(keywords, options)
# 
#Bio::PubMed.efetch(entries).each do |entry|
#  medline = Bio::MEDLINE.new(entry)
#  reference = medline.reference
#  puts reference
#  #puts reference.bibtex
#end
 
#entries = Bio::PubMed.search('"Hayes CN"[Author]')
#entries.each do |entry|
#  medline = Bio::MEDLINE.new(entry) # creates Bio::MEDLINE object from text
#  reference = medline.reference     # converts into Bio::Reference object
#  puts reference.bibtex             # shows BibTeX format text
#end
 
#
# 
#ARGV.each do |id|
#  entry = Bio::PubMed.query(id)     # searches PubMed and get entry
#  puts entry
#  medline = Bio::MEDLINE.new(entry) # creates Bio::MEDLINE object from entry text
#  reference = medline.reference     # converts into Bio::Reference object
#  puts reference.bibtex             # shows BibTeX formatted text
#end
