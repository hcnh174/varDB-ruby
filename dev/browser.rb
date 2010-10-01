require 'open-uri'
require 'bio'

snps = []
IO.foreach("snps.txt") do |line|
  line.chomp!
  if line.strip.empty?
    next
  end
  values=line.split("\t")
  snps.push({:snp => values[0], :bp => values[1], :major => values[2].downcase, :minor => values[3].downcase})
end
#puts snps

File.open('snplist.txt', 'w') do |outfile|  
  snps.each do |snp|
    #chr19%3A44452246-44452304
    position = "chr19%3A#{snp[:bp].to_i-29}-#{snp[:bp].to_i+29}"
    puts position
    open("http://genome.ucsc.edu/cgi-bin/hgc?hgsid=170418504&g=htcGetDna2&table=&i=mixed&o=44434754&l=44434754&r=44435255&getDnaPos=#{position}&db=hg18&hgSeq.cdsExon=1&hgSeq.padding5=0&hgSeq.padding3=0&hgSeq.casing=lower&boolshad.hgSeq.maskRepeats=0&hgSeq.repMasking=lower&boolshad.hgSeq.revComp=0&submit=get+DNA") do |file|
      # skip first and second lines
      file.readline
      file.readline
      accession = file.readline.chomp
      sequence = file.readline.chomp
      sequence << file.readline.chomp
      
      accession = ">#{snp[:bp]} #{snp[:snp]} #{snp[:major]}/#{snp[:minor]}"
      sequence2 = sequence.dup
      
      allele = sequence[30]
      if allele == snp[:major] || allele == snp[:minor]
        sequence[30] = snp[:major]
        sequence2[30] = snp[:minor]
      else
        sequence[30] = Bio::Sequence::NA.new(snp[:major]).complement
        sequence2[30] = Bio::Sequence::NA.new(snp[:minor]).complement
      end
        
      puts "major: #{snp[:major]}, minor #{snp[:minor]}, seq1 #{sequence[30]}, seq2 #{sequence2[30]}"
      
      puts "accession: #{accession}"
      puts "sequence1: #{sequence}"
      puts "sequence2: #{sequence2}"
      
      outfile.puts accession
      outfile.puts sequence
      outfile.puts sequence2
    end
  end
end

