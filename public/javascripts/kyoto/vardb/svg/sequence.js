Raphael.fn.createRect = function(x, y, width, height, attributes)
{
	var shape = this.rect(x, y, width, height);
	shape.attr(attributes || {});
	return shape;
};
	
Raphael.fn.createRoundedRect = function(x, y, width, height, radius, attributes)
{
	var shape = this.rect(x, y, width, height, radius);
	shape.attr(attributes || {});
	return shape;
};

Raphael.fn.createEllipse = function(cx, cy, rx, ry, attributes)
{
	var shape = this.ellipse(cx, cy, rx, ry);
	shape.attr(attributes || {});
	return shape;
};

Raphael.fn.createText = function(x, y, text, attributes)
{
	var shape = this.text(x, y, text);
	shape.attr(attributes || {});
	return shape;
};

Raphael.fn.createLine = function(x1, y1, x2, y2, attributes)
{
	var shape = this.path('M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2);//M10 10L90 90
	shape.attr(attributes || {});
	return shape;
};

Raphael.fn.createLinearGradient = function()
{
	return '90-lightgrey-gray-lightgrey';
};

Raphael.fn.createRadialGradient = function(color)
{
	//return 'r(0.25, 0.75)#fff-#000';
	return 'r(0.5,0.5)#C8C8C8-' + color;
};


Track=Ext.extend(Ext.util.Observable,
{
	constructor: function(config)
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
		g.push(figure.createText(10,5,this.title,{'font-size': 10}));
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

//Duffy_binding:108..439[671.1|8.6e-199],873..1310[671.1|8.6e-199];PFEMP:602..765[349.9|4.4e-102],1472..1613[349.9|4.4e-102]
PfamDomainTrack=Ext.extend(Track,
{
	renderContent:function(figure,g)
	{
		g.push(figure.createRect(0,13,550,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}));
		var arr=this.data.domains.split(';');
		for (var index=0;index<arr.length;index++)
		{
			var arr2=arr[index].split(':');
			var name=arr2[0];
			var pairs=arr2[1].split(',');
			for (var i=0;i<pairs.length;i++)
			{
				var pair=pairs[i].split('[')[0].split('..');
				console.info(pair);
				var start=pair[0];
				var end=pair[1];
				g.push(this.createDomain(figure,start,end-start+1,name));
			}
		}
			/*
			this.createDomain(figure,27,84),
			this.createDomain(figure,222,111),
			this.createDomain(figure,153,41),
			this.createDomain(figure,373,36)
			*/
	},
	
	createDomain:function(figure,x,width,name,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: figure.createRadialGradient('blue'), stroke: 'black', 'stroke-width': '1px'});
		
		var y = 8;
		var rx = Math.round(width/2);
		var ry = 6;	
		var cx = x-rx;
		var cy = y+ry;
		var shape = figure.createEllipse(cx,cy,rx,ry,attributes);
		shape.node.onclick=function(){alert(name)};
		return shape;
	}
});

