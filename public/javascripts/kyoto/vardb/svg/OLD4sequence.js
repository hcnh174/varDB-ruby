Figure = function(x, y, width, height, config, data)
{
	Ext.applyIf(config, {
		trackoffset: 31
	});
	Ext.applyIf(this, config);
	
	r = Raphael(x, y, width, height);
	
	r.createRect = function(x, y, width, height, attributes){
		var shape = this.rect(x, y, width, height);
		shape.attr(attributes || {});
		return shape;
	};
	
	r.createRoundedRect = function(x, y, width, height, radius, attributes){
		var shape = this.rect(x, y, width, height, radius);
		shape.attr(attributes || {});
		return shape;
	};
	
	r.createText = function(x, y, text, attributes){
		var shape = this.text(x, y, text);
		shape.attr(attributes || {});
		return shape;
	};
	
	r.createLine = function(x1, y1, x2, y2, attributes){
		var shape = this.path('M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2);//M10 10L90 90
		shape.attr(attributes || {});
		return shape;
	};
	
	r.createLinearGradient = function(){
		return '90-lightgrey-gray-lightgrey';
	};
	
	r.createRadialGradient = function(color){
		return 'r(0.5,0.5)#C8C8C8-' + color;
	};
	
	return r;
}


/*
Figure=Ext.extend(Raphael,
{
	constructor: function(x,y,width,height,config,data)
	{
		Ext.applyIf(config,
		{
			trackoffset: 31
		});
		Ext.applyIf(this,config);
        Figure.superclass.constructor.call(this, config);
    },
	
	createRect:function(x,y,width,height,attributes)
	{
		var shape = this.rect(x,y,width,height);
		shape.attr(attributes || {});
		return shape;
	},
	
	createRoundedRect:function(x,y,width,height,radius,attributes)
	{
		var shape = this.rect(x,y,width,height,radius);
		shape.attr(attributes || {});
		return shape;
	},
	
	createText:function(x,y,text,attributes)
	{
		var shape = this.text(x,y,text);
		shape.attr(attributes || {});
		return shape;
	},
	
	createLine:function(x1,y1,x2,y2,attributes)
	{
		var shape = this.path('M'+x1+' '+y1+'L'+x2+' '+y2);//M10 10L90 90
		shape.attr(attributes || {});
		return shape;
	},
	
	createLinearGradient:function()
	{
		return '90-lightgrey-gray-lightgrey';
	},
	
	createRadialGradient:function(color)
	{
		return 'r(0.5,0.5)#C8C8C8-'+color;
	}
});
*/

Track=Ext.extend(Ext.util.Observable,
{
	constructor: function(config,data)
	{
		Ext.applyIf(config,
		{
			x: 0,
			y: 0,
			width: 550,
			height: 30,
			title: 'Title',
			offsetX: 0,
			offsetY: 0
		});
		Ext.applyIf(this,config);
        Track.superclass.constructor.call(this, config);
    },
	
	render:function(figure)
	{
		var g = figure.set();
		g.push(figure.createText(0,10,this.title,{'font-size': 10}));
		this.renderContent(figure,g);
		g.translate(this.offsetX,this.offsetY);
	}
});

ChromosomeTrack=Ext.extend(Track,
{
	renderContent: function(figure,g)
	{
		g.push(this.createChromosome(figure));
		g.push(
			this.createGene(figure,134,11),
			this.createGene(figure,354,11),
			this.createGene(figure,0,11),
			this.createGene(figure,45,11),
			this.createGene(figure,184,11),
			this.createGene(figure,306,11),
			this.createGene(figure,98,11),
			this.createGene(figure,239,11),
			this.createGene(figure,186,11),
			this.createGene(figure,515,11)
		);
		g.push(this.createSelectedGene(figure,327,84));
	},
	
	createChromosome:function(figure,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'white', stroke: 'black', 'stroke-width': '1px'});
		return figure.createRect(0,14,550,2,attributes);
	},
	
	createGene:function(figure,x,width,attributes)
	{
		return figure.createRect(x,14,width,4);
	},
	
	createSelectedGene:function(figure,x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'blue'});
		return figure.createRect(x,12,width,4,attributes);
	}
});

ExonTrack=Ext.extend(Track,
{
	renderContent:function(figure,g)
	{
		g.push(
			this.createExon(figure,0,379),
			this.createExon(figure,461,89)
		);
		this.createIntron(figure,g,379,82);
	},
	
	createExon:function(figure,x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: figure.createLinearGradient(), stroke: 'gray', 'stroke-width': '1px'});
		return figure.createRect(x,13,width,4,attributes);
	},
	
	createIntron:function(figure,g,x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{stroke: 'gray', 'stroke-width': '1px'});
		var midpoint = x+Math.round(width/2);
		g.push(
			figure.createLine(x,15,midpoint,7,attributes),
			figure.createLine(midpoint,7,x+width,15,attributes)
		);
	}
});

