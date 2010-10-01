/*global Ext, vardb */
kyoto.vardb.blast.BlastForm = Ext.extend(kyoto.vardb.blast.Form,
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
		kyoto.vardb.blast.BlastForm.superclass.initComponent.apply(this, arguments);
	}
});
