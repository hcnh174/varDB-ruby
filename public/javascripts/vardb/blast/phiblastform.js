/*global Ext, vardb */
Ext.ux.vardb.blast.PhiBlastForm = Ext.extend(Ext.ux.vardb.blast.Form,
{
	title: 'PHI-BLAST',
	
	initComponent: function()
	{		
		var patternField=
		{
			xtype: 'textfield',
			fieldLabel: 'Pattern',
			name: 'pattern',
			grow: false,
			width: 400,
			value: this.pattern
		};
		
		var wordsizeField=
		{
			xtype: 'numberfield',
			fieldLabel: 'Word size',
			name: 'wordsize',
			grow: false,
			width: 35,
			value: this.wordsize
		};

		var config=
		{
			url: vardb.webapp+'/blast/phiblast.html',
			parameterFields: [patternField],
			advancedFields1: [wordsizeField]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.blast.PhiBlastForm.superclass.initComponent.apply(this, arguments);
	}
});
