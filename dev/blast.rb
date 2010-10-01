require 'bio'
require 'pp'
#require 'rexml/document'
#include REXML

query = "MVTGSGGEDKYKSAKNAKELLDMIGKDVHEIVEKDEAKKYIDELKGNLQKAKGIGELAAFPDTCKRVEQYRSKANGDGK"
query << "RYPCTELSEKYVERFSNTLGGQCTDSKMRRDGIGACAPYRRLHLCHHNLENIKDVNNIDNDTLLAEVCMAAYYEGESLT"
query << "RYNPIYQTKYKDSGSTMCTELARSFADIGDIVRGRDLFRGNDEEKKKRDELEKNLKTIFGKIHSRLTKD"

factory = Bio::Blast.remote('blastp', 'SWISS', '-e 0.0001', 'genomenet')
factory.format = 8
report = factory.query(query)
pp report



#filename = "c:\\projects\\vardb\\src\\tests\\org\\vardb\\blast\\blast.xml"
#Bio::Blast.reports(filename) do |report|
#  puts "Hits for " + report.query_def + " against " + report.db
#  report.each do |hit|
#    print hit.target_id, "\t", hit.evalue, "\n" if hit.evalue < 0.001
#  end
#end


#program = 'blastp' # blastp, tblastn, blastx, blastn
#factory = Bio::Blast.local(program, ARGV.pop)
#
#report.each do |hit|
#  puts hit.bit_score       
#  puts hit.query_seq       
#  puts hit.midline         
#  puts hit.target_seq      
# 
#  puts hit.evalue          
#  puts hit.identity        
#  puts hit.overlap         
#  puts hit.query_id        
#  puts hit.query_def       
#  puts hit.query_len       
#  puts hit.target_id       
#  puts hit.target_def      
#  puts hit.target_len      
#  puts hit.query_start     
#  puts hit.query_end       
#  puts hit.target_start    
#  puts hit.target_end      
#  puts hit.lap_at          
#end

