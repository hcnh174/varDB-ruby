/*global Ext, vardb */
Ext.namespace("kyoto.vardb.explorer.regex");
kyoto.vardb.explorer.RegexDialog = Ext.extend(Ext.Window,
{	
	title: 'Regular expression search',
	width: 700,
	height: 450,
	layout: 'border',
	closable: true,
	resizable: true,		
	pagesize:10,
	
	initComponent:function()
	{
		this.list_id=this.grid.list_id;
		var self=this;
		var controller=this.controller;
		var list_id=this.list_id;
		
		var regextab=kyoto.vardb.explorer.regex.RegexTab(controller,this);
		var prositetab=kyoto.vardb.explorer.regex.PrositeTab(controller,this);
		var aatab=kyoto.vardb.explorer.regex.AminoAcidTab(controller,this);

		function onSequencesAdded(){}
		
		this.sequencegrid=new kyoto.vardb.explorer.regex.SequenceTable({controller: controller, list_id: list_id, pagesize: this.pagesize, onSuccess: onSequencesAdded});
		this.matchgrid=new kyoto.vardb.explorer.regex.MatchTable({controller: controller, list_id: list_id, pagesize: this.pagesize, onSuccess: onSequencesAdded});
		
		var formtabs=new Ext.TabPanel(
		{
			deferredRender: true,
			layoutOnTabChange: true,
			defaults: {autoScroll: true},	//, hideMode: 'offsets'},
			activeTab: 0,
			region: 'north',
			items: [regextab,prositetab,aatab]
		});
		
		var gridtabs=new Ext.TabPanel(
		{
			deferredRender: true,
			layoutOnTabChange: true,
			defaults: {autoScroll: true, hideMode:'offsets'},
			activeTab: 0,
			region: 'center',
			items: [this.sequencegrid,this.matchgrid]
		});
		
		var closeButton=
		{
			text: 'Close',
			handler: function(){self.hide();}
		};
		
		this.items=[formtabs,gridtabs];
		this.buttons=[closeButton];

		this.defaults={split: false};
		
		kyoto.vardb.explorer.RegexDialog.superclass.initComponent.apply(this, arguments);
		this.show();
	},
	
	doSearch:function(form,query,type)
	{
		if (!form.getForm().isValid())
			{return;}
		if (query==='')
		{
			Ext.Msg.alert('Warning', 'Please enter a query');
			return;
		}
		var self=this;
		form.getForm().submit({
			url: vardb.webapp+'/explorer/ajax/regex/search.json',
			params: {list_id: self.list_id, type: type},
			waitMsg: 'Searching...',
			failure: kyoto.vardb.Vardb.onFormFailure,
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
	}
});

////////////////////////////////////////////////////////////////////////////

kyoto.vardb.explorer.regex.FormTab=function(controller,dialog,config)
{
	var form;
	
	function submitHandler()
	{
		var query=form.getForm().findField('query').getValue().trim();
		dialog.doSearch(form,query,config.type);
	}
	
	var instructionsField=
	{
		xtype: 'label',
		html: config.instructions+'<br/><br/>' 
	};
	
	var queryField=
	{
		xtype:'textfield',
		fieldLabel: 'Query',
		name: 'query',
		width: 300,
		value: config.example
		//emptyText: config.example
	};
	
	var submitButton=new Ext.Button({
		text: 'Search',
		formBind: true,
		handler: submitHandler
	});
	
	var fieldset=
	{
		layout: 'column',
		defaults: {bodyStyle: 'padding-right: 5px'},
		items:
		[
			{
				layout: 'form',
				labelWidth: 45,
				items:[queryField]
			},
			{
				layout: 'form',
				items: [submitButton]
			}
		]
	};
	
	form=new Ext.FormPanel(
	{
		title: config.title,
		labelWidth: 60,
		autoHeight: true,
		frame: true,
		items: [instructionsField,fieldset]
	});
	return form;
};

kyoto.vardb.explorer.regex.RegexTab=function(controller,dialog)
{
	var config=
	{
		type: 'REGEX',
		title: 'Perl syntax',
		example: 'DIGDI[IRV]',
		instructions: 'Enter a regular expression using classic Perl-like syntax'
	};
	return kyoto.vardb.explorer.regex.RegexTab.superclass.constructor.call(this,controller,dialog,config);
};
Ext.extend(kyoto.vardb.explorer.regex.RegexTab, kyoto.vardb.explorer.regex.FormTab);

/////////////////////////////////////////////////////

kyoto.vardb.explorer.regex.PrositeTab=function(controller,dialog)
{
	var config=
	{
		type: 'PROSITE',
		title: 'Prosite syntax',
		example: '[HKR]-[HKR]-x-x-[HKR].',
		instructions: 'Enter a search query using <a href="http://br.expasy.org/tools/scnpsit3.html#pattern_syntax" target="_new">PROSITE</a> conventions'
	};
	return kyoto.vardb.explorer.regex.PrositeTab.superclass.constructor.call(this,controller,dialog,config);
};
Ext.extend(kyoto.vardb.explorer.regex.PrositeTab, kyoto.vardb.explorer.regex.FormTab);

//////////////////////////////////////////////////////////////////////////////

kyoto.vardb.explorer.regex.AminoAcidTab=function(controller,dialog)
{
	var config=
	{
		type: 'AA',
		title: 'Amino acid pattern',
		example: 'CX8CX3CX3-4CXC',
		instructions: 'Enter a search query using single-letter amino acid codes or X for any amino acid, alteration using (H/K/R), and ranges using X4 or X4-8'
	};
	return kyoto.vardb.explorer.regex.AminoAcidTab.superclass.constructor.call(this,controller,dialog,config);
};
Ext.extend(kyoto.vardb.explorer.regex.AminoAcidTab, kyoto.vardb.explorer.regex.FormTab);

/////////////////////////////////////////////////////////////////////////////////////

kyoto.vardb.explorer.regex.SequenceTable = Ext.extend(kyoto.vardb.Grid,
{	
	initComponent:function()
	{
		var self=this;
		var reader=new Ext.data.JsonReader(
		{
			root: 'sequences',
			totalProperty: 'totalCount',
			idProperty: 'id',
			fields:
			[
				{name: 'id', type: 'int'},
				{name: 'identifier'},
				{name: 'accession'},
				{name: 'uploaded'},
				{name: 'taxon_identifier'},
				{name: 'taxon_name'},
				{name: 'pathogen_identifier'},
				{name: 'pathogen_name'},
				{name: 'family_identifier'},
				{name: 'family_name'},
				{name: 'pseudogene'},
				{name: 'truncated'},
				{name: 'defline'},
				{name: 'gene'},
				{name: 'product'},
				{name: 'translation'},
				{name: 'hits'},
				{name: 'matches'},
				{name: 'tags_id'},
				{name: 'tags_name'},		
				{name: 'tags_description'},
				{name: 'tags_color'},
				{name: 'tags_bgcolor'},
				{name: 'tags_bundle'},
				{name: 'tags_readonly'}
			]
		});
		
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/explorer/ajax/regex/sequences.json',
			reader: reader,
			remoteSort: true
		});
		store.setDefaultSort('accession', 'asc');
	
		var sm=new Ext.grid.CheckboxSelectionModel(
		{
			sortable: true,
			width: 20
		});
	
		var r=kyoto.vardb.Renderer;
	
		function renderTags(value, p, r)
		{
			return kyoto.vardb.Renderer.renderTags(value,p,r,this.list_id);
		}
		
		var expander=new kyoto.vardb.explorer.regex.Expander(80);
	
		var tooltips=kyoto.vardb.Constants.tooltips;
		
		var columns=
		[
			expander,
			sm,
			{header: 'Accession', width: 75, sortable: true, dataIndex: 'accession', renderer: r.renderAccessionPopup},
			{header: 'Tags', sortable: false, width: 75, dataIndex: 'tags_name', renderer: renderTags, tooltip: tooltips.tags},
			{header: 'Description', width: 75, sortable: true, dataIndex: 'defline', tooltip: tooltips.defline},
			{header: 'Taxon', width: 50, sortable: true, dataIndex: 'taxon_name', renderer: r.renderPathogenPopup},
			{header: 'Family', width: 50, sortable: true, dataIndex: 'family_name', renderer: r.renderFamilyPopup},
			{header: 'Gene', width: 50, sortable: true, dataIndex: 'gene'},
			{header: 'Product', width: 50, sortable: true, dataIndex: 'product'},
			{header: 'Matches', sortable: false, dataIndex: 'hits'}
		];
		
		var table=this;
		
		var addToWorksheetButton=
		{
			xtype: 'button',
			text: 'Add to current worksheet',
			formBind: true,
			scope: this,
			handler: this.addToWorksheet
		};
	
		var addToCartButton=
		{
			xtype: 'button',
			text: 'Add to cart',
			formBind: true,
			scope: this,
			handler: this.addToWorksheet
		};
	
		var addAsNewcartButton=
		{
			xtype: 'button',
			text: 'Add as new cart',
			formBind: true,
			scope: this,
			handler: function(){kyoto.vardb.explorer.Services.createSubset(self,self.controller,self.onSuccess);}
		};
	
		var items=[];
		if (this.list_id)
			{items.push(addToWorksheetButton);}
		items.push(addToCartButton);
		items.push(addAsNewcartButton);
		
		var actionmenu=
		{
			text: 'Action',
			menu: {items: items}
		};
		
		var tagmenu=
		{
			text: 'Tags',
			menu:
			{
				items: 
				[
					{
						text: 'Tag sequences',
						handler: function()
						{
							//var dialog=new kyoto.vardb.tags.ApplyTagDialog(self,self.onTagSequences);
							var dialog=new kyoto.vardb.tags.ApplyTagDialog(
							{
								grid: self,
								callback: self.onTagSequences
							});
						}
					}
				] 
			}
		};
		
		var toolbar=new Ext.PagingToolbar(
		{
			plugins: new Ext.ux.Andrie.pPageSize({variations: [5,10,20,30]}),
			pageSize: this.pagesize,
			store: store,
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: 'None',
			items:
			[
				'-',this.createSelectMenu(),
				'-',actionmenu,
				'-',tagmenu
			]
		});
	
		var config=
		{
			title: 'Sequences',
			disabled: true,
			maskDisabled: false,
			frame: false,
			autoWidth: true,
			height: 400,
			enableColumnMove: true,
			stripeRows: true,
			store: store,
			loadMask: true,
			collapsible: false,				
			animCollapse: false,
			columns: columns,
			//cm: new Ext.grid.ColumnModel(columns),
			viewConfig:{forceFit:true},
			sm: sm,
			plugins: expander,
			tbar: toolbar
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.regex.SequenceTable.superclass.initComponent.apply(this, arguments);
	},
	
	addToWorksheet:function()
	{
		var ids=this.getSelectedIds();
		if (ids.length>0)
			{this.addSelectedSequences(ids);}
		else {this.addAllSequences();}
	},
	
	onAddedToWorksheet:function()
	{
		this.controller.fireEvent('addsequences',this.list_id);
		this.onSuccess();
	},
	
	onTagSequences:function()
	{
		this.store.reload();
	},
	
	addSelectedSequences:function(ids)
	{	
		var self=this;
		Ext.MessageBox.confirm('Confirm', 'Add the '+ids.length+' selected items to the current worksheet?',function(btn)
		{
			if (btn!=='yes')
				{return;}
			var url='/ajax/cart/sequences/add.json';
			var params={ids: ids.join(',')};
			if (self.list_id)
				{params.list_id=self.list_id;}
			kyoto.vardb.Cart.updateCart(url,params,self.onAddedToWorksheet);
		});
	},

	addAllSequences:function()
	{
		var self=this;
		var total=this.store.getTotalCount();
		var message='No items selected. Add all the search results to the current worksheet? ('+total+')';
		Ext.MessageBox.confirm('Confirm',message,function(btn)
		{
			if (btn!=='yes')
				{return;}
			var url='/ajax/cart/query/add.json';
			var params={query: self.store.baseParams.query};
			if (self.list_id)
				{params.list_id=self.list_id;}
			kyoto.vardb.Cart.updateCart(url,params,self.onAddedToWorksheet);
		});
	}
});

kyoto.vardb.explorer.regex.Expander=function(maxcolumns)
{
	// assume XBBBXBX:10-20,30-40;XBBXXBX:15-25,35-45
	function formatMatches(sequence,matches)
	{
		var positions=[], index;
		for (index=0;index<sequence.length;index++)
		{
			positions[index]=[];
		}
		
		var colors=['red','green','orange','yellow','blue','gray'];
		var colorindex=0;
		var groups=[], color;
		var pattern,name,locations,location,start,end,i,j,position;
		var patterns=matches.split(';');		
		for (i=0;i<patterns.length;i++)
		{
			pattern=patterns[i];
			name=pattern.substring(0,pattern.indexOf(':'));
			if (!groups[name])
			{
				color=colors[colorindex];
				colorindex++;
				if (colorindex>=colors.length)
					{colorindex=0;}
				groups[name]=color;
			}
			locations=pattern.substring(pattern.indexOf(':')+1).split(',');
			for (j=0;j<locations.length;j++)
			{
				location=locations[j];
				start=parseInt(location.substring(0,location.indexOf('-')),10);
				end=parseInt(location.substring(location.indexOf('-')+1),10);
				for (position=start;position<=end;position++)
				{
					positions[position].push(name);
				}
			}
		}
		
		var buffer=[], aa;
		for (index=0;index<sequence.length;index++)
		{
			aa=sequence.substring(index,index+1);
			if (positions[index].length>0)
			{
				color=groups[positions[index][0]];
				buffer.push('<span style="color:'+color+';" title="');
				buffer.push(positions[index].join(','));
				buffer.push('">');
			}
			buffer.push(aa);
			if (positions[index].length>0)
				{buffer.push('</span>');}
			if (index!==0 && index%maxcolumns===0)
				{buffer.push('<br/>');}
		}
		//alert(buffer.join(''));
		return buffer.join('');
	}
	
	var expander = new Ext.grid.RowExpander({
		tpl : new Ext.XTemplate(
			'<p style="background-color:white;margin-left:10px;font-family:monospace;">',
			'{[this.formatSequence(values.translation,values.matches)]}<br/>',
			'</p>',
			{
				formatSequence:function(translation,matches)
				{
					return formatMatches(translation,matches);
				}
			})			
	});
	return expander;
};

kyoto.vardb.explorer.regex.MatchTable = Ext.extend(kyoto.vardb.Grid,
{	
	initComponent:function()
	{
		var reader=new Ext.data.JsonReader(
		{
			root: 'matches',
			totalProperty: 'totalCount',
			fields:
			[
				{name: 'regex'},
				{name: 'match'},
				{name: 'count', type: 'int'}
			]
		});
	
		var store=new Ext.data.GroupingStore(
		{
			url: vardb.webapp+'/explorer/ajax/regex/matches.json',
			//groupField: 'regex',
			reader: reader,
			sortInfo: {field: 'count', direction: 'DESC'},		
			remoteSort: true,
			remoteGroup: true
			//baseParams: {limit: pagesize}
		});
	
		var sm=new Ext.grid.CheckboxSelectionModel(
		{
			sortable: true,
			width: 20
		});
	
		function renderRegex(value, p, r)
		{
			return String.format('<a href="#" onclick="new kyoto.vardb.explorer.WebLogo({identifier: \'{1}\', regex: \'{2}\'})">{0}</span>',
				value,store.baseParams.identifier,r.data.regex);
		}
		
		function renderMatch(value, p, r)
		{
			return String.format('<span style="font-family:monospace;">{0}</span>',value);
		}
		
		var columns=
		[
			{header: 'Pattern', width: 75, sortable: true, dataIndex: 'regex', renderer: renderRegex},
			{header: 'Match', width: 75, sortable: true, dataIndex: 'match', renderer: renderMatch},
			{header: 'Count', width: 50, sortable: true, dataIndex: 'count'}
		];
	 
		var view=new Ext.grid.GroupingView(
		{
			forceFit: true,
			hideGroupedColumn: true,
			groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "matches" : "match"]})'
		});
		
		var toolbar=new Ext.PagingToolbar(
		{
			plugins: new Ext.ux.Andrie.pPageSize({variations: [5,10,20,30]}),
			pageSize: this.pagesize,
			store: store,
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: 'None'
		});
	
		var config=
		{
			title: 'Matches',
			disabled: true,
			maskDisabled: false,
			frame: false,
			autoWidth: true,
			height: 400,
			enableColumnMove: true,
			stripeRows: true,
			store: store,
			loadMask: true,
			collapsible: false,				
			animCollapse: false,
			columns: columns,
			view: view,
			sm: sm,
			tbar: toolbar
		};
	
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.vardb.explorer.regex.MatchTable.superclass.initComponent.apply(this, arguments);
	},
	
	onAddedToWorksheet:function()
	{
		this.controller.fireEvent('addsequences',this.list_id);
		this.onSuccess();
	},
	
	addSelectedSequences:function(ids)
	{
		var self=this;
		Ext.MessageBox.confirm('Confirm', 'Add the '+ids.length+' selected items to the current worksheet?',function(btn)
		{
			if (btn!=='yes')
				{return;}
			var url='/ajax/cart/sequences/add.json';
			var params={ids: ids.join(',')};
			if (self.list_id)
				{params.list_id=self.list_id;}
			kyoto.vardb.Cart.updateCart(url,params,self.onAddedToWorksheet);
		});
	},

	addAllSequences:function()
	{
		var self=this;
		var total=this.store.getTotalCount();
		var message='No items selected. Add all the search results to the current worksheet? ('+total+')';
		Ext.MessageBox.confirm('Confirm',message,function(btn)
		{
			if (btn!=='yes')
				{return;}
			var url='/ajax/cart/query/add.json';
			var params={query: self.store.baseParams.query};
			if (self.list_id)
				{params.list_id=self.list_id;}
			kyoto.vardb.Cart.updateCart(url,params,self.onAddedToWorksheet);
		});
	},

	addToWorksheet:function()
	{
		var ids=this.getSelectedIds();
		if (ids.length>0)
			{this.addSelectedSequences(ids);}
		else {this.addAllSequences();}
	}
});
