/*global Ext, vardb */
kyoto.vardb.blast.BlastReader = function(config)
{	
	config=config || {};
	
	var fields=
	[
		{name: 'id', type: 'int'},
		{name: 'identifier'},
		{name: 'accession'},
		{name: 'rating'},
		{name: 'taxon_identifier'},
		{name: 'taxon_name'},			
		{name: 'pathogen_identifier'},
		{name: 'pathogen_name'},
		{name: 'family_identifier'},
		{name: 'family_name'},
		{name: 'disease_identifier'},
		{name: 'disease_name'},
		{name: 'ortholog_identifier'},
		{name: 'ortholog_name'},
		{name: 'country_identifier'},
		{name: 'country_name'},
		{name: 'ref_identifier'},
		{name: 'ref_name'},
		{name: 'strain'},
		{name: 'pseudogene'},
		{name: 'truncated'},
		{name: 'defline'},
		{name: 'gene'},
		{name: 'product'},
		
		{name: 'chainname'},
		{name: 'hitnumber', type: 'int'},
		{name: 'hitid'},
		{name: 'hitaccession'},
		{name: 'hitdef'},
		{name: 'hitlength', type: 'int'},
		{name: 'numhsps'},
		{name: 'hitbitscore'},
		{name: 'hitevalue'},
		
		{name: 'bitscores'},
		{name: 'evalues'},
		{name: 'queryfroms'},
		{name: 'querytos'},
		{name: 'hitfroms'},
		{name: 'hittos'},
		{name: 'queryframes'},
		{name: 'hitframes'},
		{name: 'identitys'},
		{name: 'positives'},
		{name: 'alignlengths'},
		{name: 'qseqs'},
		{name: 'hseqs'},
		{name: 'midlines'},		
		
		{name: 'tags_id'},
		{name: 'tags_name'},		
		{name: 'tags_description'},
		{name: 'tags_color'},
		{name: 'tags_bgcolor'},
		{name: 'tags_bundle'},
		{name: 'tags_readonly'}
	];
	
	var reader=new Ext.data.JsonReader(
	{
		root: 'hits',
		totalProperty: 'totalCount',
		idProperty: 'id',
		fields: fields
	});
	return reader;
};
