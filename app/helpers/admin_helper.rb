module AdminHelper

  # xml_loader

  def load_xml_folder(folder) #"c:/projects/vardb/data/"
    filenames = get_files_of_type(folder,".xml")
    filenames.each do |filename|
      puts filename
      load_xml_file(filename)
    end
  end
  
  def load_xml_file(path)
    xml=REXML::Document.new(File.open(path))
    #puts "Root element: #{xml.root.name}"
    xml.root.elements.each do |child|
      if %w{pathogen virus bacteria fungus protist animal}.include?(child.name)
        create_pathogen(child)        
      elsif child.name=='family'
        create_family(child)
      elsif child.name=='disease'
        create_disease(child)
      elsif child.name=='ortholog'
        create_ortholog(child)
      elsif child.name=='ref'
        create_ref(child)
      elsif child.name=='source'
        create_source(child)
      elsif child.name=='term'
        create_term(child)
      end
    end
  end
  
  def create_pathogen(element)
    params = hash_from_elements(element)
    params[:identifier] = element.attributes["identifier"]
    params[:refs] = array_from_elements(element)
    if element.name=="virus"
      Virus.create(params)   
    elsif element.name=="bacteria"
      Bacteria.create(params)   
    elsif element.name=="fungus"
      Fungus.create(params)   
    elsif element.name=="protist"
      Protist.create(params)
    elsif element.name=="animal"
      Animal.create(params)
    else
      Pathogen.create(params)
    end
  end
  
  def create_family(element)
    params = hash_from_elements(element)
    params[:identifier] = element.attributes["identifier"]
    params[:pathogen] = element.attributes["pathogen"]
    Family.create(params)    
  end
  
  def create_disease(element)
    params = hash_from_elements(element)
    params[:identifier] = element.attributes["identifier"]
    Disease.create(params)    
  end
  
  def create_ortholog(element)
    params = hash_from_elements(element)
    params[:identifier] = element.attributes["identifier"]
    Ortholog.create(params)    
  end
  
  def create_ref(element)
    params = hash_from_elements(element)
    params[:identifier] = element.attributes["identifier"]
    Ref.create(params)    
  end
  
  def create_source(element)
    params = hash_from_elements(element)
    params[:identifier] = element.attributes["identifier"]
    Source.create(params)
  end
  
  def create_term(element)
    params = hash_from_elements(element)
    params[:identifier] = element.attributes["identifier"]
    Term.create(params)
  end

  #sequence_loader
  
  def load_sequence_folder(folder)
    #puts "loadSequenceFolder #{folder}"
    filenames = get_files_of_type(folder,".txt")
    #puts "filenames #{filenames}"
    filenames.each do |filename|
      puts filename
      load_sequence_file(filename)
    end
  end
  
  def load_sequence_file(filename)
    #puts "loadSequenceFile: #{filename}"
    isHeader=true
    fields = nil
    IO.foreach(filename) do |line|
      line.chomp!
      if line.strip.empty?
        puts 'skipping line'
        next
      end
      if isHeader
        fields=line.split("\t")
        fields[0] = "identifier"
        isHeader=false
      else
        if fields.nil?
          return
        end
        values=line.split("\t")
        params=hash_from_arrays(fields,values)
        createSequence(params)
      end
    end
  end
  
  def create_sequence(params)
    puts params.to_s
    Sequence.create(params)    
  end
   
  
  
  # vardb_utils
  
  def get_files_of_type(folder,type)
    puts "get_files_of_type"
    filenames = Array.new
    excludes = [".svn"]
    Find.find(folder) do |path|
      if FileTest.directory?(path)
        if excludes.include?(File.basename(path))
          Find.prune       # Don't look any further into this directory.
        else
          next
        end
      else
        if File.extname(path) == type
           filenames.push(path)
        end
      end
    end
    return filenames
  end
  
  def hash_from_arrays(fields,values)
    puts "******************"
    puts "fields #{fields}"
    puts "values #{values}"
    params = Hash.new
    numfields = fields.length
    for i in 0..numfields
      field = fields[i]
      value = values[i]
      if field.nil? || value.nil?
        next
      end
      field.strip!
      value.strip!
      if field.empty? || value.empty?
        next
      end
      params[field] = value
    end
    params
  end
  
  ##### xml utils
  
  def get_element_value(element,name)
    XPath.first(element,name).text()
  end
  
  def hash_from_elements(element)
    params=Hash.new
    element.each_element do |child|
      if !child.nil? && !child.text().nil? && !child.text().empty?
        puts "#{child.name} = #{child.text()}"
        params[child.name] = child.text()
      end
    end
    params    
  end
  
  # assumes all child elements have the same name and no attributes (e.g. refs/ref
  def array_from_elements(element)
    values=Array.new
    element.each_element do |child|
      if !child.nil? && !child.text().nil? && !child.text().empty?
        puts "#{child.name} = #{child.text()}"
        values.push(child.text())
      end
    end
    params    
  end
  
  # Genbank utils

  Bio::NCBI.default_email="nelsonhayes4@gmail.com"
  
  def download_references(ids)
    Bio::PubMed.efetch(ids).each do |entry|
      medline = Bio::MEDLINE.new(entry)
      reference = medline.reference
      params = Hash.new
      params[:identifier] = reference.pubmed
      params[:reftype] = 'JOURNAL'
      params[:pmid] = reference.pubmed
      params[:authors] = reference.authors
      params[:year] = reference.year
      params[:title] = reference.title
      params[:journal] = reference.journal
      params[:volume] = reference.volume
      params[:issue] = reference.issue
      params[:pages] = reference.pages
      params[:abstract] = reference.abstract
      params[:url] = reference.url
      ref = Ref.create(params)
      puts ref
    end
  end
  
 

end
