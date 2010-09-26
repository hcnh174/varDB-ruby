/*global Ext, vardb */
Ext.ux.vardb.blast.NetBlastForm = Ext.extend(Ext.ux.vardb.blast.Form,
{
	database: 'nr',
	entrezterm: '',
	megablast: true,
	
	initComponent: function()
	{
		var programField=this.createProgramField();
		
		var databaseField=
		{
			xtype: 'textfield',
			fieldLabel: 'Databases',
			name: 'database',
			width: 400,
			value: this.database
		};
		
		var entreztermField=
		{
			xtype: 'textfield',
			fieldLabel: 'Entrez term',
			name: 'entrezterm',
			width: 400,
			value: this.entrezterm
		};
		
		var megablastField=this.createComboField('megablast','Megablast',this.megablast,'true,false');
		
		var config=
		{
			title: 'Netblast',
			url: vardb.webapp+'/analysis/netblast.html',
			parameterFields: [programField,databaseField,entreztermField],
			advancedFields1: [megablastField]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.blast.NetBlastForm.superclass.initComponent.apply(this, arguments);
	}
});
