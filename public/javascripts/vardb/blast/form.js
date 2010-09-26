/*global Ext, vardb */
Ext.ux.vardb.blast.Form = Ext.extend(Ext.form.FormPanel,
{
	renderTo: 'formdiv',
	labelWidth: 80,
	frame: true,
	width: 600,
	height: 362,
	autoHeight: Ext.isIE ? false : true,
	bodyStyle: 'padding:5px 5px 0',
	collapsible: true,
	standardSubmit: true,
	fileUpload: true,
	
	initComponent:function()
	{
		this.parameterFields=this.parameterFields || [];
		this.advancedFields1=this.advancedFields1 || [];
		this.advancedFields2=this.advancedFields2 || [];
		
		var evalueField=this.createComboField('evalue','Expect',this.evalue,'0.0001,0.01,1,10,100,1000');
		var maxresultsField=this.createComboField('maxresults','Max results',this.maxresults,'10,50,100,250,500,1000');
		var lowcomplexityField=this.createComboField('lowcomplexity','Filter',this.lowcomplexity,'true,false');
		// hack - matrixValue instead of matrix to work around a bug in Spring 3.0 RC1 
		var matrixField=this.createComboField('matrixValue','Score matrix',this.matrix,'BLOSUM62,BLOSUM80,PAM30,PAM70,PAM250');
		
		var gapopenField=
		{
			xtype: 'numberfield',
			fieldLabel: 'Gap open',
			name: 'gapopen',
			width: 30
		};
		
		var gapextendField=
		{
			xtype: 'numberfield',
			fieldLabel: 'Gap extend',
			name: 'gapextend',
			width: 30
		};
		
		if (this.gapopen) {gapopenField.value=this.gapopen;}
		if (this.gapextend) {gapopenField.value=this.gapopen;}
		
		this.advancedFields1.splice(0,0,evalueField,maxresultsField,matrixField);
		this.advancedFields2.splice(0,0,lowcomplexityField,gapopenField,gapextendField);
		
		var queryFieldset=this.getQueryFieldset();
		
		var parametersFieldset=
		{
			xtype: 'fieldset',
			title: 'Parameters',
			collapsible: true,
			autoHeight: true,
			items:
			[
				{
					layout:'column',
					items:
					[
						{
							columnWidth: 0.90,
							layout: 'form',
							items: this.parameterFields
						}							
					]
				}
			]
		};
		
		var advancedFieldset=
		{
			xtype: 'fieldset',
			title: 'Advanced',
			collapsible: true,
			collapsed: false,
			autoHeight:true,
			items:
			[
				{
					layout:'column',
					items:
					[
						{
							columnWidth: 0.50,
							layout: 'form',
							items: this.advancedFields1
						},
						{
							columnWidth: 0.50,
							layout: 'form',
							items: this.advancedFields2
						}
					]
				}
			]
		};

		var submitButton=
		{
			xtype: 'button',
			text: 'Submit',
			scope: this,
			handler: this.submitHandler
		};
		
		var clearButton=
		{
			xtype:'button',
			text: 'Clear',
			scope: this,
			handler: this.resetHandler
		};
		
		var config=
		{
			initialConfig:
			{
				standardSubmit: true,
				fileUpload: true
			},
			items:
			[
				queryFieldset,
				parametersFieldset,
				advancedFieldset
			],
			buttons:
			[
				clearButton,
				submitButton				
			]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));		
		Ext.ux.vardb.blast.Form.superclass.initComponent.apply(this, arguments);
	},
	
	submitHandler:function()
	{
		var form=this.getForm().getEl().dom;
		form.action=this.url;
		form.method='post';
		form.submit();
	},
	
	resetHandler:function()
	{
		this.getForm().reset();
	},
	
	getQueryFieldset: function()
	{
		var form=this;
		 
		var queryField=
		{
			xtype: 'textarea',
			fieldLabel: 'Enter a sequence in FASTA or bare sequence format',
			name: 'query',
			grow: false,
			//width: 500,
			anchor: '-4',
			height: 150,
			allowBlank: false
		};
		
		if (this.query)
			{queryField.value=this.query;}
	 
		/*
		var submitButton=
		{
			xtype: 'button',
			text: 'Submit',
			handler: function()
			{
				form.getForm().getEl().dom.action=form.url;
				form.getForm().getEl().dom.method='post';
				form.getForm().getEl().dom.submit();
			}
		};
		
		var clearButton=
		{
			xtype:'button',
			text: 'Clear',
			handler: function()
			{
				form.getForm().reset();
			}
		};
		*/
			
		var queryFieldset=
		{
			//layout: 'column',
			layout: 'form',
			labelAlign: 'top',
			items: [queryField]
			/*
			[
				{
					columnWidth: 0.90,
					layout: 'form',
					labelAlign: 'top',
					items:[queryField]
				},
				{
					columnWidth: 0.10,
					layout: 'form',
					items:[submitButton,clearButton]
				}
			]
			*/
		};
		return queryFieldset;
	},
	
	createComboField:function(name, fieldLabel, value, data)
	{
		if (!(data instanceof Array))
			{data=data.split(',');}	
		var field=
		{
			xtype:'combo',
			hiddenName: name,
			fieldLabel: fieldLabel,
			store: data,
			valueField: 'value',
			displayField: 'label',
			mode: 'local',
			triggerAction: 'all',
			emptyText: ' ',
			selectOnFocus: true,
			value: value
		};
		return field;
	},
	
	createProgramField:function()
	{
		var programs=[];
		programs.push(['blastp','BLASTP (protein query vs. protein database)']);
		programs.push(['tblastn','TBLASTN (protein query vs. nucleotide database)']);
		programs.push(['blastn','BLASTN (nucleotide query vs. nucleotide database)']);
		programs.push(['blastx','BLASTX (nucleotide query vs. protein database)']);	
		programs.push(['tblastx','TBLASTX (6-frame nucleotide query vs. 6-frame nucleotide database)']);
	
		// hack - programValue instead of program to work around a bug in Spring 3.0 RC1
		var programField=this.createComboField('programValue','Blast program',this.program,programs);
		programField.width=400;
		return programField;
	}
});
