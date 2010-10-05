var paper = null;


function createRect(x,y,width,height,attributes)
{
	var shape = paper.rect(x,y,width,height);
	shape.attr(attributes || {});
	return shape;
}

function createRoundedRect(x,y,width,height,radius,attributes)
{
	var shape = paper.rect(x,y,width,height,radius);
	shape.attr(attributes || {});
	return shape;
}

function createText(x,y,text,attributes)
{
	var shape = paper.text(x,y,text);
	shape.attr(attributes || {});
	return shape;
}

function createLine(x1,y1,x2,y2,attributes)
{
	var shape = paper.path('M'+x1+' '+y1+'L'+x2+' '+y2);//M10 10L90 90
	shape.attr(attributes || {});
	return shape;
}

function createLinearGradient()
{
	return '90-lightgrey-gray-lightgrey';
}

function createRadialGradient(color)
{
	return 'r(0.5,0.5)#C8C8C8-'+color;
}



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
	
	render: function()
	{
		var g = paper.set();
		g.push(createText(0,10,this.title,{'font-size': 10}));
		this.renderContent(g);
		g.translate(this.offsetX,this.offsetY);
	}
});

ChromosomeTrack=Ext.extend(Track,
{
	renderContent: function(g)
	{
		g.push(this.createChromosome());
		g.push(
			this.createGene(134,11),
			this.createGene(354,11),
			this.createGene(0,11),
			this.createGene(45,11),
			this.createGene(184,11),
			this.createGene(306,11),
			this.createGene(98,11),
			this.createGene(239,11),
			this.createGene(186,11),
			this.createGene(515,11)
		);
		g.push(this.createSelectedGene(327,84));
	},
	
	createChromosome:function(attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'white', stroke: 'black', 'stroke-width': '1px'});
		return createRect(0,14,550,2,attributes);
	},
	
	createGene:function(x,width,attributes)
	{
		return createRect(x,14,width,4);
	},
	
	createSelectedGene:function(x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'blue'});
		return createRect(x,12,width,4,attributes);
	}
});

ExonTrack=Ext.extend(Track,
{
	renderContent: function(g)
	{
		g.push(
			this.createExon(0,379),
			this.createExon(461,89)
		);
		this.createIntron(g,379,82);
			//createLine(379,15,420,7,{stroke: 'gray', 'stroke-width': '1px'}),
			//createLine(420,7,461,15,{stroke: 'gray', 'stroke-width': '1px'})
	},
	
	createExon:function(x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: createLinearGradient(), stroke: 'gray', 'stroke-width': '1px'});
		return createRect(x,13,width,4,attributes);
	},
	
	createIntron:function(g,x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{stroke: 'gray', 'stroke-width': '1px'});
		var midpoint = x+Math.round(width/2);
		g.push(
			createLine(x,15,midpoint,7,attributes),
			createLine(midpoint,7,x+width,15,attributes)
		);
	}
});

ProteinTrack=Ext.extend(Track,
{
	renderContent: function(g)
	{
		g.push(
			this.createProteinSegment(0,445),
			this.createProteinSegment(445,105)
		);
	},
	
	createProteinSegment:function(x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'});
		return createRect(x,13,width,4,attributes);
	}
});

PfamDomainTrack=Ext.extend(Track,
{
	renderContent: function(g)
	{
		g.push(
			createRect(0,13,550,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}),
			this.createDomain(27,84),
			this.createDomain(222,111),
			this.createDomain(153,41),
			this.createDomain(373,36)
		);
	},
	
	createDomain:function(x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: createRadialGradient('blue'), stroke: 'black', 'stroke-width': '1px'});
		return createRoundedRect(x,11,width,8,5,attributes);
	}
});

