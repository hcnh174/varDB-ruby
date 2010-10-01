/*global Ext, kyoto */
kyoto.widgets.SortDialog = Ext.extend(Ext.Window,
{
	title: 'Sort',
	width: 300,
	height: 160,
	closable: true,
	resizable: true,
	numsortfields: 3,
	
	initComponent:function()
	{
		if (!this.grid)
			{throw 'Grid has not been set';}
		if (!this.grid.attributes)
			{throw 'Attributes have not been set';}
		
		var sortstate=this.grid.store.getSortState();
		if (sortstate===undefined)
			{sortstate={field: '', direction: ''};}
		var curfields=sortstate.field.split(',');
		var curdirs=sortstate.direction.split(',');
		var items=[],num,field,dir,container;
		for (num=1;num<=this.numsortfields;num++)
		{
			if (curfields.length>=num)
			{
				field=curfields[num-1];
				dir=curdirs[num-1];
			}
			else
			{
				field='none';
				dir='ASC';
			}
			container=
			{
				layout: 'column',
				border: false,
				items:
				[
					{
						layout: 'form',
						width: 200,
						items: this.createSortField('sort'+num,field)
					},
					{
						layout: 'form',
						columnWidth: 1,
						items: this.createDirectionField('dir'+num,dir)
					}
				]
			};
			items.push(container);
		}
		
		this.form=new Ext.FormPanel(
		{
			labelWidth: 45,		
			autoHeight: true,
			frame: true,
			items: items
		});
		
		var config=
		{
			defaults: {split:true},
			items:
			[
				this.form
			],
			buttons:
			[
				{
					text: 'Sort',
					formBind: true,
					scope: this,
					handler: this.submitHandler
				}
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		kyoto.widgets.SortDialog.superclass.initComponent.apply(this, arguments);
		this.show();
	},
	
	submitHandler:function()
	{
		var form=this.form.getForm();
		if (!form.isValid())
			{return;}
		var fields=[];
		var dirs=[];
		var num;
		for (num=1;num<=this.numsortfields;num++)
		{
			var field=form.findField('sort'+num).getValue();
			var dir=form.findField('dir'+num).getValue();
			if (field!=='none')
			{
				fields.push(field);
				dirs.push(dir);
			}
		}
		this.grid.store.setDefaultSort(fields.join(','),dirs.join(','));
		this.grid.store.reload();
		this.close();
	},
	
	createSortField:function(name,value)
	{
		var data=[];
		Ext.each(this.grid.attributes.rows,function(item,index,allItems)
		{
			data.push([item.id, item.id]);
		},this);
		return new kyoto.extjs.SelectList(
		{
			data: data,
			name: name,
			fieldLabel: 'Sort by',
			value: value
		});
	},
	
	createDirectionField:function(name,value)
	{
		return new kyoto.extjs.SelectList(
		{
			data: [['ASC','Asc'],['DESC','Desc']],
			name: name,
			fieldLabel: 'Direction',
			value: value,
			width: 50,
			hideLabel: true,
			labelSeparator: ''
		});
	}
});
