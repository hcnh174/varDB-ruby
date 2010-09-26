/*global Ext, vardb */
Ext.ux.vardb.blast.BlastForm = Ext.extend(Ext.ux.vardb.blast.Form,
{
	title: 'BLAST',
	
	initComponent: function()
	{
		var programField=this.createProgramField();
		
		var config=
		{
			url: vardb.webapp+'/blast/blast.html',
			parameterFields: [programField]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.blast.BlastForm.superclass.initComponent.apply(this, arguments);
	}
});
