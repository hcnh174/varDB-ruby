/*global Ext, nelson */
nelson.widgets.SelectColumnsDialog = Ext.extend(Ext.Window,
{
	title: 'Select columns',
	width: 560,
	//height: 160,
	closable: true,
	resizable: true,
	
	initComponent:function()
	{
		var self=this;
		if (!this.grid)
			{throw 'Grid has not been set';}
		if (!this.grid.attributes)
			{throw 'Attributes have not been set';}
		this.curColumns=self.grid.store.baseParams.columns.split(',');
		
		var storeConfig=
		{
			root: 'rows',
			idProperty: 'id',
			fields: ['id', 'tagtype_id', 'name', 'description', 'type', 'hidden']
		};
	
		var store1 = new Ext.data.JsonStore(storeConfig);
		var store2 = new Ext.data.JsonStore(storeConfig);
		
		var attributes={rows:[]};
		var selected={rows:[]};
		
		Ext.each(this.grid.attributes.rows,function(item,index,allItems)
		{
			if (self.isSelected(item.id))
				{selected.rows.push(item);}
			else {attributes.rows.push(item);}
		},this);
		
		store1.loadData(attributes);
		store2.loadData(selected);
		
		this.form = new Ext.form.FormPanel(
		{
			bodyStyle: 'padding:10px;',
			items:
			[
				{
					xtype: 'itemselector',
					name: 'itemselector',
					hideLabel: true,
					imagePath: '/hdb/images/extjs/itemselector/',
					//imagePath: utils.webapp+'/images/extjs/itemselector/',
					multiselects:
					[
						{
							width: 250,
							height: 200,
							store: store1,
							displayField: 'id',
							valueField: 'id'
						},
						{
							width: 250,
							height: 200,
							store: store2,
							displayField: 'id',
							valueField: 'id',
							tbar:
							[
								{
									text: 'Clear',
									formBind: true,
									scope: this,
									handler: this.resetHandler
								}
							]
						}
					]
				}
			]
		});
		
		var config=
		{
			items: this.form,
			buttons:
			[
				{
					text: 'Submit',
					formBind: true,
					scope: this,
					handler: this.submitHandler
				},
				{
					text: 'Close',
					formBind: true,
					scope: this,
					handler: this.closeHandler
				}
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		nelson.widgets.SelectColumnsDialog.superclass.initComponent.apply(this, arguments);
		this.show();
	},
	
	isSelected:function(id)
	{
		var self=this;
		var selected=false;
		Ext.each(self.curColumns,function(item,index,allItems)
		{
			if (item===id)
			{
				selected=true;
				return false;
			}
		},this);
		return selected;
	},

	resetHandler:function()
	{
		this.form.getForm().findField('itemselector').reset();
	},
	
	submitHandler:function()
	{
		var form=this.form.getForm();
		if (!form.isValid())
			{return;}
		var cols=form.findField('itemselector').getValue();
		if (cols==='')
		{
			Ext.Msg.alert('Alert','Please select at least one column');
			return;
		}
		this.grid.updateColumns(cols);
		this.close();
	},
	
	closeHandler:function()
	{
		this.hide();
	}
});
