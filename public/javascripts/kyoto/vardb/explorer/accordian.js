/*global Ext, vardb */
kyoto.vardb.explorer.Accordian = Ext.extend(Ext.Panel,
{
	id: 'accordian',
	region: 'west',
	split: true,
	collapsible: false,//true,
	collapseMode: 'mini',
	width: 200,
	minWidth: 150,
	border: true,
	baseCls: 'x-plain',
	//autoScroll: true,
	
	initComponent:function()
	{
		var self=this;
		var controller=this.controller;
		this.cartgrid=new kyoto.vardb.explorer.CartGrid({controller: controller});
		this.bundlegrid=new kyoto.vardb.explorer.BundleGrid({controller: controller});
		this.alignmentgrid=new kyoto.vardb.explorer.AlignmentGrid({controller: controller});
		//this.taskgrid=new kyoto.vardb.explorer.TaskGrid({controller: controller});
		
		var config=
		{
			defaults: {frame: true, collapsible: true, titleCollapse: true},
			items:
			[
				this.cartgrid,
				this.bundlegrid,
				this.alignmentgrid
				//this.taskgrid
			]
		};

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.Accordian.superclass.initComponent.apply(this, arguments);
		
		controller.addListener('addcart',function(list_id)
		{
			self.cartgrid.store.reload();
			Ext.getCmp('cartpanel').expand();
		});
		
		controller.addListener('opencart',function(list_id)
		{
			
		});
		
		controller.addListener('deletecart',function(bundle_id)
		{
			self.cartgrid.store.reload();
		});
		
		controller.addListener('addbundle',function(bundle_id)
		{
			self.bundlegrid.store.reload();
			Ext.getCmp('bundlepanel').expand();
		});
		
		controller.addListener('deletebundle',function(bundle_id)
		{
			self.bundlegrid.store.reload();
		});
		
		controller.addListener('starttask',function(bundle_id)
		{
			self.taskgrid.store.reload();
		});
	}
});
