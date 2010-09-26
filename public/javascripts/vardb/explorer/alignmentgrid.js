/*global Ext, vardb */
Ext.ux.vardb.explorer.AlignmentGrid = Ext.extend(Ext.ux.vardb.Grid,
{
	id: 'alignmentpanel',
	title: 'Alignments',
	frame: false,
	autoWidth: true,
	height: 166,
	stripeRows: true,
	loadMask: true,
	autoScroll: true,
					
	initComponent:function()
	{
		var grid=this;
		var controller=this.controller;
		
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/ajax/user/alignments.json',
			remoteSort: true,
			sortInfo: {field: 'name', direction: 'ASC'},
			reader: new Ext.data.JsonReader(
			{
				root: 'alignments',
				totalProperty: 'totalCount',
				idProperty: 'identifier',
				fields:
				[
					{name: 'id', type: 'int'},
					{name: 'identifier'},
					{name: 'name'},
					{name: 'description'},
					{name: 'type'},
					{name: 'numsequences', type: 'int'},
					{name: 'numcolumns', type: 'int'},
					{name: 'updated'}
				]
			})
		});
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20, singleSelect: true});
		
		var config=
		{
			viewConfig: {forceFit:true},
			sm: sm,
			store: store,
			columns: 
			[
				sm,
				{header: 'Name', sortable: true, dataIndex: 'name', renderer: Ext.ux.vardb.Renderer.renderNameLink},
				{header: 'Rows', sortable: true, dataIndex: 'numsequences', align: 'right'},
				{header: 'Cols', sortable: true, dataIndex: 'numcolumns', align: 'right'}
			],
			tbar: this.createToolbar()
		};
	
		Ext.apply(this, Ext.apply(this.initialConfig, config));		
		Ext.ux.vardb.explorer.AlignmentGrid.superclass.initComponent.apply(this, arguments);
		this.viewConfig.emptyText='<div class="emptyText">No alignments.</div>';
		
		function onCellClick(grid, rowIndex, columnIndex, e)
		{
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName!=='name')
				{return;}
			var record = grid.getStore().getAt(rowIndex);
			controller.addAlignment(record.data);
		}

		this.addListener('cellclick',onCellClick);
		store.load();
	},
	
	deleteAlignmentHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Vardb.deleteUserAlignment(this.getSelectedId(),function()
		{
			self.store.reload();
		});
	},
	
	createActionMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Action',
			menu:
			{
				items:
				[
					{text: 'Delete alignment', scope: this, handler: this.deleteAlignmentHandler}
				]
			}
		};
		return menu;
	},
	
	createToolbar:function()
	{
		var toolbar=new Ext.Toolbar(
		{
			items:
			[
				this.createPrintButton(),'-',
				this.createSelectMenu(),'-',
				this.createActionMenu(),'->',
				this.createReloadButton()
			]
		});
		return toolbar;
	}
});