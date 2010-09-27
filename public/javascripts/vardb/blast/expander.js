/*global Ext, vardb */
Ext.ux.vardb.blast.RowExpander=function(config)
{	
	config=config || {};
	
	Ext.applyIf(config,
	{
		numcolumns: 120
	});
	
	var template=new Ext.XTemplate(
		'<br/>',
		'<tpl for="this.hsps(values)">',
			'<p class="x-selectable" style="background-color:white;margin-left:10px;">',
			'Score = {bitscore}, E = {evalue}, ',
			'Identities = {identity}/{alignlength}, ',
			'Positive = {positive}/{alignlength}<br/>',
			'<br/>',			
			'<span class="identity" style="font-family:monospace;">',
			'<tpl for="this.chunk(qseq,midline,hseq)">',
				'{[this.format(values.qseqchunk,values.midlinechunk)]} query<br/>',
				'<span style="color:gray;">{[values.midlinechunk]}</span><br/>',
				'{[this.format(values.hseqchunk,values.midlinechunk)]} hit<br/>',
				'<br/>',
			'</tpl>',
			'</p>',
		'</tpl>',
		{
			hsps:function(data)
			{
				var list=[],index,hsp;
				var bitscores=data.bitscores.split(',');
				var evalues=data.evalues.split(',');
				var queryfroms=data.queryfroms.split(',');
				var querytos=data.querytos.split(',');
				var hitfroms=data.hitfroms.split(',');
				var hittos=data.hittos.split(',');
				var queryframes=data.queryframes.split(',');
				var hitframes=data.hitframes.split(',');
				var identitys=data.identitys.split(',');
				var positives=data.positives.split(',');
				var alignlengths=data.alignlengths.split(',');
				var qseqs=data.qseqs.split(',');
				var hseqs=data.hseqs.split(',');
				var midlines=data.midlines.split(',');

				for (index=0;index<bitscores.length;index++)
				{
					hsp={};
					hsp.bitscore=bitscores[index];
					hsp.evalue=evalues[index];
					hsp.queryfrom=queryfroms[index];
					hsp.queryto=querytos[index];
					hsp.hitfrom=hitfroms[index];
					hsp.hitto=hittos[index];
					hsp.queryframe=queryframes[index];
					hsp.hitframe=hitframes[index];
					hsp.identity=identitys[index];
					hsp.positive=positives[index];
					hsp.alignlength=alignlengths[index];
					hsp.qseq=qseqs[index];
					hsp.hseq=hseqs[index];
					hsp.midline=midlines[index];
					list.push(hsp);
				}
				return list;					
			},
			chunk:function(qseq,midline,hseq)
			{
				var chunks=[];
				var max=config.numcolumns;
				var numchunks=qseq.length/max;
				var index;
				
				function truncate(str,index,max)
				{
					var start=index*max;
					var end=start+max;
					if (end>=str.length)
						{return str.substring(start);}
					else {return str.substring(start,end);}
				}
				
				function Chunk(qseq,midline,hseq,index,max)
				{
					this.qseqchunk=truncate(qseq,index,max);
					this.midlinechunk=truncate(midline,index,max);
					this.hseqchunk=truncate(hseq,index,max);
				}
									
				for (index=0;index<numchunks;index++)
				{
					chunks.push(new Chunk(qseq,midline,hseq,index,max));
				}

				return chunks;
			},
			format:function(value,midline) // compare to midline for identity
			{
				var index,aa,consensus,identity,str='';
				for (index=0;index<value.length;index++)
				{
					aa=value.substring(index,index+1);
					consensus=midline.substring(index,index+1);
					identity='';
					if ((consensus===aa || consensus==='|') && consensus!=='-')
						{identity='p60';}
					else if (consensus==='+')
						{identity='p40';}
					str+='<span class="'+aa.toUpperCase()+' '+identity+'">'+aa+'</span>';
				}
				return str;
			}
		}
	);
	
	var expander = new Ext.grid.RowExpander({tpl: template});
	return expander;
};