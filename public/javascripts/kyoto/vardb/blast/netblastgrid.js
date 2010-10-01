/*global Ext, vardb */
kyoto.vardb.blast.NetblastGrid = Ext.extend(kyoto.vardb.SequenceGrid,
{	
	title: 'Netblast results',
	frame: true,
	autoHeight: true,
	autoWidth: true,
	collapsible: false,
	stripeRows: true,
	//pagesize: 20,
	
	initComponent:function()
	{
		var self=this;		
	
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/analysis/ajax/netblast/hits.json',
			reader: new kyoto.vardb.blast.BlastReader(),
			remoteSort: false,
			//sortInfo: {field: 'accession', direction: 'ASC'},
			baseParams: {id: this.analysis_id}
		});
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20});
		var expander=new kyoto.vardb.blast.RowExpander({numcolumns: 90});
		var r=kyoto.vardb.Renderer;
		
		var builder=kyoto.vardb.ColumnBuilder;

		var columns=
		[
			expander,
			sm,
			{header: 'Num', dataIndex: 'hitnumber', width: 20, sortable: true, tooltip: 'Hit number'},
			{header: 'Accession', dataIndex: 'accession', width: 80, sortable: true, renderer: r.renderGenbankAccession},
			{header: 'Description', width: 75, dataIndex: 'hitdef'},
			builder.numhspsColumn(),
			builder.hitlengthColumn(),
			builder.hitevalueColumn(),
			builder.hitbitscoreColumn()
		];
		
		//var tbar=new Ext.PagingToolbar(
		var tbar=new Ext.Toolbar(
		{
			//pageSize: this.pagesize,
			//store: store,
			//displayInfo: true,
			//displayMsg: '{0} - {1} of {2}',
			//emptyMsg: 'None',
			items:
			[
				self.createPrintButton(),'-',
				self.createSelectMenu(),'-',
				self.createBlastMenu()
			]
		});
		
		var viewConfig=
		{
			forceFit: true,
			emptyText: 'No rows to display',
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
		
		store.on('load', function(){
			expander.expandRow(0);
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
					{text: 'BLAST XML', handler: function(btn){vardb.gotoUrl('/analysis/netblast/load.xml',{id: self.analysis_id});}}
				]
			}
		};
		return menu;
	}
});
