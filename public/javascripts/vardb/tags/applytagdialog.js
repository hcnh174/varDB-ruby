/*global Ext, nelson, utils, alert */
nelson.tags.ApplyTagDialog = Ext.extend(Ext.Window,
{
	title: 'Tag sequences',
	width: 400,
	closable: true,
	resizable: true,
	
	initComponent:function()
	{
		var self=this;
		
		var store = new Ext.data.Store(
		{
			url: utils.webapp+'/tags/ajax/usertags.json',
			reader: new Ext.data.JsonReader(
			{
				root: 'tags',
				totalProperty: 'totalCount'
			},
			[
				{name: 'id', type: 'int'},
				{name: 'name'},
				{name: 'numitems', mapping: 'numitems', type: 'int'}
			])
		});
		
		var tagCombo=new Ext.ux.form.ComboBoxAdd(
		{
			name: 'tag_id',
			allowBlank: false,
			store: store,
			valueField: 'id',
			displayField: 'name',
			fieldLabel: 'Tag',
			typeAhead: true,
			minChars: 0,
			loadingText: 'Loading...',
			width: 249,
			listWidth: 300,
			emptyText: 'Select a tag',
			resizable: true,
			listeners:
			{
				add: function(e)
				{
					var dialog=new nelson.tags.NewTagDialog(
					{
						x: self.getPosition()[0]+30,
						y: self.getPosition()[1]+30,
						callback: function(tag){tagCombo.insert(0,tag);}
					});
				}
			}
		});
		
		var form=new Ext.FormPanel(
		{
			labelWidth: 50,
			url: '',
			defaults: {allowBlank:true},
			items: tagCombo,
			buttons:
			[
				{
					text: 'Submit',
					formBind: true,
					scope: self,
					handler: self.submitHandler
				},
				{
					text: 'Cancel',
					scope: self,
					handler: function(){self.hide();}
				}
			]
		});

		var config=
		{
			items: [form]
		};
		
		this.form=form;
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		nelson.tags.ApplyTagDialog.superclass.initComponent.apply(this, arguments);
		this.show();
	},
	
	submitHandler:function()
	{
		var self=this;
		var callback=function()
		{
			if (self.grid)
				{self.grid.store.reload();}
			self.hide();
		};
		
		var tag_id=this.form.getForm().findField('tag_id').getValue();
		if (tag_id==='')
		{
			alert('Please select a tag.');
			return;
		}
		if (this.grid)
		{
			var ids=this.grid.getSelectedIds();
			var total=ids.length;
			if (total>0)
			{
				nelson.tags.Tags.tagItemsById(tag_id,ids,callback);
			}
			else
			{
				total=this.grid.store.getTotalCount();
				var filter=this.grid.store.baseParams.filter;
				if (this.grid.list_id)
					{nelson.tags.Tags.tagSequencesByList(tag_id,this.grid.list_id,filter,total,callback);}
				else {nelson.tags.Tags.tagSequencesByFilter(tag_id,filter,total,callback);}
			}
		}
		// if a sequence_id has been specified, apply a tag to the selected sequence
		else if (this.sequence_id)
		{
			nelson.tags.Tags.tagItemsById([this.sequence_id]);
		}
		else {throw 'no grid or sequence_id is defined in ApplyTagDialog';}
	}
});

