/*global Ext, vardb */
Ext.ux.vardb.explorer.TaskGrid=Ext.extend(Ext.ux.vardb.Grid,
{
	id: 'taskpanel',
	title: 'Tasks',
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

	initComponent:function()
	{
		var self=this;
		
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/ajax/user/tasks.json',
			remoteSort: true,
			sortInfo: {field: 'name', direction: 'ASC'},
			reader: new Ext.data.JsonReader(
			{
				root: 'tasks',
				totalProperty: 'totalCount',
				idProperty: 'id',
				fields:
				[	
					{name: 'id'},
					{name: 'name'},
					{name: 'status'},
					{name: 'cancelled', type: 'boolean'},
					{name: 'completed', type: 'boolean'},
					{name: 'redirect'},
					{name: 'starttime'},
					{name: 'endtime'}
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
				{header: 'Name', sortable: true, dataIndex: 'name', renderer: this.renderName},
				{header: 'Status', sortable: true, dataIndex: 'status'},
				{header: 'Started', sortable: true, dataIndex: 'starttime'}
			],
			tbar: this.createToolbar()
		};
	
		Ext.apply(this, Ext.apply(this.initialConfig, config));		
		Ext.ux.vardb.explorer.TaskGrid.superclass.initComponent.apply(this, arguments);
		this.viewConfig.emptyText='<div class="emptyText">No tasks.</div>';
		store.load();
	},
			
	renderName:function(value, p, record)
	{
		return String.format('<a href="{1}" target="_blank">{0}</a>',value,vardb.webapp+'/task.html?id='+record.data.id);
	},

	createToolbar:function()
	{
		var toolbar=new Ext.Toolbar(
		{
			items:
			[
				this.createSelectMenu(),
				'->',this.createReloadButton()
			]
		});
		return toolbar;
	}
});