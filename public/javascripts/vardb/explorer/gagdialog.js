/*global Ext, vardb */
Ext.ux.vardb.explorer.GagDialog = Ext.extend(Ext.Window,
{
	title: 'Glycosaminoglycan binding site search',
	width: 700,
	height: 450,
	layout: 'border',
	closable: true,
	resizable: true,		
	defaults: {split:true},
	
	initComponent:function()
	{
		var patternField=this.createPatternField('XBBXBX,XBBXXBX,XBBXXXBX,XBBBXXBX'.split(','));
		var bField=this.createMacroField('b','Basic residues (B)','HKR');
		var xField=this.createMacroField('x','Any residue (X)','GASTCVLIMPFYWDENQHKR');
	
		this.sequencegrid=new Ext.ux.vardb.explorer.regex.SequenceTable(this.controller,this.list_id,this.pagesize,this.onSequencesAdded);
		this.matchgrid=new Ext.ux.vardb.explorer.regex.MatchTable(this.controller,this.list_id,this.pagesize,this.onSequencesAdded);
		
		var submitButton=new Ext.Button(
		{
			text: 'Search',
			formBind: true,
			scope: this,
			handler: this.submitHandler
		});
		
		var fieldset=
		{
			layout: 'column',
			defaults: {bodyStyle: 'padding-right: 5px'},
			items:
			[
				{
					layout: 'form',
					items: [patternField]
				},
				{
					layout: 'form',
					items: [submitButton]
				}
			]
		};
		
		this.form=new Ext.FormPanel(
		{
			labelWidth: 100,		
			autoHeight: true,
			region: 'north',
			frame: true,
			items: [fieldset,bField,xField]
		});
		
		var tabs=new Ext.TabPanel(
		{
			deferredRender: true,
			layoutOnTabChange: true,
			defaults: {autoScroll: true, hideMode:'offsets'},
			activeTab: 0,
			region: 'center',
			//enableTabScroll: true
			items: [this.sequencegrid,this.matchgrid]
		});
		
		/*
		win = new Ext.Window(
		{
			title: 'Glycosaminoglycan binding site search',
			width: 700,
			height: 450,
			layout: 'border',
			closable: true,
			resizable: true,		
			defaults: {split:true},
			items:
			[
				form,
				tabs
			],
			buttons:
			[
				{
					text: 'Close',
					handler: function(){win.hide();}
				}
			]
		});
		*/
	
		var config=
		{
			items:
			[
				this.form,
				tabs
			],
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
		Ext.ux.vardb.explorer.GagDialog.superclass.initComponent.apply(this, arguments);
		this.show();
	},
	
	submitHandler:function()
	{
		if (!this.form.getForm().isValid())
			{return;}
		var self=this;
		this.form.getForm().submit({
			url: vardb.webapp+'/explorer/ajax/regex/gagsearch.json',
			params: {list_id: self.list_id},
			waitMsg: 'Searching...',
			failure: Ext.ux.vardb.Vardb.onFormFailure,
			success: function(form,action)
			{
				var identifier=action.result.identifier;
				self.sequencegrid.enable();
				self.sequencegrid.store.baseParams.identifier=identifier;
				self.sequencegrid.store.load({params: {start: 0, limit: self.pagesize}});
				
				self.matchgrid.enable();
				self.matchgrid.store.baseParams.identifier=identifier;
				self.matchgrid.store.load({params: {start: 0, limit: self.pagesize}});
			}
		});
	},

	createPatternField:function(patterns)
	{
		var data=[],index,pattern;
		for (index=0;index<patterns.length;index++)
		{
			pattern=patterns[index];
			data.push([pattern,pattern]);
		}

		var field=new Ext.ux.Andrie.Select(
		{
			fieldLabel: 'GAG patterns',
			width: 300,
			multiSelect: true,
			minLength: 1,
			name: 'query',
			valueField: 'identifier',
			displayField: 'name',
			triggerAction: 'all',
			mode: 'local',
			emptyText: 'Select a pattern',
			forceSelection: true,
			value: patterns,
			store: new Ext.data.ArrayStore(
			{
				fields: ['identifier','name'],
				data: data
			})
		});
		return field;
	},
	
	createMacroField:function(fieldName, fieldLabel, values)
	{
		var residues='HKRGASTCVLIMPFYWDENQ';
		var data=[],index,residue;
		for (index=0;index<residues.length;index++)
		{
			residue=residues.substring(index,index+1);
			data.push([residue,residue]);
		}

		var value=[];
		for (index=0;index<values.length;index++)
		{
			value.push(values.substring(index,index+1));
		}

		var field=new Ext.ux.Andrie.Select(
		{
			fieldLabel: fieldLabel,
			width: 300,
			multiSelect: true,
			minLength: 1,
			name: fieldName,
			valueField: 'identifier',
			displayField: 'name',
			triggerAction: 'all',
			mode: 'local',
			emptyText: 'Select a pattern',
			forceSelection: true,
			value: value,
			store: new Ext.data.ArrayStore(
			{
				fields: ['identifier','name'],
				data: data
			})
		});
		return field;
	},
	
	onSequencesAdded:function(cart)
	{
	}
});
