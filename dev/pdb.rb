require 'bio/db/pdb'
require 'open-uri'
require 'pp'

id = '1VSG'
open("http://www.pdb.org/pdb/files/#{id}.pdb") do |file|
  str = IO.read(file)
  structure = Bio::PDB.new(str)
  puts structure.seqres['A']
end

#structure.setDescription(isNull(header.getTitle(),""));
#structure.setTechnique(isNull(header.getTechnique(),""));
#structure.setResolution(header.getResolution());
#
#structure.getChains().clear();
#for (Chain chn : struc.getChains())
#  {
#    String name=chn.getName().trim();
#    if (CStringHelper.isEmpty(name))
#      continue;
#      CChain chain=structure.findOrCreateChain(name);
#      chain.setSwissprot(chn.getSwissprotId()); 
#      chain.setSequence(chn.getAtomSequence());
#      chain.setSecondaryStructure(getSecondaryStructure(chn));
#    }
#    structure.setNumchains(structure.getChains().size());


#str = IO.read('c:/projects/vardb/data/structures/1VSG.pdb')
#structure = Bio::PDB.new(str)
#
#puts structure.seqres['A']

#structure.each do |model|
#  model.each do |chain|
#    chain.each do |residue|
#      residue.each do |atom|
#        puts atom
#      end
#    end
#  end
#end
