/*global Ext, vardb */
Ext.ux.vardb.explorer.BundleTab = Ext.extend(Ext.ux.vardb.Grid,	
{
	hideMode: Ext.isIE ? 'offsets' : 'display',
	headerAsText : false,			
	closable: true,
	frame: false,
	autoWidth: true,
	autoHeight: true,
	enableColumnMove: true,
	stripeRows: true,
	loadMask: true,
	collapsible: false,				
	animCollapse: false,
	tabtype: 'BUNDLE',
	pagesize: 30,
	
	initComponent:function()
	{		
		var grid=this;
		this.bundle_id=this.bundle.bundle_id;
		var bundle_id=this.bundle_id;
		var controller=this.controller;
		
		var reader=new Ext.data.JsonReader();

		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/tags/ajax/bundle.json',
			reader: reader,
			remoteSort: true,
			sortInfo: {field: 'name', direction: 'ASC'},
			baseParams: {bundle_id: bundle_id}
		});
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20});
		
		function renderTagName(value, p, r)
		{
			return '<a href="#" onclick="Ext.ux.vardb.tags.Services.editTag(\''+r.data.id+'\')">'+value+'</a>';		}
		
		var columns=[], index, field;
		columns.push(sm);
		columns.push({header: 'Name', width: 100, sortable: true, dataIndex: 'name', renderer: renderTagName});
		for (index=0;index<this.bundle.definitions.length;index++)
		{
			field=this.bundle.definitions[index];
			columns.push({header: field.name, sortable: true, dataIndex: field.name, tooltip: field.description});
		}
		columns.push({header: 'Count', width: 50, sortable: true, dataIndex: 'numsequences'});

		var editmenu=this.createSelectMenu();
		
		var tagmenu=
		{
			text: 'Tags',
			disabled: this.bundle.readonly,
			menu:
			{
				items:
				[
					{text: 'Edit bundle',handler: function(btn){var dialog=new Ext.ux.vardb.tags.EditBundleDialog({bundle_id: bundle_id});}},
					'-', {text: 'Add tag',handler: function(btn){grid.newTag(bundle_id);}},
					{
						text: 'Upload tags',
						handler: function(btn)
						{
							var dialog=new Ext.ux.vardb.tags.UploadTagsDialog({bundle_id: bundle_id, callback: function(bundle)
							{
								grid.loadGrid();
							}});
						}
					},
					{text: 'Add attribute',handler: function(btn){var dialog=new Ext.ux.vardb.tags.DefinitionDialog({bundle_id: bundle_id, callback: this.loadGrid});}},
					{text: 'Delete tag(s)',handler: function(btn){grid.deleteSelectedTags(bundle_id);}},
					'-',
					{
						text:'Upload join file',
						handler: function()
						{
							var dialog=new Ext.ux.vardb.tags.UploadJoinDialog({bundle_id: bundle_id, callback: function(json)
							{
								controller.fireEvent('updatejoin');
							}});
						}
					}
				]
			}
		};
		
		var downloadmenu=
		{
			text: 'Download',
			menu:
			{
				items:
				[
					{text: 'Download bundle',handler: function(btn){var dialog=new Ext.ux.vardb.tags.DownloadBundleDialog({grid: grid});}},
					{text: 'Create/download join',handler: function(btn){Ext.ux.vardb.tags.Services.joinByBundle(bundle_id);}}
				]
			}
		};
		
		var analysismenu=
		{
			text: 'Analysis',
			menu:
			{
				items:
				[
					{text: 'Summary',handler: function(btn){var dialog=new Ext.ux.vardb.tags.SummaryDialog({bundle_id: bundle_id});}}
				]
			}
		};
		
		var reloadMenu=
		{
			text: 'Reload',
			handler: function(btn){grid.reloadTable();}
		};
		
		var toolbar=new Ext.PagingToolbar({
			plugins: new Ext.ux.Andrie.pPageSize({variations: [5,10,20,30]}),
			pageSize: this.pagesize,
			store: store,
			displayInfo: true,
			displayMsg: 'Tags {0} - {1} of {2}',
			emptyMsg: 'No tags to display',
			items:
			[
				'-',reloadMenu,
				'-',editmenu,
				'-',tagmenu,
				'-',downloadmenu,
				'-',analysismenu
			]
		});
		
		var config=
		{
			id: 'tab_bundle_'+this.bundle.bundle_id,
			title: this.bundle.name,
			tabTip: this.bundle.description,
			viewConfig: {forceFit: true},
			tbar: toolbar,
			sm: sm,
			store: store,
			columns: columns
		};
		
		store.load({params:{start: 0,limit: this.pagesize}});
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.explorer.BundleTab.superclass.initComponent.apply(this, arguments);
		this.viewConfig.emptyText='<div class="emptyText">No tags.</div>';

		controller.addListener('addtag',function(tag)
		{
			if (tag.bundle_id!==bundle_id)
				{return;}
			grid.reloadTable();
		});
		
		controller.addListener('deletetag',function(tag)
		{
			if (tag.bundle_id!==bundle_id)
				{return;}
			grid.reloadTable();
		});
		
		controller.addListener('addattribute',function(attribute)
		{
			if (attribute.bundle_id!==bundle_id)
				{return;}
			grid.reloadTable();
		});
		
		controller.addListener('deleteattribute',function(tag)
		{
			if (tag.bundle_id!==bundle_id)
				{return;}
			grid.reloadTable();
		});
	},
	
	reloadTable:function()
	{
		this.store.reload();
	},
	
	loadGrid:function()
	{
		this.store.reload();
	},

	deleteSelectedTags:function(bundle_id)
	{
		var grid=this;
		var ids=this.getSelectedIds();
		if (ids.length===0)
		{
			Ext.MessageBox.alert('Alert',"No tags selected");
			return;
		}
		var message='Remove the selected tags? ('+ids.length+')';
		if (ids.length===1)
			{message='Remove the selected tag? ('+ids.length+')';}
		var params={bundle_id: bundle_id, ids: ids.join(',')};
		Ext.ux.vardb.Vardb.ajaxRequestConfirm(message,'/tags/ajax/tags/delete.json',params,function(json)
		{
			Ext.MessageBox.alert('Success', json.message);
			grid.store.load({params:{start:0}});		
		});
	},
	
	newTag:function(bundle_id)
	{
		var controller=this.controller;
		var dialog=new Ext.ux.vardb.tags.NamePromptDialog({type: 'tag', callback: function(name)
		{
			var params={bundle_id: bundle_id, name: name, ids: ''};
			Ext.ux.vardb.Vardb.ajaxRequest('/tags/ajax/tags/new.json',params,function(tag)
			{
				controller.fireEvent('addtag',tag);
			});
		}});
	}	
});
