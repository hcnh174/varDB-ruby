/*global Ext, vardb */
kyoto.vardb.blast.Results=Ext.extend(Ext.Panel,
{
	title: 'BLAST results',
	frame: true,
	autoWidth: true,
	height: 620,
	layout: 'border',	

	initComponent:function()
	{
		var grid=new kyoto.vardb.blast.Grid(
		{
			list_id: this.list_id,
			counts: this.counts,
			region: 'center',
			blasttype: this.blasttype
		});
		
		var form=new kyoto.vardb.FilterForm(
		{
			list_id: this.list_id,
			counts: this.counts,
			region: 'west',
			collapsible: true,
			collapseMode: 'mini',
			width: 220,
			onFilter: function(filter)
			{
				grid.store.baseParams.filter=filter;
				grid.store.reload();
			}
		});
		
		var tabpanel=
		{
			xtype: 'tabpanel',
			region: 'west',
			collapsible: true,
			collapseMode: 'mini',
			activeTab: 0,
			width: 200,
			items: [form]
		};
		
		var config=
		{
			autoScroll: true,
			defaults: {split: true, autoScroll: true},
			items:
			[
				form,
				grid								
			]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.blast.Results.superclass.initComponent.apply(this, arguments);
	}	
});