SecondaryStructureTrack=Ext.extend(Track,
{
	renderContent: function(g)
	{
		g.push(
			createRect(0,13,550,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}),
			this.createHelix(1,1),
			this.createHelix(3,1),
			this.createHelix(14,1),
			this.createHelix(34,1),
			this.createHelix(40,1),
			this.createHelix(52,1),
			this.createHelix(56,1),
			this.createHelix(61,1),
			this.createHelix(70,1),
			this.createHelix(71,1),
			this.createHelix(73,1),
			this.createHelix(93,1),
			this.createHelix(99,1),
			this.createHelix(106,1),
			this.createHelix(120,1),
			this.createHelix(123,1),
			this.createHelix(135,1),
			this.createHelix(142,1),
			this.createHelix(144,1),
			this.createHelix(152,1),
			this.createHelix(173,1),
			this.createHelix(218,1),
			this.createHelix(225,1),
			this.createHelix(228,1),
			this.createHelix(231,1),
			this.createHelix(233,1),
			this.createHelix(235,1),
			this.createHelix(237,1),
			this.createHelix(239,1),
			this.createHelix(256,1),
			this.createHelix(265,1),
			this.createHelix(267,1),
			this.createHelix(273,1),
			this.createHelix(281,1),
			this.createHelix(284,1),
			this.createHelix(288,1),
			this.createHelix(295,1),
			this.createHelix(302,1),
			this.createHelix(304,1),
			this.createHelix(310,1),
			this.createHelix(333,1),
			this.createHelix(355,1),
			this.createHelix(357,1),
			this.createHelix(373,2),
			this.createHelix(374,1),
			this.createHelix(382,1),
			this.createHelix(392,1),
			this.createHelix(439,1),
			this.createHelix(441,2),
			this.createHelix(443,1),
			this.createHelix(448,1),
			this.createHelix(454,1),
			this.createHelix(456,2),
			this.createHelix(460,1),
			this.createHelix(469,2),
			this.createHelix(492,1),
			this.createHelix(493,1),
			this.createHelix(496,1),
			this.createHelix(502,1),
			this.createHelix(502,1),
			this.createHelix(510,1),
			this.createHelix(512,1),
			this.createHelix(529,1),
			this.createHelix(539,1),
			this.createHelix(544,1),
			this.createSheet(4,3),
			this.createSheet(7,1),
			this.createSheet(8,2),
			this.createSheet(10,2),
			this.createSheet(14,1),
			this.createSheet(15,1),
			this.createSheet(18,1),
			this.createSheet(33,1),
			this.createSheet(40,2),
			this.createSheet(42,1),
			this.createSheet(48,2),
			this.createSheet(50,1),
			this.createSheet(57,1),
			this.createSheet(58,2),
			this.createSheet(63,1),
			this.createSheet(66,1),
			this.createSheet(67,2),
			this.createSheet(69,1),
			this.createSheet(81,5),
			this.createSheet(98,1),
			this.createSheet(99,1),
			this.createSheet(101,2),
			this.createSheet(103,2),
			this.createSheet(110,3),
			this.createSheet(114,2),
			this.createSheet(117,1),
			this.createSheet(137,1),
			this.createSheet(149,2),
			this.createSheet(152,1),
			this.createSheet(152,2),
			this.createSheet(155,1),
			this.createSheet(163,1),
			this.createSheet(164,1),
			this.createSheet(165,1),
			this.createSheet(167,2),
			this.createSheet(174,1),
			this.createSheet(178,4),
			this.createSheet(188,2),
			this.createSheet(192,1),
			this.createSheet(209,1),
			this.createSheet(211,1),
			this.createSheet(214,1),
			this.createSheet(221,2),
			this.createSheet(237,1),
			this.createSheet(239,1),
			this.createSheet(247,5),
			this.createSheet(252,1),
			this.createSheet(253,1),
			this.createSheet(254,1),
			this.createSheet(256,1),
			this.createSheet(260,1),
			this.createSheet(263,1),
			this.createSheet(264,1),
			this.createSheet(270,3),
			this.createSheet(281,1),
			this.createSheet(283,2),
			this.createSheet(291,1),
			this.createSheet(305,1),
			this.createSheet(308,3),
			this.createSheet(322,4),
			this.createSheet(327,1),
			this.createSheet(328,1),
			this.createSheet(336,1),
			this.createSheet(354,1),
			this.createSheet(356,1),
			this.createSheet(362,1),
			this.createSheet(363,1),
			this.createSheet(375,1),
			this.createSheet(378,1),
			this.createSheet(382,2),
			this.createSheet(384,1),
			this.createSheet(392,2),
			this.createSheet(397,2),
			this.createSheet(400,1),
			this.createSheet(404,3),
			this.createSheet(443,2),
			this.createSheet(448,1),
			this.createSheet(465,1),
			this.createSheet(481,2),
			this.createSheet(502,1),
			this.createSheet(503,1),
			this.createSheet(505,2),
			this.createSheet(507,1),
			this.createSheet(508,1),
			this.createSheet(511,1),
			this.createSheet(515,2),
			this.createSheet(518,1),
			this.createSheet(518,1),
			this.createSheet(520,4),
			this.createSheet(530,1),
			this.createSheet(532,1),
			this.createSheet(533,1),
			this.createSheet(546,1),
			this.createSheet(546,1)
		);
	},
		
	createHelix:function(x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'});
		return createRect(x,11,width,8,attributes);
	},
	
	createSheet:function(x,width,attributes)
	{
		attributes = attributes || {};
		Ext.applyIf(attributes,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'});
		return createRect(x,11,width,8,attributes);
	}
});

function drawSequenceFigure()
{
	// Creates canvas 320 × 200 at 10, 50
	paper = Raphael(0, 0, 550, 164);
	
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
