/*global Ext, vardb, alert */
kyoto.vardb.explorer.GroupDialog = Ext.extend(Ext.Window,
{
	title: 'Define groups',
	width: 600,
	closable: true,
	numgroups: 4,
	resizable: true,
	autoScroll: true,
	
	initComponent:function()
	{
		var self=this;
		if (!this.grid)
			{throw 'grid property is not assigned in GroupDialog';}
			
		if (this.numgroups>=10)
		{
			this.autoHeight=false;
			this.height=400;
			//this.autoScroll=true;
		}
		
		var items=[], num;
		for (num=1;num<=this.numgroups;num++)
		{
			items.push(this.createRow(num));
		}

		var addGroupButton=new Ext.Button(
		{
			text: 'Add group',
			scope: self,
			//formBind: true,
			handler: this.addGroup
		});
		
		var submitButton=new Ext.Button(
		{
			text: 'Submit',
			scope: self,
			formBind: true,
			handler: this.submitHandler
		});
		
		var form=new Ext.FormPanel(
		{
			defaultType: 'textfield',
			monitorValid: true,
			frame: true,
			items: items,
			buttons: [addGroupButton,submitButton]
		});

		var config=
		{
			items: [form],
			form: form
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.GroupDialog.superclass.initComponent.apply(this, arguments);	
		this.show();
	},
	
	createRow:function(num)
	{
		var row=
		{
			xtype: 'panel',
			layout: 'column',
			anchor: '100%',
			items:
			[
				{
					columnWidth: 0.35,
					layout: 'form',
					labelWidth: 55,
					items:
					[
						{
							xtype: 'textfield',
							fieldLabel: 'Group '+num,
							name: 'group'+num+'name',
							anchor: '-5',
							allowBlank: (num>2)
						}
					]
				},
				{
					columnWidth: 0.65,
					labelWidth: 60,
					layout: 'form',
					items:
					[
						{
							xtype: 'textfield',
							fieldLabel: 'Condition',
							name: 'group'+num+'condition',
							anchor: '-5',
							allowBlank: (num>2)
						}
					]
				},
				{
					width: 60,
					layout: 'form',
					items:
					[
						{
							xtype: 'button',
							text: 'Preview',
							scope: this,
							formBind: true,
							handler: function(){this.previewQuery(num);}
						}
					]
				}
			]
		};
		return row;
	},
	
	previewQuery:function(num)
	{
		var query=this.form.getForm().findField('group'+num+'condition').getValue().trim();
		if (query==='')
		{
			alert('No condition specified.');
			return;
		}
		query=query+=' AND cart='+this.grid.list_id; 
		var dialog=new kyoto.vardb.explorer.Search({controller: this.controller, query: query});
	},
	
	addGroup:function()
	{
		var num=this.numgroups+1;
		var row=this.createRow(num);
		this.form.add(row);
		this.numgroups=num;
		this.doLayout();
	},
	
	submitHandler:function()
	{
		var self=this;
		Ext.MessageBox.confirm('Confirm', 'Remove any existing groups and create groups based on the provided conditions?',function(btn)
		{
			if (btn!=='yes')
				{return;}
			self.form.getForm().submit(
			{
				method: 'post',
				waitTitle: 'Connecting',
				waitMsg: 'Sending data...',
				url: vardb.webapp+'/ajax/cart/groups/define.json',
				params: {list_id: self.grid.list_id, numgroups: self.numgroups},
				timeout: 30*60*1000,
				success: function(form,action)
				{
					var json=Ext.decode(action.response.responseText);
					self.hide();
					if (self.callback)
						{self.callback(json);}					
				},
				failure: function(form,action)
				{
					self.hide();
					kyoto.vardb.Vardb.onFormFailure(form,action);
				}
			});
		});
	}
});
