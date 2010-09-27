/*global Ext, vardb */
Ext.ux.vardb.explorer.CartGrid = Ext.extend(Ext.ux.vardb.Grid,
{	
	id: 'cartpanel',
	title: 'Sequence carts',
	frame: false,
	autoWidth: true,
	height: 166,
	stripeRows: true,
	loadMask: true,
	autoScroll: true,
	
	initComponent:function()
	{
		var self=this;
		
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/ajax/user/carts.json',
			remoteSort: true,
			sortInfo: {field: 'title', direction: 'ASC'},
			reader: new Ext.data.JsonReader(
			{
				root: 'carts',
				totalProperty: 'totalCount',
				idProperty: 'list_id',
				fields:
				[
					{name: 'list_id'},
					{name: 'title'},
					{name: 'cart', type: 'boolean'},
					{name: 'numsequences', type: 'int'}
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
				{header: 'Name', width: 70, sortable: true, dataIndex: 'title', renderer: Ext.ux.vardb.Renderer.renderNameLink},
				{header: 'Count', width: 50, sortable: true, align: 'right', dataIndex: 'numsequences'}
			],
			tbar: this.createToolbar()
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));		
		Ext.ux.vardb.explorer.CartGrid.superclass.initComponent.apply(this, arguments);
		this.viewConfig.emptyText='<div class="emptyText">No carts.</div>';
		
		function onCellClick(grid, rowIndex, columnIndex, e)
		{
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName!=='title')
				{return;}
			var record = grid.getStore().getAt(rowIndex);
			self.controller.addCart(record.data.list_id);
		}
		
		this.addListener('cellclick',onCellClick);
		store.load();
	},
	
	addCartHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Cart.addCart(function(json)
		{
			self.controller.fireEvent('addcart',json.list_id);
		});
	},
	
	deleteCartHandler:function()
	{
		var self=this;
		var id=this.getSelectedId();
		Ext.ux.vardb.Cart.deleteCart(id,function(json)
		{
			self.controller.fireEvent('deletecart',id);
		});
	},
	
	createActionMenu:function()
	{
		var menu=
		{
			text: 'Action',
			menu:
			{
				items:
				[
					{text: 'Add cart', scope: this, handler: this.addCartHandler},
					{text: 'Delete cart', scope: this, handler: this.deleteCartHandler}
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
				this.createSelectMenu(),
				'-',this.createActionMenu(),
				'->',this.createReloadButton()
			]
		});
		return toolbar;
	}
});
