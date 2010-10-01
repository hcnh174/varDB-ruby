/*global Ext, kyoto, utils */
(kyoto.tags.Tags=function(){	return {
	
	createTagCloud:function(grid)
	{
		var params={'list_id': grid.list_id, filter: grid.store.baseParams.filter};
		utils.ajaxRequest('/ajax/lists/tagcloud.json',params,function(tagcloud)
		{
			var dialog=new kyoto.tags.TagCloud({tagcloud: tagcloud});
		});
	},
	
	untagItems:function(grid,callback)
	{
		var ids=grid.getSelectedIds();
		var total=ids.length;
		if (total===0)
		{
			Ext.MessageBox.alert('Warning','No sequences selected');
			return;
		}
		var message='Un-tag the selected sequences ('+total+')?';
		utils.ajaxRequestConfirm(message,'/tags/ajax/untag.json',{ids: ids.join(',')},callback);
	}
	
	/*
	//////////////////////////////////////////////////////////////////////////
	
	createBundle:function(callback)
	{
		var dialog=new kyoto.vardb.tags.NamePromptDialog({type: 'bundle', callback: function(name)
		{
			utils.ajaxRequest('/tags/ajax/bundles/new.json',{name: name},callback);
		}});
	},

	deleteBundle:function(bundle_id,callback)
	{
		var message='Delete/detach this bundle?';
		utils.ajaxRequestConfirm(message,'/tags/ajax/bundles/delete.json',{bundle_id: bundle_id},function(json)
		{
			if (callback)
				{callback(bundle_id);}
		});
	},
	
	editTag:function(tag_id)
	{
		utils.ajaxRequest('/tags/ajax/tags/tag.json',{tag_id: tag_id},function(tag)
		{
			var dialog=new kyoto.vardb.tags.EditTagDialog({tag: tag});
		});
	},
	
	showBundle:function(bundle_id)
	{
		utils.ajaxRequest('/tags/ajax/bundle.json',{bundle_id: bundle_id, start:0,limit:0},function(bundle)
		{
			var dialog=new kyoto.vardb.tags.BundleDialog({bundle: bundle});
		});
	},
	
	joinByBundle:function(bundle_id)
	{
		utils.ajaxRequest('/tags/ajax/bundles.json',{bundle_ids: bundle_id},function(bundles)
		{
			var dialog=new kyoto.vardb.tags.JoinDialog({bundles: bundles});
		});
	},
	
	createTagCloudFromFilter:function(filter)
	{
		utils.ajaxRequest('/tags/ajax/tagcloud.json',{filter: filter},function(tagcloud)
		{
			var dialog=new kyoto.vardb.tags.TagCloud({tagcloud: tagcloud});
		});
	},
	
	createTagCloudFromQuery:function(id,filter)
	{
		utils.ajaxRequest('/search/ajax/tagcloud.json',{id: id},function(tagcloud)
		{
			var dialog=new kyoto.vardb.tags.TagCloud({tagcloud: tagcloud});
		});
	},
		
	formatTag:function(tag)
	{
		var title='['+tag.bundle_name+']';
		if (tag.description!=='')
			{title+=tag.description;}
		var color=tag.readonly ? 'gray' : tag.color;
		var bgcolor=tag.readonly ? 'white' : tag.bgcolor;
		var style='color:'+color+';background-color:'+bgcolor+';';
		var str='<a href="javascript:kyoto.vardb.tags.Services.editTag('+tag.id+')" title="'+title+'" style="'+style+'">'+tag.name+'</a>';
		return str;
	},
	
	createTag:function(name,callback)
	{
		var message='Create new tag "'+name+'"?';
		utils.ajaxRequestConfirm(message,'/tags/ajax/tags/new.json',{name: name},callback);
	},
	
	tagSequencesById:function(tag_id,ids,callback)
	{
		var message='Tag the selected sequences ('+ids.length+')?';
		var params={tag_id: tag_id, ids: ids.join(',')};
		this.submitTagUpdate(message,'/tags/ajax/tag_sequences_by_id.json',params,callback);
	},
	
	tagSequencesByList:function(tag_id,list_id,filter,total,callback)
	{
		var message='Tag the selected sequences ('+total+')?';
		var params={tag_id: tag_id, list_id: list_id, filter: filter};
		this.submitTagUpdate(message,'/tags/ajax/tag_sequences_by_list.json',params,callback);
	},
	
	tagSequencesByFilter:function(tag_id,filter,total,callback)
	{
		var message='Tag the selected sequences ('+total+')?';
		var params={tag_id: tag_id, filter: filter};
		this.submitTagUpdate(message,'/tags/ajax/tag_sequences_by_filter.json',params,callback);
	},
	
	submitTagUpdate:function(message,url,params,callback)
	{
		utils.ajaxRequestConfirm(message,url,params,function(json)
		{
			utils.info(json.message);
			if (callback)
				{callback(json);}
		});
	},
	
	untagItems:function(grid,callback)
	{
		var ids=grid.getSelectedIds();
		var total=ids.length;
		if (total===0)
		{
			Ext.MessageBox.alert('Warning','No sequences selected');
			return;
		}
		var message='Un-tag the selected sequences ('+total+')?';
		utils.ajaxRequestConfirm(message,'/tags/ajax/untag.json',{ids: ids.join(',')},callback);
	}
	*/
};}());
