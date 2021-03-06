/*global Ext, vardb */
kyoto.vardb.JalviewForm = Ext.extend(kyoto.vardb.AbstractForm,
{	
	title: 'Open alignment in Jalview',
	width: 580,
	labelWidth: 50,
	standardSubmit: true,
	fileUpload: true,
	url: vardb.webapp+'/jalview.html',
	
	initComponent:function()
	{
		var config=
		{
			initialConfig:
			{
				standardSubmit: true,
				fileUpload: true
			},
			items:
			[
				this.createRow(
				[
					this.createControl(new kyoto.vardb.UserAlignmentSelectList({hiddenName: 'alignmentIdentifier'}))
				]),
				this.createRow(
				[
					this.createTextAreaControl({name: 'sequences', fieldLabel: 'Enter a multiple sequence alignment in FASTA or CLUSTALW format'})
				]),
				this.createRow(
				[
					this.createFileUploadControl({name: 'file', fieldLabel: 'File', emptyText: 'Or upload an alignment file (FASTA or ClustalW)'})
				])
			],
			buttons:
			[
				this.createClearButton(),
				this.createStandardSubmitButton()
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.JalviewForm.superclass.initComponent.apply(this, arguments);
	},
	
	checkValidation:function()
	{
		if (!this.checkNotEmpty('sequences,file,alignmentIdentifier','Please enter an alignment or select a file to upload'))
			{return false;}
		return true;
	}
});