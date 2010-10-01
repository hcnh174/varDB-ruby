/*global Ext, vardb */
kyoto.vardb.explorer.JoinGrid = Ext.extend(kyoto.vardb.Grid,
{	
	title: 'Join',
	frame: true,
	//autoWidth: true,
	//autoHeight: true,
	enableColumnMove: true,
	stripeRows: true,	
	loadMask: true,
	collapsible: false,				
	animCollapse: false,
	closable: true,
	pagesize: 20,
	tooltip: 'If this tab is closed, the join can be re-created using the Tags/Create join menu item',

	initComponent:function()
	{		
		var self=this;
		var store=new Ext.data.Store(
		{
			url: vardb.webapp+'/tags/ajax/join_by_list.json',
			reader: new Ext.data.JsonReader(),
			remoteSort: true,
			sortInfo: {field: 'name', direction: 'ASC'},
			baseParams: 
			{
				list_id: this.list_id,
				properties: this.properties,
				bundle_ids: this.bundle_ids,
				definition_ids: this.definition_ids
			}
		});
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20});
	
		var r=kyoto.vardb.Renderer;
		
		var columns=
		[
			sm,
			{header: 'accession', dataIndex: 'accession', renderer: this.renderAccession},
			{header: 'genome', dataIndex: 'genome', renderer: this.renderGenome},
			{header: 'family', dataIndex: 'family', renderer: this.renderFamily},
			{header: 'taxon', dataIndex: 'taxon', renderer: this.renderTaxon},
			{header: 'gene', dataIndex: 'gene'},
			{header: 'pseudogene', dataIndex: 'pseudogene', renderer: r.renderPseudogene},
			{header: 'truncated', dataIndex: 'truncated', renderer: r.renderTruncated},
			{header: 'ntlength', dataIndex: 'ntlength', align: 'right'},
			{header: 'aalength', dataIndex: 'aalength', align: 'right'}
		];
		var i,j, field, bundle, hidden;
		for (i=0;i<this.bundles.rows.length;i++)
		{
			bundle=this.bundles.rows[i];
			for (j=0;j<bundle.definitions.length;j++)
			{
				field=bundle.definitions[j];
				if (this.isFieldHidden(field.id))
					{continue;}
				columns.push({header: field.name, sortable: false, dataIndex: bundle.name+'$'+field.name, tooltip: field.description});
			}
		}
		
		var editmenu=this.createSelectMenu();
		var tbar=new Ext.PagingToolbar({
			plugins: new Ext.ux.Andrie.pPageSize({variations: [5,10,20,30,50,100]}),
			pageSize: this.pagesize,
			store: store,
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: 'No items to display',
			items:
			[
				'-',editmenu
				//'-',downloadmenu
			]
		});		
		
		var config=
		{
			viewConfig:{forceFit:true},
			store: store,
			columns: columns,
			sm: sm,
			tbar: tbar
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.JoinGrid.superclass.initComponent.apply(this, arguments);
		
		//store.load({params:{start: 0, limit: this.pagesize}});
		
		this.addListener('activate',function(tab)
		{
			tab.store.load({params:{start: 0, limit: tab.pagesize}});
		});
		/*
		this.store.addListener('metachange',function(store,meta)
		{
			//alert('metachange event: '+meta);
		});
		*/
	},
	
	isFieldHidden:function(definition_id)
	{
		//alert('def_ids='+this.definition_ids+', def_id='+definition_id);
		var index;
		var definition_ids=this.definition_ids.split(',');
		for (index=0;index<definition_ids.length;index++)
		{
			if (parseInt(definition_ids[index],10)===parseInt(definition_id,10))
				{return false;}
		}
		return true;
	},
	
	renderAccession:function(value, p, r)
	{
		return String.format('<a href="#" onclick="vardb.sequencePopup(\'{0}\')">{1}</a>',	r.data.accession, value);
	},
		
	renderFamily:function(value, p, r)
	{
		return String.format('<a href="#" onclick="vardb.familyPopup(\'{0}\')">{1}</a>', r.data.family, value);
	},

	renderGenome:function(value, p, r)
	{
		return String.format('<a href="'+vardb.webapp+'/genomes/{0}.html" target="_blank">{1}</a>', r.data.genome, value);
	},
	
	renderTaxon:function(value, p, r)
	{
		return String.format('<a href="#" onclick="vardb.taxonPopup(\'{0}\')">{1}</a>', r.data.taxon, value);
	}
});