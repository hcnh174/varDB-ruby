/*global Ext, vardb */
Ext.ux.vardb.blast.PsiBlastForm = Ext.extend(Ext.ux.vardb.blast.Form,
{
	title: 'PSI-BLAST',
	
	initComponent: function()
	{		
		var iterationsField=
		{
			xtype: 'numberfield',
			fieldLabel: 'Iterations',
			name: 'iterations',
			grow: false,
			width: 30,
			value: this.iterations
		};
	
		var wordsizeField=
		{
			xtype: 'numberfield',
			fieldLabel: 'Word size',
			name: 'wordsize',
			width: 35,
			value: this.wordsize
		};

		var config=
		{
			url: vardb.webapp+'/blast/psiblast.html',
			parameterFields: [iterationsField],
			advancedFields1: [wordsizeField]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.blast.PsiBlastForm.superclass.initComponent.apply(this, arguments);
	}
});