ProteinTrack=Ext.extend(Track,
{
	renderContent:function(figure,g)
	{
		g.push(
			this.createProteinSegment(figure,0,445),
			this.createProteinSegment(figure,445,105)
		);
	},
	
	createProteinSegment:function(figure,x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'});
		return figure.createRect(x,13,width,4,attributes);
	}
});

PfamDomainTrack=Ext.extend(Track,
{
	renderContent:function(figure,g)
	{
		g.push(
			figure.createRect(0,13,550,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}),
			this.createDomain(figure,27,84),
			this.createDomain(figure,222,111),
			this.createDomain(figure,153,41),
			this.createDomain(figure,373,36)
		);
	},
	
	createDomain:function(figure,x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: figure.createRadialGradient('blue'), stroke: 'black', 'stroke-width': '1px'});
		return figure.createRoundedRect(x,11,width,8,5,attributes);
	}
});

SecondaryStructureTrack=Ext.extend(Track,
{
	renderContent: function(figure,g)
	{
		g.push(
			figure.createRect(0,13,550,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}),
			this.createHelix(figure,1,1),
			this.createHelix(figure,3,1),
			this.createHelix(figure,14,1),
			this.createHelix(figure,34,1),
			this.createHelix(figure,40,1),
			this.createHelix(figure,52,1),
			this.createHelix(figure,56,1),
			this.createHelix(figure,61,1),
			this.createHelix(figure,70,1),
			this.createHelix(figure,71,1),
			this.createHelix(figure,73,1),
			this.createHelix(figure,93,1),
			this.createHelix(figure,99,1),
			this.createHelix(figure,106,1),
			this.createHelix(figure,120,1),
			this.createHelix(figure,123,1),
			this.createHelix(figure,135,1),
			this.createHelix(figure,142,1),
			this.createHelix(figure,144,1),
			this.createHelix(figure,152,1),
			this.createHelix(figure,173,1),
			this.createHelix(figure,218,1),
			this.createHelix(figure,225,1),
			this.createHelix(figure,228,1),
			this.createHelix(figure,231,1),
			this.createHelix(figure,233,1),
			this.createHelix(figure,235,1),
			this.createHelix(figure,237,1),
			this.createHelix(figure,239,1),
			this.createHelix(figure,256,1),
			this.createHelix(figure,265,1),
			this.createHelix(figure,267,1),
			this.createHelix(figure,273,1),
			this.createHelix(figure,281,1),
			this.createHelix(figure,284,1),
			this.createHelix(figure,288,1),
			this.createHelix(figure,295,1),
			this.createHelix(figure,302,1),
			this.createHelix(figure,304,1),
			this.createHelix(figure,310,1),
			this.createHelix(figure,333,1),
			this.createHelix(figure,355,1),
			this.createHelix(figure,357,1),
			this.createHelix(figure,373,2),
			this.createHelix(figure,374,1),
			this.createHelix(figure,382,1),
			this.createHelix(figure,392,1),
			this.createHelix(figure,439,1),
			this.createHelix(figure,441,2),
			this.createHelix(figure,443,1),
			this.createHelix(figure,448,1),
			this.createHelix(figure,454,1),
			this.createHelix(figure,456,2),
			this.createHelix(figure,460,1),
			this.createHelix(figure,469,2),
			this.createHelix(figure,492,1),
			this.createHelix(figure,493,1),
			this.createHelix(figure,496,1),
			this.createHelix(figure,502,1),
			this.createHelix(figure,502,1),
			this.createHelix(figure,510,1),
			this.createHelix(figure,512,1),
			this.createHelix(figure,529,1),
			this.createHelix(figure,539,1),
			this.createHelix(figure,544,1),
			this.createSheet(figure,4,3),
			this.createSheet(figure,7,1),
			this.createSheet(figure,8,2),
			this.createSheet(figure,10,2),
			this.createSheet(figure,14,1),
			this.createSheet(figure,15,1),
			this.createSheet(figure,18,1),
			this.createSheet(figure,33,1),
			this.createSheet(figure,40,2),
			this.createSheet(figure,42,1),
			this.createSheet(figure,48,2),
			this.createSheet(figure,50,1),
			this.createSheet(figure,57,1),
			this.createSheet(figure,58,2),
			this.createSheet(figure,63,1),
			this.createSheet(figure,66,1),
			this.createSheet(figure,67,2),
			this.createSheet(figure,69,1),
			this.createSheet(figure,81,5),
			this.createSheet(figure,98,1),
			this.createSheet(figure,99,1),
			this.createSheet(figure,101,2),
			this.createSheet(figure,103,2),
			this.createSheet(figure,110,3),
			this.createSheet(figure,114,2),
			this.createSheet(figure,117,1),
			this.createSheet(figure,137,1),
			this.createSheet(figure,149,2),
			this.createSheet(figure,152,1),
			this.createSheet(figure,152,2),
			this.createSheet(figure,155,1),
			this.createSheet(figure,163,1),
			this.createSheet(figure,164,1),
			this.createSheet(figure,165,1),
			this.createSheet(figure,167,2),
			this.createSheet(figure,174,1),
			this.createSheet(figure,178,4),
			this.createSheet(figure,188,2),
			this.createSheet(figure,192,1),
			this.createSheet(figure,209,1),
			this.createSheet(figure,211,1),
			this.createSheet(figure,214,1),
			this.createSheet(figure,221,2),
			this.createSheet(figure,237,1),
			this.createSheet(figure,239,1),
			this.createSheet(figure,247,5),
			this.createSheet(figure,252,1),
			this.createSheet(figure,253,1),
			this.createSheet(figure,254,1),
			this.createSheet(figure,256,1),
			this.createSheet(figure,260,1),
			this.createSheet(figure,263,1),
			this.createSheet(figure,264,1),
			this.createSheet(figure,270,3),
			this.createSheet(figure,281,1),
			this.createSheet(figure,283,2),
			this.createSheet(figure,291,1),
			this.createSheet(figure,305,1),
			this.createSheet(figure,308,3),
			this.createSheet(figure,322,4),
			this.createSheet(figure,327,1),
			this.createSheet(figure,328,1),
			this.createSheet(figure,336,1),
			this.createSheet(figure,354,1),
			this.createSheet(figure,356,1),
			this.createSheet(figure,362,1),
			this.createSheet(figure,363,1),
			this.createSheet(figure,375,1),
			this.createSheet(figure,378,1),
			this.createSheet(figure,382,2),
			this.createSheet(figure,384,1),
			this.createSheet(figure,392,2),
			this.createSheet(figure,397,2),
			this.createSheet(figure,400,1),
			this.createSheet(figure,404,3),
			this.createSheet(figure,443,2),
			this.createSheet(figure,448,1),
			this.createSheet(figure,465,1),
			this.createSheet(figure,481,2),
			this.createSheet(figure,502,1),
			this.createSheet(figure,503,1),
			this.createSheet(figure,505,2),
			this.createSheet(figure,507,1),
			this.createSheet(figure,508,1),
			this.createSheet(figure,511,1),
			this.createSheet(figure,515,2),
			this.createSheet(figure,518,1),
			this.createSheet(figure,518,1),
			this.createSheet(figure,520,4),
			this.createSheet(figure,530,1),
			this.createSheet(figure,532,1),
			this.createSheet(figure,533,1),
			this.createSheet(figure,546,1),
			this.createSheet(figure,546,1)
		);
	},
		
	createHelix:function(figure,x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'});
		return figure.createRect(x,11,width,8,attributes);
	},
	
	createSheet:function(figure,x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'});
		return figure.createRect(x,11,width,8,attributes);
	}
});