SecondaryStructureTrack=Ext.extend(Track,
{
	renderContent: function(figure,g)
	{
		g.push(figure.createRect(0,13,550,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}));
		
		var arr=this.data.secondary.split(';');
		for (var index=0;index<arr.length;index++)
		{
			var arr2=arr[index].split(':');
			var type=arr2[0];
			var pairs=arr2[1].split(',');
			for (var i=0;i<pairs.length;i++)
			{
				var pair=pairs[i].split('..');
				var start=pair[0];
				var end=pair[1];
				var width=end-start+1;
				if (type==='H')
					{g.push(this.createHelix(figure,start,width));}
				else if (type==='E')
					{g.push(this.createSheet(figure,start,width));}
			}
		}
		
		/*
		this.helices=[{start: 34, end: 38}, {start: 70, end: 80}, {start: 95, end: 100}];
		for (var index=0;index<this.helices.length;index++)
		{
			var helix = this.helices[index];
			g.push(this.createHelix(figure,helix.start,helix.end-helix.start+1));
		}
		*/
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


var sequence=
{
	accession: "PFA0005w",
	start: 29733,
	end: 37349,
	splicing: '29733..34985,36111..37349',
	translation: 'TODO',
	domains: 'Duffy_binding:108..439[671.1|8.6e-199],873..1310[671.1|8.6e-199];PFEMP:602..765[349.9|4.4e-102],1472..1613[349.9|4.4e-102]',
	secondary: 'E:3..4,10..11,56..59,134..135,157..158,203..205,220..224,239..240,276..277,278..281,288..292,366..367,390..391,418..423,473..477,484..486,530..531,559..560,566..568,597..598,680..683,857..859,885..886,897..899,908..910,917..918,924..926,932..933,941..944,1007..1011,1040..1043,1048..1052,1075..1077,1103..1104,1118..1119,1132..1134,1161..1165,1186..1189,1196..1197,1219..1220,1309..1310,1394..1397,1404..1408,1465..1471,1472..1474,1501..1502,1540..1542,1726..1727,1733..1739,1740..1743,1761..1765,1783..1785,1794..1800,1808..1811,1843..1849,1933..1935,1936..1937,1948..1953,1973..1974,1975..1976,2005..2006,2012..2013,2078..2082,2117..2119,2140..2143;H:16..26,28..29,32..39,41..48,54..55,59..61,70..75,130..134,158..164,165..166,189..196,197..198,224..225,228..235,248..252,260..262,263..270,273..274,319..338,386..387,389..390,398..404,405..412,433..444,449..456,459..462,540..545,585..592,596..597,598..607,608..612,641..645,646..648,649..650,655..663,683..688,700..717,738..746,755..756,820..824,828..833,841..845,869..876,933..934,939..941,969..990,991..992,994..995,997..1002,1006..1007,1023..1027,1035..1036,1037..1040,1063..1075,1104..1105,1112..1118,1145..1146,1197..1202,1209..1219,1264..1281,1286..1288,1289..1290,1322..1325,1393..1394,1401..1404,1423..1424,1426..1429,1474..1478,1485..1486,1502..1508,1509..1513,1542..1549,1560..1569,1571..1572,1589..1602,1743..1751,1760..1761,1826..1827,1890..1896,1974..1975,1976..1977,1985..1993,1994..1995,1996..1999,2008..2012,2023..2032,2035..2036,2037..2038,2045..2059,2085..2087,2090..2092,2096..2100,2145..2146,2148..2149',
	strand: 'forward'
};



function SequenceFigure(config)
{
	config.data=sequence;
	
	Ext.applyIf(config,
	{
		renderTo: 'sequencefigure'	
	});
	Ext.applyIf(this,config);
	
	figure = new Raphael(this.renderTo,550,164);
	
	track_height=31;
	offsetY=0;
	
	track = new ChromosomeTrack({title: 'Chromosome: (50000 bp)', offsetY: offsetY, data: config.data});
	track.render(figure);
	offsetY+=track_height;
	
	track = new ExonTrack({title: 'DNA: forward strand (shown in 5\' to 3\' direction) 0 bp, splicing=29733..34985,36111..37349', offsetY: offsetY, data: config.data});
	track.render(figure);
	offsetY+=track_height;
	
	track = new ProteinTrack({title: 'PFA0005w (0 aa)', offsetY: offsetY, data: config.data});
	track.render(figure);
	offsetY+=track_height;
	
	track = new PfamDomainTrack({title: 'Pfam domains', offsetY: offsetY, data: config.data});
	track.render(figure);
	offsetY+=track_height;
	
	track = new SecondaryStructureTrack({title: 'Secondary structure predictions', offsetY: offsetY, data: config.data});
	track.render(figure);
	
	function createConnector(x1,y1,x2,y2)
	{
		figure.createLine(x1,y1,x2,y2,{'stroke-dasharray':'--', stroke: 'gray'});
	}
	
	var y1=17, y2=43;
	createConnector(327,y1,0,y2);
	createConnector(411,y1,550,y2);
	
	y1=49, y2=76;
	createConnector(379,y1,445,y2);
	createConnector(461,y1,445,y2);
}
