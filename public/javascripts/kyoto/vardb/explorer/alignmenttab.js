/*global Ext, vardb, alert */
kyoto.vardb.explorer.AlignmentTab = Ext.extend(kyoto.vardb.Grid,
{
	tabtype: 'ALIGNMENT',
	pagesize: 30,
	headerAsText : false,
	closable: true,
	layout: 'fit',
	frame: true,
	//autoWidth: true,
	//autoHeight: true,
	enableColumnMove: true,
	loadMask: true,
	collapsible: false,
	animCollapse: false,

	initComponent:function()
	{		
		var grid=this;
		var identifier=this.alignment.identifier;
		
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/ajax/alignment.json',
			baseParams:{identifier: this.alignment.identifier},
			remoteSort: true,
			sortInfo: {field: 'accession', direction: 'ASC'},
			reader: new Ext.data.JsonReader(
			{
				root: 'sequences',
				totalProperty: 'totalCount',
				idProperty: 'identifier',
				fields:
				[
					{name: 'id', type: 'int'},
					{name: 'identifier'},
					{name: 'accession'},
					{name: 'uploaded', type: 'boolean'},
					{name: 'translation'}
				]
			})
		});
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20});
			
		function renderAccession(value, p, r)
		{
			if (value==='Consensus')
				{return value;}
			return String.format('<a href="#" onclick="vardb.sequencePopup(\'{0}\')">{1}</a>',
				r.data.accession, value);
		}
		
		function renderTranslation(value, p, r)
		{
			return '<span style="font-family:monospace;">'+value+'</span>';
		}
		
		var tooltips=kyoto.vardb.Constants.tooltips;
		
		var cm=new Ext.grid.ColumnModel(
		[
			sm,
			{header: 'Accession', width: 100, dataIndex: 'accession', renderer: renderAccession, tooltip: tooltips.accession},
			{header: 'Translation', width: 800, dataIndex: 'translation', renderer: renderTranslation, tooltip: tooltips.accession}
		]);
		
		function onDelete()
		{
			alert('sequence deleted from alignment');
		}

		var editmenu=this.createSelectMenu();
			
		var viewmenu=
		{
			text: 'Viewers',
			menu:
			{
				items:
				[
					{text: 'Fasta', scope: this, handler: function(){this.openWindow(identifier+'.faln');}},
					{text: 'ClustalW', scope: this, handler: function(){this.openWindow(identifier+'.aln');}},
					'-',
					{text: 'varDB viewer', scope: this, handler: function(){this.openWindow(identifier+'/viewer.html');}},
					{text: 'JalView', scope: this, handler: function(){this.openWindow(identifier+'/jalview.html');}}  
				]
			}
		};
		
		var analysismenu=
		{
			text: 'Tools',
			menu:
			{
				items:
				[	
					{text: 'Analyze Variability', handler: function(){alert("NOT IMPLEMENTED YET");}}   
				]
			}
		};
		
		var toolbar=new Ext.PagingToolbar({
			plugins: new Ext.ux.Andrie.pPageSize({variations: [5,10,20,30]}),
			pageSize: this.pagesize,
			store: store,
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: 'None',
			items:
			[
				'-',editmenu,
				'-',viewmenu,
				'-',analysismenu
			]
		});
		
		var config=
		{
			id: 'tab_alignment_'+this.alignment.identifier,
			title: this.alignment.name,
			viewConfig: {forceFit:true},
			cm: cm,
			sm: sm,
			store: store,
			tbar: toolbar
		};

		store.load({params:{start: 0,limit: this.pagesize}});
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.AlignmentTab.superclass.initComponent.apply(this, arguments);
	},
	
	openWindow:function(suburl)
	{
		var url=vardb.webapp+'/alignments/'+suburl;
		kyoto.vardb.Vardb.openWindow(url);
	}
});
