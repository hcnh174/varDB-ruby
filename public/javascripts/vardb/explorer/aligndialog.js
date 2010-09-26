/*global Ext, vardb */
Ext.ux.vardb.explorer.AlignDialog = Ext.extend(Ext.Window,
{
	title: 'Align sequences using Mafft',
	width: 400,
	closable: true,
	resizable: true,

	initComponent:function()
	{
		var params={};
		params.name='alignment';
		params.strategy='AUTO';

		var matrixField=new Ext.ux.vardb.SelectList(
		{
			data:
			[
				['BLOSUM30','BLOSUM30'],
				['BLOSUM45','BLOSUM45'],
				['BLOSUM62','BLOSUM62'],				
				['BLOSUM80','BLOSUM80'],
				['JTT100','JTT100'],
				['JTT200','JTT200']
			],
			hiddenName: 'matrix',
			fieldLabel: 'Score matrix',
			value: 'BLOSUM62'
		});
		
		var strategyField=new Ext.ux.vardb.SelectList(
		{
			data:
			[
				['AUTO','Auto (Moderately accurate)'],
				['FFT_NS_1','FFT-NS-1 (Very fast)'],
				['FFT_NS_2','FFT-NS-2 (Fast; progressive)'],
				['FFT_NS_i2','FFT-NS-i2 (Medium; iterative)'],	
				['FFT_NS_i','FFT-NS-i (Slow)'],
				['L_INS_i','L-INS-i (Very slow)'],
				['E_INS_i','E-INS-i (Very slow)']
			],
			hiddenName: 'strategy',
			fieldLabel: 'Strategy',
			value: 'AUTO'
		});
		
		var op_field=
		{
			xtype:'textfield',
			fieldLabel: 'Gap open',
			name: 'op',
			width: 50
		};
		
		var ep_field=
		{
			xtype:'textfield',
			fieldLabel: 'Gap extension',
			name: 'ep',
			width: 50
		};
		
		var nameField=
		{
			xtype:'textfield',
			fieldLabel: 'Title',
			name: 'name',
			value: params.name,
			width: 232
		};
		
		var typeField=
		{
			xtype: 'combo',
			hiddenName: 'sequenceType',
			fieldLabel: 'Sequence type',
			valueField: 'value',
			displayField: 'label',
			store: [['AA','Protein alignment'],['NT','Nucleotide alignment']],
			mode: 'local',
			triggerAction: 'all',
			selectOnFocus: true,
			allowBlank: false,
			value: 'AA'
		};
		
		this.form=new Ext.FormPanel(
		{
			labelWidth: 100,
			url:'',
			defaults: {width: 230, allowBlank:false},
			defaultType: 'textfield',
			items:
			[
				nameField,
				typeField,
				strategyField,
				matrixField,
				op_field,
				ep_field
			],
			buttons:
			[
				{
					text:'Align',
					formBind:true,
					scope: this,
					handler: this.submitHandler
				},
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
		Ext.ux.vardb.explorer.AlignDialog.superclass.initComponent.apply(this, arguments);
		
		this.show();
	},
	
	openWindow:function(url,params,message,num)
	{
		message+=' ('+num+')';
		var self=this;
		Ext.MessageBox.confirm('Confirm',message,function(btn)
		{
			if (btn!=='yes')
				{return;}
			var href=Ext.ux.vardb.Vardb.buildHref(url,params);
			var options='x=500,y=500,width=500,height=300,scrollbars=1,resizable=1';
			Ext.ux.vardb.Vardb.openWindow(href,'Alignment progress',options);
			self.hide();
		});
	},

	doAlignment:function(url,params,message,num)
	{
		if (num===0)
		{
			Ext.MessageBox.alert('Alert','No sequences selected');
			return;
		}
		if (num===1)
		{
			Ext.MessageBox.alert('Alert','At least 2 sequences are needed to create an alignment');
			return;
		}		
		this.openWindow(url,params,message,num);
	},

	alignSelected:function(params,ids)
	{
		var url='/alignlist.html';
		params.ids=ids.join(',');
		params.name+=' ('+ids.length+' selected)';
		var message='Align the selected sequences?';
		var num=ids.length;
		this.doAlignment(url,params,message,num);
	},

	alignFiltered:function(params)
	{
		var url='/alignlist.html';
		params.filter=this.grid.store.baseParams.filter.trim();
		if (params.filter!=='')
			{params.name+=' ('+params.filter+')';}
		var message='Align all sequences using current filter?';
		var num=this.grid.store.getTotalCount();
		this.doAlignment(url,params,message,num);
	},
	
	submitHandler:function()
	{
		var params={};
		params.list_id=this.grid.list_id;
		params.name=this.form.getForm().findField('name').getValue();
		params.sequenceType=this.form.getForm().findField('sequenceType').getValue();
		params.strategy=this.form.getForm().findField('strategy').getValue();
		params.matrix=this.form.getForm().findField('matrix').getValue();
		params.op=this.form.getForm().findField('op').getValue();
		params.ep=this.form.getForm().findField('ep').getValue();
		var ids=this.grid.getSelectedIds();
		if (ids.length>0)
			{this.alignSelected(params,ids);}
		else {this.alignFiltered(params);}
	}
});
