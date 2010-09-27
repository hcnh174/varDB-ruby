/*global Ext, vardb */
Ext.ux.vardb.explorer.JoinDialog = Ext.extend(Ext.Window,
{
	title: 'Create join',
	width: 600,
	height: 300,
	closable: true,
	autoScroll: true,

	initComponent:function()
	{
		var items=[];
		items.push(this.createPropertyCheckboxGroup());
		var index, bundle, checkbox;
		for (index=0;index<this.bundles.rows.length;index++)
		{
			bundle=this.bundles.rows[index];
			if (bundle.definitions.length>0)
				{items.push(this.createBundleCheckboxGroup(bundle));}
		}

		var tabpanel=new Ext.TabPanel(
		{
			activeTab: 0,
			deferredRender: true,
			autoScroll: true,
			enableTabScroll: true,
			layoutOnTabChange: true, 
			items: items
		});
		
		this.form=new Ext.FormPanel(
		{
			items: [tabpanel]
		});
		
		var config=
		{
			items:
			[this.form],
			buttons:
			[
				//{text: 'Close', scope: this, handler: function(){this.hide();}},
				{text: 'Create Join Tab', scope: this, handler: function(){this.createJoin();}}
			]
		};
	
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.tags.JoinDialog.superclass.initComponent.apply(this, arguments);
		this.show();
	},
	
	createPropertyCheckboxGroup:function()
	{
		function createCheckboxGroup(title,properties)
		{
			var items=[], index, property, item;
			items.push({xtype: 'label', text: title, cls:'x-form-check-group-label', anchor:'-15'});
			for (index=0;index<properties.length;index++)
			{
				property=properties[index];
				items.push({boxLabel: property.name, name: 'property.'+property.name, checked: property.checked});
			}
			return items;
		}
		var checkboxgroup=
		{
			title: 'Sequence properties',
			xtype: 'checkboxgroup',
			itemCls: 'x-check-group-alt',
			fieldLabel: 'Sequence properties',
			allowBlank: false,
			anchor: '95%',
			items:
			[
				{
					columnWidth: '.25',
					items: createCheckboxGroup('Basic',this.properties.basic)
				},
				{
					columnWidth: '.25',
					items: createCheckboxGroup('Physical',this.properties.physical)
				},
				{
					columnWidth: '.25',
					items: createCheckboxGroup('Taxonomic',this.properties.taxonomic)
				},
				{
					columnWidth: '.25',
					items: createCheckboxGroup('DB xrefs',this.properties.xrefs)
				}
			]
		};
		return checkboxgroup;
	},	
	
	createBundleCheckboxGroup:function(bundle)
	{	
		var items=[], index, definition, item;
		var checked=(this.bundles.rows.length===1);
		for (index=0;index<bundle.definitions.length;index++)
		{
			definition=bundle.definitions[index];
			item={boxLabel: definition.name, name: bundle.bundle_id+'.'+definition.id, checked: checked};
			items.push(item);
		}
		var checkboxes=
		{
			xtype: 'checkboxgroup',
			title: 'Bundle: '+bundle.name,
			closable: true,
			columns: bundle.definitions.length>4 ? 4 : bundle.definitions.length,
			autoHeight: true,
			autoScroll: true,
			height: this.height,
			items: items
		};
		return checkboxes;
	},
	
	createJoin:function()
	{
		var properties=[], bundle_ids=[], definition_ids=[];
		//alert(this.form.getForm().getValues(true));
		var values=this.form.getForm().getValues(true).split('&');
		var index, value, start, before, after;
		for (index=0;index<values.length;index++)
		{
			value=values[index];
			start=value.indexOf('.');
			if (start===-1)
				{continue;}
			before=value.substring(0,start);
			after=value.substring(start+1);
			if (after.indexOf('=on')!==-1)
				{after=after.substring(0,after.indexOf('=on'));}
			if (before==='property')
				{properties.push(after);}
			else
			{
				if (bundle_ids.indexOf(before)===-1)
					{bundle_ids.push(before);}				
				definition_ids.push(after);		
			}
		}
		if (bundle_ids.length===0)
		{
			Ext.MessageBox.alert('Warning','Cannot create join unless one or more bundle fields are selected');
			return;			
		}
		var params=
		{
			list_id: this.list_id,
			properties: properties.join(','),
			bundle_ids: bundle_ids.join(','),
			definition_ids: definition_ids.join(',')
		};
		this.controller.addJoinTab(params);
		this.close();
	},
	
	properties:
	{
		basic:
		[
			{name: 'accession', checked: true},
			{name: 'gene', checked: true},
			{name: 'product', checked: true},
			{name: 'family', checked: true},
			{name: 'genome', checked: true},
			{name: 'chromosome', checked: false},
			{name: 'ortholog', checked: false},
			{name: 'ref', checked: false},
			{name: 'rating', checked: false},
			{name: 'domains', checked: false}
		],
		physical:
		[
			{name: 'sequence', checked: false},
			{name: 'ntlength', checked: true},
			{name: 'spliced', checked: false},			
			{name: 'translation', checked: false},
			{name: 'aalength', checked: true},
			{name: 'codon_start', checked: false},
			{name: 'transl_table', checked: false},			
			{name: 'protein', checked: false},
			{name: 'molwt', checked: false},			
			{name: 'pseudogene', checked: true},
			{name: 'truncated', checked: true},			
			{name: 'locus', checked: false},
			{name: 'locus_tag', checked: false},			
			{name: 'strand', checked: false},
			{name: 'start', checked: false},
			{name: 'end', checked: false},
			{name: 'splicing', checked: false},			
			{name: 'natype', checked: false},
			{name: 'circular', checked: false},
			{name: 'mol_type', checked: false}
		],
		taxonomic:
		[
			{name: 'division', checked: false},
			{name: 'taxon', checked: true},
			{name: 'strain', checked: false},			
			{name: 'country', checked: false},
			{name: 'subregion', checked: false},
			{name: 'collection_date', checked: false},
			{name: 'udate', checked: false},			
			{name: 'specific_host', checked: false},
			{name: 'isolate', checked: false},
			{name: 'isolation_source', checked: false},
			{name: 'serogroup', checked: false},
			{name: 'serotype', checked: false},
			{name: 'clone', checked: false},
			{name: 'segment', checked: false},			
			{name: 'allele', checked: false},
			{name: 'plasmid', checked: false}
		],
		xrefs:
		[
			{name: 'gi', checked: false},
			{name: 'geneid', checked: false},			
			{name: 'protein_gi', checked: false},
			{name: 'protein_id', checked: false},
			{name: 'uniprot', checked: false},
			{name: 'ec', checked: false}		
		]
	}
});
