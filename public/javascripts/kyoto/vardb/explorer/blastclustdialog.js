/*global Ext, vardb */
kyoto.vardb.explorer.BlastClustDialog = Ext.extend(Ext.Window,
{
	title: 'BLASTclust',
	width: 400,
	closable: true,
	resizable: true,
	
	initComponent:function()
	{
		var self=this;
	
		var nameField=
		{
			xtype:'textfield',
			fieldLabel: 'Title',
			name: 'name',
			value: 'BLASTClust results',
			//anchor: '-4'
			width: 232
		};
		
		this.progressBar = new Ext.ProgressBar(
		{
			autoWidth: true,
			hidden: true,
			text: 'Working...'
		});
		
		this.submitButton=new Ext.Button(
		{
			text: 'Run Blastclust',
			scope: self,
			formBind: true,
			handler: this.submitHandler
		});
		
		var typeField=new kyoto.vardb.SelectList(
		{
			data: [['true','Protein'],['false','DNA']],
			hiddenName: 'protein',
			fieldLabel: 'Type',
			value: 'true'
		});
		
		var minimumLengthField=
		{
			xtype: 'textfield',
			fieldLabel: 'Minimum length',
			name: 'minimumLength',
			value: '0.8',
			width: 50
		};
		
		var similarityThresholdField=
		{
			xtype:'textfield',
			fieldLabel: 'Similary Threshold',
			name: 'similarityThreshold',
			value: '60',
			width: 50
		};
		
		this.form=new Ext.FormPanel(
		{
			labelWidth: 100,
			url:'',
			defaults: {width: 230, allowBlank:false},
			defaultType: 'textfield',
			monitorValid: true,
			items:
			[
				nameField,
				typeField,
				minimumLengthField,
				similarityThresholdField,
				this.progressBar
			],
			buttons:
			[
				this.submitButton,
				{
					text: 'Cancel',
					scope: this,
					handler: function(){this.hide();}
				}
			]
		});
	
		var config=
		{
			items: [this.form]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.BlastClustDialog.superclass.initComponent.apply(this, arguments);		
		this.show();
	},
	
	submitHandler:function()
	{
		var win=this;
		this.submitButton.disable();
		var total=this.grid.store.getTotalCount();
		/*
		if (total>this.MAX_BLAST_CLUST_SEQUENCES)
		{
			Ext.MessageBox.alert('Error','Too many sequences selected. Please create a subset with '+this.MAX_BLAST_CLUST_SEQUENCES+' or fewer sequences');
			return;
		}
		*/
		Ext.MessageBox.confirm('Confirm', 'Run BLASTclust on all sequences? ('+total+')',function(btn)
		{
			if (btn!=='yes')
				{return;}			
			win.form.getForm().submit(
			{
				method: 'post',
				waitTitle: 'Connecting',
				waitMsg: 'Sending data...',
				url: vardb.webapp+'/ajax/blastclust.json',
				params: {list_id: win.grid.list_id},
				timeout: 30*60*1000,
				success: function(form,action)
				{
					var cart=Ext.decode(action.response.responseText);
					win.progressBar.reset();
					win.progressBar.updateText('Done.');
					win.controller.addCart(cart.list_id);
					win.hide();
				},
				failure: function(form,action)
				{
					win.progressBar.reset();
					win.hide();
					kyoto.vardb.Vardb.onFormFailure(form,action);
				}
			});
		});
	}
});
