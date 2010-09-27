/*global Ext, vardb */
Ext.ux.vardb.explorer.BatchLookupDialog = Ext.extend(Ext.Window,
{
	title: 'Bulk lookup by accessions',
	width: 180,
	closable: true,
	resizable: true,
	
	constructor:function(callback)
	{
		this.callback=callback;
		Ext.ux.vardb.explorer.BatchLookupDialog.superclass.constructor.call(this);
	},
	
	initComponent:function()
	{		
		var accessionsField=
		{
			xtype: 'textarea',
			fieldLabel: 'Accessions',
			name: 'accessions',
			anchor: '-2',
			//width: 150,
			height: 200,
			allowBlank: false
		};
		
		this.form=new Ext.FormPanel(
		{
			labelAlign: 'top',
			bodyStyle: 'padding: 5px 5px 0',
			defaults: {labelWidth: 70},
			items:
			[
				accessionsField
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
					scope: this,
					handler: function(){this.hide();}
				}
			]
		});
		
		this.items=[this.form];
		Ext.ux.vardb.explorer.BatchLookupDialog.superclass.initComponent.apply(this, arguments);
		this.show();
	},
	
	submitHandler:function()
	{
		if (!this.form.getForm().isValid())
			{return;}
		var self=this;
		this.form.getForm().submit(
		{
			url: vardb.webapp+'/ajax/lists/create_subset_fromaccessions.json',
			waitMsg: 'Looking up accessions',
			failure: Ext.ux.vardb.Vardb.onFormFailure,
			scope: this,
			success: function(form,action)
			{
				var cart=action.result;
				self.hide();
				if (self.callback)
					{self.callback(cart);}
			}
		});
	}
});