function drawSequenceFigure()
{
	// Creates canvas 320 × 200 at 10, 50
	figure = new Figure(0, 0, 550, 164, {}, {});
	
	track_height=31;
	offsetY=0;
	
	track = new ChromosomeTrack({title: 'Chromosome: (50000 bp)', offsetY: offsetY});
	track.render(figure);
	offsetY+=track_height;
	
	track = new ExonTrack({title: 'DNA: forward strand (shown in 5\' to 3\' direction) 0 bp, splicing=29733..34985,36111..37349', offsetY: offsetY});
	track.render(figure);
	offsetY+=track_height;
	
	track = new ProteinTrack({title: 'PFA0005w (0 aa)', offsetY: offsetY});
	track.render(figure);
	offsetY+=track_height;
	
	track = new PfamDomainTrack({title: 'Pfam domains', offsetY: offsetY});
	track.render(figure);
	offsetY+=track_height;
	
	track = new SecondaryStructureTrack({title: 'Secondary structure predictions', offsetY: offsetY});
	track.render(figure);
	
	figure.createLine(327,19,0,49,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	figure.createLine(411,19,550,49,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	figure.createLine(379,51,445,82,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	figure.createLine(461,51,445,82,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
}

/*
function drawSequenceFigure()
{
	// Creates canvas 320 × 200 at 10, 50
	this = Raphael(0, 0, 550, 164);
	
	track_height=31;
	offsetY=0;
	
	track = new ChromosomeTrack({title: 'Chromosome: (50000 bp)', offsetY: offsetY});
	track.render();
	offsetY+=track_height;
	
	track = new ExonTrack({title: 'DNA: forward strand (shown in 5\' to 3\' direction) 0 bp, splicing=29733..34985,36111..37349', offsetY: offsetY});
	track.render();
	offsetY+=track_height;
	
	track = new ProteinTrack({title: 'PFA0005w (0 aa)', offsetY: offsetY});
	track.render();
	offsetY+=track_height;
	
	track = new PfamDomainTrack({title: 'Pfam domains', offsetY: offsetY});
	track.render();
	offsetY+=track_height;
	
	track = new SecondaryStructureTrack({title: 'Secondary structure predictions', offsetY: offsetY});
	track.render();
	
	createLine(327,19,0,49,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	createLine(411,19,550,49,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	createLine(379,51,445,82,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	createLine(461,51,445,82,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
}
*/