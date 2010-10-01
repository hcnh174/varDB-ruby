/*global Ext, vardb */
kyoto.vardb.blast.Grid = Ext.extend(kyoto.vardb.SequenceGrid,
{	
	frame: true,
	autoHeight: true,
	autoWidth: true,
	collapsible: true,
	stripeRows: true,
	pagesize: 20,
	
	initComponent:function()
	{
		var self=this;
		var url=vardb.webapp+'/blast/ajax/hits.json';
		if (this.blasttype==='PSIBLAST')
			{url=vardb.webapp+'/blast/ajax/psiblasthits.json';}
		
		var store = new Ext.data.Store(
		{
			url: url,
			reader: new kyoto.vardb.blast.BlastReader({}),
			remoteSort: true,
			baseParams: {id: this.list_id, filter: ''}
		});
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20});
		var expander=new kyoto.vardb.blast.RowExpander();	
		var r=kyoto.vardb.Renderer;
		
		var builder=kyoto.vardb.ColumnBuilder;

		var columns=
		[
			expander,
			sm,
			builder.accessionColumn(),
			builder.tagsColumn(),
			builder.deflineColumn(),
			builder.numhspsColumn(),
			builder.hitlengthColumn(),
			builder.hitevalueColumn(),
			builder.hitbitscoreColumn(),
			builder.pathogenColumn(),
			builder.familyColumn(),
			builder.diseaseColumn(),
			builder.orthologColumn(),
			builder.countryColumn(),
			builder.refColumn(),
			builder.strainColumn(),
			builder.geneColumn(),
			builder.productColumn(),
			builder.truncatedColumn(),
			builder.pseudogeneColumn()
		];
		
		var tbar=new Ext.PagingToolbar(
		{
			//plugins: new Ext.ux.Andrie.pPageSize({variations: [5,10,20,50,100]}),
			pageSize: this.pagesize,
			store: store,
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: 'None',
			items:
			[
				'-',self.createSelectMenu(),
				'-',self.createTagMenu(),
				'-',self.createDownloadMenu(),
				'-',self.createCartMenu(),
				'-',self.createSummaryMenu(),
				'-',self.createBlastMenu()
			]
		});
		
		var viewConfig=
		{
			forceFit: true,
			templates:
			{
				cell: kyoto.vardb.Vardb.createSelectableTemplate()
			}
		};
		
		var config=
		{
			store: store,
			columns: columns,
			viewConfig: viewConfig,
			sm: sm,
			plugins: expander,
			tbar: tbar
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.SequenceGrid.superclass.initComponent.apply(this, arguments); // replace the SequenceGrid implementation
		
		store.on('load', function()
		{
			if (store.getTotalCount()>0)
				{expander.expandRow(0);}
		});
		
		store.load({params:{start: 0, limit: this.pagesize}});
	},
	
	createBlastMenu:function(type)
	{
		var self=this;
		var menu=
		{
			text: 'Blast',
			enableScrolling: false,
			menu:
			{
				items:
				[
					{text: 'BLAST XML', handler: function(btn){vardb.gotoUrl("/blast/load.xml",{id: self.list_id});}}
				]
			}
		};
		return menu;
	}
});

