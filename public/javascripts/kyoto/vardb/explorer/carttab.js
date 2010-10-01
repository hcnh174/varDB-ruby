/*global Ext, vardb */
kyoto.vardb.explorer.CartTab = Ext.extend(Ext.Panel,
{
	layout: 'border',
	closable: true,
	headerAsText: false,
	hideMode: Ext.isIE ? 'offsets' : 'display',	
	tabtype: 'cart',
	forceLayout:true,
	
	initComponent:function()
	{
		var cart=this.cart;
		
		var grid=new kyoto.vardb.explorer.SequenceGrid(
		{
			controller: this.controller,
			list_id: this.cart.list_id,
			pagesize: 20,//this.pagesize,
			counts: this.cart.counts,
			region: 'center'
		});
		
		var form=new kyoto.vardb.FilterForm(
		{
			list_id: this.cart.list_id,
			counts: this.cart.counts,
			region: 'east',
			collapsible: true,
			width: 220,			
			onFilter: function(filter)
			{
				grid.store.baseParams.filter=filter;
				grid.store.reload();
			}
		});
		
		var config=
		{
			id: 'tab_cart_'+cart.list_id,
			title: cart.title,
			defaults: {split: false},
			items: [form,grid]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.CartTab.superclass.initComponent.apply(this, arguments);
		
		this.grid=grid;
		this.form=form;
	}
});
