/*global Ext, vardb, jmolform */
Ext.ux.vardb.ChainHitsGrid = Ext.extend(Ext.ux.vardb.SequenceGrid,
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
		
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/blast/ajax/chainblasthits.json',
			reader: new Ext.ux.vardb.blast.BlastReader({}),
			remoteSort: true,
			//sortInfo: {field: 'accession', direction: 'ASC'},
			baseParams: {identifier: this.identifier, filter: ''}
		});
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20});
		var expander=new Ext.ux.vardb.blast.RowExpander({numcolumns: 90});	
		var r=Ext.ux.vardb.Renderer;
		
		var builder=Ext.ux.vardb.ColumnBuilder;

		var columns=
		[
			expander,
			sm,
			builder.accessionColumn(),
			builder.tagsColumn(),
			builder.deflineColumn(),
			{header: 'Chain', dataIndex: 'chainname', width: 20, sortable: false},
			builder.numhspsColumn(),
			builder.hitlengthColumn(),
			builder.hitevalueColumn(),
			builder.hitbitscoreColumn(),
			builder.pathogenColumn(),
			builder.familyColumn(),
			//builder.diseaseColumn(),
			builder.orthologColumn()
			//builder.countryColumn(),
			//builder.refColumn(),
			//{header: 'Strain', width: 40, sortable: true, dataIndex: 'strain'},
			//{header: 'Gene', width: 40, sortable: true, dataIndex: 'gene'},
			//builder.productColumn(),
			//builder.truncatedColumn(),
			//builder.pseudogeneColumn()
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
				'-',self.createStructureMenu()
			]
		});
		
		var viewConfig=
		{
			forceFit: true,
			templates:
			{
				cell: Ext.ux.vardb.Vardb.createSelectableTemplate()
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
		Ext.ux.vardb.SequenceGrid.superclass.initComponent.apply(this, arguments); // replace the SequenceGrid implementation
		
		/*
		store.on('load', function(){
			expander.expandRow(0);
		});
		*/
		store.load({params:{start: 0, limit: this.pagesize}});
	},
	
	createStructureMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Jmol',
			enableScrolling: false,
			menu:
			{
				items:
				[
					{
						text: 'Align to structure',
						handler: function()
						{
							var sequence_id=self.getSelectedId();
							jmolform.alignToStructure(sequence_id,self.identifier);
						}
					},
					'-',
					{
						text: 'Reset structure',
						handler: function(){Ext.ux.vardb.Vardb.resetStructure();}
					}
				]
			}
		};
		return menu;
	}
});

