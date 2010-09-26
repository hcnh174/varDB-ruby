/*global Ext, vardb, confirm */
Ext.ux.vardb.explorer.Explorer = Ext.extend(Ext.Viewport,
{
	layout: 'border',
	anonymous: true,
	title: 'Title',
	
	initComponent:function()
	{	
		this.alignments=[];
		
		this.addEvents(
		{
			addcart: true,
			opencart: true,
			deletecart: true,
			filter: true,
			addsequences: true,
			deletesequences: true,
			addbundle: true,
			deletebundle: true,
			addtag: true,
			deletetag: true,
			addattribute: true,
			deleteattribute: true,
			updatejoin: true,
			addalignment: true,
			startjob: true
		});
		
		this.tabpanel=new Ext.TabPanel(
		{
			region: 'center',
			xtype: 'tabpanel',
			baseCls: 'x-plain',
			deferredRender: true, //false,
			layoutOnTabChange: true,
			defaults: {autoScroll: true, hideMode :'offsets'},
			activeTab: 0,
			enableTabScroll: true
		});
	
		var header=
		{
			xtype: 'panel',
			region: 'north',
			height: 55,
			items:
			[
				{html: '<div id="explorer-header"><h1>varDB Explorer</h1></div>', height: 30, border: false},
				new Ext.ux.vardb.explorer.Toolbar({controller: this})
			]
		};
		
		this.accordian=new Ext.ux.vardb.explorer.Accordian({controller: this});
		
		var config=
		{
			items:
			[
				header,
				this.accordian,
				this.tabpanel
			]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));		
		Ext.ux.vardb.explorer.Explorer.superclass.initComponent.apply(this, arguments);
		
		this.addCart(this.carts[0].list_id,function()
		{
			Ext.get('loading').remove();
		});
	},
	
	addCartTab:function(cart)
	{
		var tab=new Ext.ux.vardb.explorer.CartTab({controller: this, cart: cart});
		this.tabpanel.add(tab);
		this.tabpanel.setActiveTab(tab);
	},
	
	addBundleTab:function(bundle)
	{
		var controller=this;
		var params={bundle_id: bundle.bundle_id, start:0,limit:0};
		Ext.ux.vardb.Vardb.ajaxRequest('/tags/ajax/bundle.json',params,function(bundle)
		{
			var tab=new Ext.ux.vardb.explorer.BundleTab({controller: controller, bundle: bundle});
			controller.tabpanel.add(tab);
			controller.tabpanel.setActiveTab(tab);
		});
	},
	
	addAlignmentTab:function(alignment)
	{
		var tab=new Ext.ux.vardb.explorer.AlignmentTab({controller: this, alignment: alignment});
		this.tabpanel.add(tab);
		this.tabpanel.setActiveTab(tab);
	},
	
	addJoinTab:function(params)
	{
		var controller=this;
		params.controller=controller;
		Ext.ux.vardb.Vardb.ajaxRequest('/tags/ajax/bundles.json',{bundle_ids: params.bundle_ids},function(bundles)
		{
			params.bundles=bundles;
			var tab=new Ext.ux.vardb.explorer.JoinGrid(params);
			controller.tabpanel.add(tab);
			controller.tabpanel.setActiveTab(tab);
		});
	},
	
	/////////////////////////////////////////

	deleteBundle:function(bundle_id)
	{
		if (!confirm('Permanently delete this bundle?'))
			{return false;}
		Ext.ux.vardb.Vardb.ajaxRequest('/tags/ajax/bundles/delete.json',{bundle_id: bundle_id});// no callback?
		this.fireEvent('deletebundle',bundle_id);
		return true;
	},
	
	addCart:function(list_id,callback)
	{
		var self=this;
		Ext.ux.vardb.Vardb.ajaxRequest('/ajax/lists/cart.json',{list_id: list_id},function(cart)
		{
			self.carts.push(cart);
			self.addCartTab(cart);
			self.fireEvent('opencart',cart.list_id);
			if (callback)
				{callback(cart);}
		});
	},
	
	addBundle:function(bundle_id)
	{
		var controller=this;
		Ext.ux.vardb.Vardb.ajaxRequest('/tags/ajax/bundle.json',{bundle_id: bundle_id, start:0,limit:0},function(bundle)
		{
			controller.addBundleTab(bundle);
			controller.fireEvent('addbundle',bundle.bundle_id);
		});
	},
	
	addAlignment:function(alignment)
	{
		this.addAlignmentTab(alignment);
		this.fireEvent('addalignment',alignment.identifier);
	},
	
	////////////////////////////////////////////////////
	
	onAddSequences:function(json)
	{
		this.accordian.cartgrid.store.reload();
	},
	
	onBundleUploaded:function(bundle)
	{
		this.addBundle(bundle.bundle_id);
	}
	
	///////////////////////////////////////////////
	
	/*
	getTabWidth:function()
	{
		return this.tabpanel.getInnerWidth();
	}
	*/
});
