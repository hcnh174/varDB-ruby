/*global Ext, vardb, confirm */
kyoto.vardb.explorer.CopyDialog = Ext.extend(Ext.Window,
{
	title: 'Copy/move sequences',
	width: 400,
	closable: true,
	
	initComponent:function()
	{
		this.list_id=this.grid.list_id;
	
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
		store.load();
		
		var cartField=
		{
			xtype: 'combo',
			hiddenName: 'list_id',
			fieldLabel: 'Destination',
			store: store,
			valueField: 'list_id',
			displayField: 'title',
			mode: 'remote',
			triggerAction: 'all',
			emptyText: 'Select a cart',
			selectOnFocus: true,
			allowBlank: false
		};
		
		var modeField=
		{
			xtype: 'combo',
			hiddenName: 'mode',
			fieldLabel: 'Mode',
			store: [['COPY','Copy sequences'],['MOVE','Move sequences']],
			valueField: 'value',
			displayField: 'label',
			mode: 'local',
			triggerAction: 'all',
			selectOnFocus: true,
			value: this.mode
		};
	
		this.form=new Ext.FormPanel(
		{
			labelWidth: 70,
			defaults: {width: 200},	//, allowBlank:false},
			items:
			[
				cartField,
				modeField
			],
			buttons:
			[
				{
					text: 'Submit',
					formBind: true,
					scope: this,
					handler: this.submitHandler
				},
				{
					text: 'Cancel',
					formBind: true,
					scope: this,
					handler: function(){this.hide();}
				}
			]
		});
	
		var config=
		{
			items: this.form
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.CopyDialog.superclass.initComponent.apply(this, arguments);
		this.show();
	},
	
	submitHandler:function()
	{
		var to_list_id=this.form.getForm().findField('list_id').getValue();
		var name=this.form.getForm().findField('list_id').getRawValue();
		if (this.list_id==='')
		{
			Ext.MessageBox.alert('Warning','Please select a cart');
			return;
		}
		var mode=this.form.getForm().findField('mode').getValue();
		var params=this.getSelection(this.grid,'FILTERED');
		params.from_list_id=this.list_id;
		params.to_list_id=to_list_id;
		var self=this;
		var message=mode+' '+params.total+' sequences to '+name+'?';
		var url='/ajax/lists/'+mode.toLowerCase()+'.json';
		kyoto.vardb.Vardb.ajaxRequestConfirm(message,url,params,this.callback);
	},
	
	getSelection:function(grid,selection)
	{
		var params={}, filter;
		params.total=0;
		var ids=grid.getSelectedIds();
		if (!selection)
			{selection='FILTERED';}
		if (ids.length>0)
			{selection='CHECKED';}
		if (selection==='CHECKED')
		{
			if (ids.length===0)
			{
				if (!confirm("No sequences selected. Use current filter instead? ("+grid.store.getTotalCount()+")"))
					{return;}
				selection='FILTERED';
			}
			else
			{
				params.ids=ids.join(',');
				params.total=ids.length;
			}
		}
		if (selection==='FILTERED')
		{
			filter=grid.store.baseParams.filter.trim();
			if (filter==='')
				{selection='ALL';}
			else
			{
				params.filter=filter;
				params.total=grid.store.getTotalCount();
			}
		}
		if (selection==='ALL')
			{params.total=grid.store.getTotalCount();}
		return params;
	}
});
