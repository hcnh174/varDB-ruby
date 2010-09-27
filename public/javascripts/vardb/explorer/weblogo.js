/*global Ext, vardb, escape */
Ext.ux.vardb.explorer.WebLogo = Ext.extend(Ext.Window,
{
	layout:'fit',
	width: 250,
	height: 210,
	title: 'Web logo',
	
	initComponent:function()
	{
		var html=String.format('<img src="{0}/explorer/ajax/regex/weblogo.img?identifier={1}&regex={2}" alt="Generating..."/>',
			vardb.webapp,this.identifier,escape(this.regex));
		
		var config=
		{
			html: html,
			buttons:
			[
				{
					text: 'Close',
					scope: this,
					handler: function(){this.hide();}
				}
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.explorer.WebLogo.superclass.initComponent.apply(this, arguments);
	}
});
