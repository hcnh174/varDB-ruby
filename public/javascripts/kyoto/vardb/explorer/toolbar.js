/*global Ext, vardb */
kyoto.vardb.explorer.Toolbar = Ext.extend(Ext.Toolbar,
{
	height: 25,

	initComponent:function()
	{
		var controller=this.controller;
		
		var searchmenu=
		{
			text: 'Search',
			handler: function(btn)
			{
				var dialog=new kyoto.vardb.quickcart.QuickSearch({});
				dialog.on('addsequences',function(json)
				{
					controller.onAddSequences(json);
				});
			}
		};
		
		var batchlookupmenu=
		{
			text: 'Batch lookup',
			handler: function(btn)
			{
				var dialog=new kyoto.vardb.explorer.BatchLookupDialog(function(cart)
				{
					controller.addCart(cart.list_id);
				});
			}
		};
		
		var usersequencesmenu=
		{
			text: 'Upload sequences',
			disabled: this.controller.userdetails.anonymous,
			handler: function(btn)
			{
				var dialog=new kyoto.vardb.UploadSequencesDialog(
				{
					maxUserSequences: controller.configuration.maxUserSequences,
					callback: function(cart)
					{
						controller.addCart(cart.list_id);
					}
				});
			}
		};
		
		var config=
		{
			items:
			[
				'<a href="'+vardb.webapp+'/homepage.html" class="explorer-toolbar" target="_blank">varDB homepage</a>',
				'-',searchmenu,
				'-',batchlookupmenu,
				'-',usersequencesmenu,
				'->',
				'<a href="'+vardb.webapp+'/user.html" class="explorer-toolbar" target="_blank">'+this.controller.userdetails.name+'</a>'
			 ]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.Toolbar.superclass.initComponent.apply(this, arguments);
	}
});

