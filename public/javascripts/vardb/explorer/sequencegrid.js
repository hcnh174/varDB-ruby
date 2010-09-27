/*global Ext, vardb */
Ext.ux.vardb.explorer.SequenceGrid = Ext.extend(Ext.ux.vardb.LiveSequenceGrid,
{
	initComponent:function()
	{		
		//this.toolbaritems=this.createToolbarItems();
		var toolbaritems=this.createToolbarItems();
		var config=
		{
			toolbaritems: toolbaritems
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.explorer.SequenceGrid.superclass.initComponent.apply(this, arguments);
	},

	addSequencesHandler:function()
	{
		var self=this;
		var dialog=new Ext.ux.vardb.quickcart.QuickSearch({list_id: self.list_id});
		dialog.on('addsequences',function(json)
		{
			self.reloadGrid();
			dialog.close();
		});
	},
	
	removeSequencesHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Cart.removeFromList(self,function(json)
		{
			self.controller.fireEvent('deletesequences',self.list_id);
		});
	},
	
	createEditMenu:function()
	{
		var self=this;
		
		var menu=
		{
			text: 'Edit',
			menu:
			{
				items:
				[
					{
						text: 'Find/Add sequences',
						scope: this,
						handler: this.addSequencesHandler
					},
					{
						text: 'Remove sequences',
						scope: this,
						handler: this.removeSequencesHandler
					}
				]
			}
		};
		return menu;
	},
	
	createSubsetHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Cart.createSubset(self,function(json)
		{
			var tab=self.controller.addCart(json.list_id);
		});
	},
	
	cloneCartHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Cart.cloneCart(self,function(json)
		{
			var tab=self.controller.addCart(json.list_id);
		});
	},
	
	copySequencesHandler:function()
	{
		var self=this;
		var dialog=new Ext.ux.vardb.explorer.CopyDialog({grid: self, mode: 'COPY', callback: function(json)
		{
			dialog.close();
			self.controller.fireEvent('addsequences',self.list_id);
			self.controller.fireEvent('addsequences',json.list_id);
		}});
	},
	
	moveSequencesHandler:function()
	{
		var self=this;
		var dialog=new Ext.ux.vardb.explorer.CopyDialog({grid: self, mode: 'MOVE', callback: function(json)
		{
			dialog.close();
			self.controller.fireEvent('addsequences',self.list_id);
			self.controller.fireEvent('addsequences',json.list_id);
		}});
	},
	
	createSubsetMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Subsets',
			menu:
			{
				items:
				[
					{text: 'Create subset', scope: this, handler: this.createSubsetHandler},
					{text: 'Clone cart', scope: this, handler: this.cloneCartHandler},
					'-',
					{text: 'Copy sequences', scope: this, handler: this.copySequencesHandler},
					{text: 'Move sequences', scope: this, handler: this.moveSequencesHandler}
				]
			}
		};
		return menu;
	},
	
	createToolMenu:function()
	{
		var self=this;		
		var menu=
		{
			text: 'Tools',
			menu:
			{
				items:
				[
					{
						text: 'Regular expression search',
						scope: this,
						handler: function(btn){var dialog=new Ext.ux.vardb.explorer.RegexDialog({controller: self.controller, grid: self});} //
					},
					{
						text: 'GAG binding site search',
						scope: this,
						handler: function(btn){var dialog=new Ext.ux.vardb.explorer.GagDialog({controller: self.controller, grid: self});}
					},
					'-',
					{
						text: 'BLASTClust',
						scope: this,
						handler: function(btn){var dialog=new Ext.ux.vardb.explorer.BlastClustDialog({controller: self.controller, grid: self});}
					}
				]
			}
		};
		return menu;
	},
	
	mafftHandler:function()
	{
		var dialog=new Ext.ux.vardb.explorer.AlignDialog({grid: this});
	},
	
	createAlignmentMenu:function()
	{
		var self=this;		
		var menu=
		{
			text: 'Align',
			menu:
			{
				items:
				[
					{text: 'Mafft', scope: this, handler: this.mafftHandler}
				]
			}
		};
		return menu;
	},
	
	defineGroupsHandler:function()
	{
		var self=this;
		var groups=new Ext.ux.vardb.explorer.GroupDialog(
		{
			grid: self,
			callback: function(){self.reloadTable();}
		});
	},
	
	removeGroupsHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Cart.removeGroups(self.list_id,function(json)
		{
			self.reloadTable();
		});
	},
	
	createGroupMenu:function()
	{
		var self=this;		
		var menu=
		{
			text: 'Groups',
			menu:
			{
				items:
				[
					{text: 'Define groups', scope: this, handler: this.defineGroupsHandler},
					'-',
					{text: 'Remove groups', scope: this, handler: this.removeGroupsHandler}
				]
			}
		};
		return menu;
	},
	
	tagSequencesHandler:function()
	{
		var self=this;
		var dialog=new Ext.ux.vardb.tags.ApplyTagDialog(
		{
			grid: self,
			callback: function(tag)
			{
				self.controller.fireEvent('addtag',tag);
				self.store.reload();
			}
		});
	},
	
	untagSequencesHandler:function()
	{
		var self=this;
		Ext.ux.vardb.tags.Services.untagSequences(self,function(){
			self.reloadTable();
		});
	},
	
	createBundleHandler:function()
	{
		var self=this;
		Ext.ux.vardb.tags.Services.createBundle(function(bundle){
			self.controller.addBundle(bundle.bundle_id);
		});
	},
	
	uploadBundleHandler:function()
	{
		var self=this;
		var dialog=new Ext.ux.vardb.tags.UploadBundleDialog();
		dialog.on(
		{
			'bundleuploaded': function(bundle)
			{
				self.controller.onBundleUploaded(bundle);
			}
		});
	},
	
	createJoinHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Vardb.ajaxRequest('/ajax/lists/bundles.json',{list_id: self.list_id},function(bundles)
		{
			var dialog=new Ext.ux.vardb.explorer.JoinDialog({controller: self.controller, list_id: self.list_id, bundles: bundles});
		});
	},
	
	tagCloudHandler:function()
	{
		Ext.ux.vardb.Cart.createTagCloud(this);
	},
	
	createTagMenu:function()
	{
		var menu=
		{
			text: 'Tags',
			menu:
			{
				items:
				[
					{text: 'Tag sequences', scope: this, handler: this.tagSequencesHandler},
					{text: 'Un-tag sequences', scope: this, handler: this.untagSequencesHandler},
					'-',
					{text: 'Create bundle', scope: this, handler: this.createBundleHandler},
					{text: 'Upload bundle', scope: this, handler: this.uploadBundleHandler},
					'-',
					//{text: 'Create join', scope: this, handler: this.createJoinHandler},
					//'-',
					{text:' Tag cloud', scope: this, handler: this.tagCloudHandler}
				]
			}
		};
		return menu;
	},
	
	createToolbarItems:function()
	{
		var items=
		[
			'<b>Cart</b>','-',
			this.createEditMenu(),'-',
			this.createSortMenu(),'-',
			this.createSubsetMenu(),'-',
			this.createTagMenu(),'-',
			this.createGroupMenu(),'-',
			this.createSummaryMenu(),'-',
			this.createDownloadMenu(),'-',
			this.createAlignmentMenu(),'-'
			//this.createToolMenu(),'-'
		];		
		return items;
	}
});
