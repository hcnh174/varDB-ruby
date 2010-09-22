/*global Ext, nelson, utils */
nelson.tags.NewTagDialog = Ext.extend(Ext.Window,
{
	title: 'Create a new tag',
	width: 400,
	closable: true,
	resizable: true,

	initComponent:function()
	{	
		var nameField=
		{
			xtype: 'textfield',
			fieldLabel: 'Tag',
			name: 'name',
			value: '',
			allowBlank: true,
			validateOnBlur: false,
			vtype: 'alphanum'
		};
		
		this.form=new Ext.FormPanel(
		{
			labelWidth: 50,
			url:'',
			defaults: {width: 230, allowBlank:false},
			monitorValid: true,
			items:
			[
				nameField
			],
			buttons:
			[
				{
					text:'Submit',
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
		
		var config=
		{	
			items:[this.form]
		};

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		nelson.tags.NewTagDialog.superclass.initComponent.apply(this, arguments);

		this.show();
	},
	
	submitHandler:function()
	{
		var win=this;
		var name=this.form.getForm().findField('name').getValue();
		var message='Create new tag "'+name+'"?';
		utils.ajaxRequestConfirm(message,'/tags/ajax/tags/new.json',{name: name},function(tag)
		{
			win.hide();
			win.callback(tag);
		});
	}	
});
