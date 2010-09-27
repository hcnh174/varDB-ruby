/*global Ext, vardb */
Ext.ux.vardb.explorer.BundleGrid=Ext.extend(Ext.ux.vardb.Grid,
{	
	id: 'bundlepanel',
	title:'Tag sets (bundles)',
	frame: false,
	autoWidth: true,
	height: 166,
	stripeRows: true,
	loadMask: true,
	autoScroll: true,
	
	/*
	frame: false,
	layout: 'fit',
	autoWidth: true,
	autoHeight: true,
	maxHeight: 180,
	autoScroll: true,
	enableColumnMove: true,
	stripeRows: true,
	loadMask: true,
	collapsible: false,
	animCollapse: false,
	*/
	
	initComponent:function()
	{
		var self=this;
		
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/ajax/user/bundles.json',
			remoteSort: true,
			sortInfo: {field: 'title', direction: 'ASC'},
			reader: new Ext.data.JsonReader(
			{
				root: 'rows',
				totalProperty: 'totalCount',
				idProperty: 'bundle_id',
				fields:
				[
					{name: 'bundle_id', type: 'int'},
					{name: 'name'},
					{name: 'readonly', type: 'boolean'},
					{name: 'numtags', type: 'int'},
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
			tbar: this.createToolbar(),
			columns: 
			[
				sm,
				{header: 'Name', width: 80, sortable: true, dataIndex: 'name', renderer: Ext.ux.vardb.Renderer.renderNameLink},
				{header: 'Tags', width: 50, sortable: true, dataIndex: 'numtags', align: 'right'},
				{header: 'Sequences', width: 50, sortable: true, dataIndex: 'numsequences', align: 'right'}
			]			
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));		
		Ext.ux.vardb.explorer.BundleGrid.superclass.initComponent.apply(this, arguments);
		this.viewConfig.emptyText='<div class="emptyText">No bundles.</div>';
		
		function onCellClick(grid, rowIndex, columnIndex, e)
		{
			var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
			if (fieldName!=='name')
				{return;}
			var record = grid.getStore().getAt(rowIndex);		
			self.controller.addBundle(record.data.bundle_id);
		}
		
		this.addListener('cellclick',onCellClick);
		store.load();
	},

	createBundleHandler:function()
	{
		var self=this;
		Ext.ux.vardb.tags.Services.createBundle(function(bundle){
			self.controller.addBundle(bundle.bundle_id);
		});
	},
	
	deleteBundleHandler:function()
	{
		var self=this;
		var id=this.getSelectedId();
		Ext.ux.vardb.tags.Services.deleteBundle(id,function(bundle_id){
			self.controller.fireEvent('deletebundle',bundle_id);
		});
	},
	
	uploadBundleHandler:function()
	{
		var self=this;
		var dialog=new Ext.ux.vardb.tags.UploadBundleDialog();
		dialog.on(
		{
			'bundleuploaded': function(bundle)
			{
				self.controller.onBundleUploaded(bundle);
			}
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
					{text: 'Create bundle', scope: this, handler: this.createBundleHandler},
					{text: 'Upload bundle', scope: this, handler: this.uploadBundleHandler},
					{text: 'Delete bundle', scope: this, handler: this.deleteBundleHandler}	
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