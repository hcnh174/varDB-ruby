class GblocksParams
  
  attr_accessor :type
  attr_accessor :gaps
  attr_accessor :minBlock
  attr_accessor :similarityMatrices
  attr_accessor :minConserved
  attr_accessor :minFlanking
  attr_accessor :maxNonconserved
  attr_accessor :resultsType
  
  def initialize
    @type = 'p'
    @gaps = 'N'
    @minBlock = 10
    @similarityMatrices = TRUE
    @minConserved = 0.5
    @minFlanking = 0.85
    @maxNonconserved = 8 
    @resultsType = 'y'
  end
  
  def commmand(dir, infile, numsequences)
    cmd = "#{dir}Gblocks #{infile} -t=#{@type}"
    cmd << " -b1=#{format(numsequences,@minConserved)}"
    cmd << " -b2=#{format(numsequences,@minFlanking)}"
    cmd << " -b3=#{@maxNonconserved}"
    cmd << " -b4=#{@minBlock}"
    cmd << " -b5=#{@gaps}"
    cmd << " -b6=#{format_bool(@similarityMatrices)}"
    cmd << " -s=n"
    cmd << " -p=#{@resultsType}"
    cmd
  end
  
  def format(numsequences, proportion)
    value = numsequences*proportion
    return 1+value.round
  end
  
  def format_bool(value)
    if value
      "y"
    else
      "n"
    end
  end
end

params = GblocksParams.new
cmd = params.commmand("c:\\research\\software\\gblocks\\","gblocks.aln",35)

require 'open3'
Open3.popen3(cmd) do |stdin, stdout, stderr|
  puts cmd
  puts "stdout - #{stdout.readlines}"
  puts "stderr - #{stderr.readlines}"
end
    
#    private String format(int numsequences, float proportion)
#    {
#      return String.valueOf(Math.round(1.0f+(float)numsequences*proportion));
#    }
#    
#    private String format(boolean value)
#    {
#      return value ? "y" : "n";
#    }
#  }


    
#    String infile=createTempfile("gblocks",".fasta",CSequenceFileParser.writeFasta(sequences));
#    String outfile=addTempfile(infile+"-gb"+params.getResultsType().getExtension()); //.txts");
#    CCommandLine commands=params.getCommand(this.dir,infile,sequences.size());
#    commands.setExitValue(1);
#    CCommandLine.Output output=this.runtimeService.exec(commands);
#    check(output);
#    String html=CFileHelper.readFile(outfile);
#
#    List<Flank> flanks=parse(html);
#    CSimpleLocation location=convert(flanks);   
#    CTable table=CSimpleLocation.applyToUngappedSequences(sequences,location,"gblocks");
#    
#    CGblocksAnalysis analysis=new CGblocksAnalysis(sequences,params);
#    analysis.getResults().setHtml(html);
#    analysis.getResults().setLocation(location.toString());
#    analysis.getResults().setApplied(table.toString());
#    
#    deleteTempfiles();
#    if (location.isEmpty())
#      throw new CVardbException("Gblocks: could not find any conserved blocks with the given parameters");
#    return analysis;