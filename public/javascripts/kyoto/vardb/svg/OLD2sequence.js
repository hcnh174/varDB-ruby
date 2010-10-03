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

function createChromosome(attributes)
{
	attributes = attributes || {};
	Ext.applyIf(attributes,{fill: 'white', stroke: 'black', 'stroke-width': '1px'});
	return createRect(0,14,550,2,attributes);
}

function createGene(x,width,attributes)
{
	return createRect(x,14,width,4);
}

function createSelectedGene(x,width,attributes)
{
	attributes = attributes || {};
	Ext.applyIf(attributes,{fill: 'blue'});
	return createRect(x,12,width,4,attributes);
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
	
	/*
	render: function()
	{
		var g = paper.set();
		g.push(createText(0,10,this.title,{'font-size': 10}));
		g.push(createChromosome());
		g.push(
			createGene(134,11),
			createGene(354,11),
			createGene(0,11),
			createGene(45,11),
			createGene(184,11),
			createGene(306,11),
			createGene(98,11),
			createGene(239,11),
			createGene(186,11),
			createGene(515,11)
		);
		g.push(createSelectedGene(327,84));
		g.translate(this.offsetX,this.offsetY);
	}
	*/
});

ChromosomeTrack=Ext.extend(Track,
{
	renderContent: function(g)
	{
		g.push(createChromosome());
		g.push(
			createGene(134,11),
			createGene(354,11),
			createGene(0,11),
			createGene(45,11),
			createGene(184,11),
			createGene(306,11),
			createGene(98,11),
			createGene(239,11),
			createGene(186,11),
			createGene(515,11)
		);
		g.push(createSelectedGene(327,84));
	}
});

function drawSequenceFigure()
{
	// Creates canvas 320 × 200 at 10, 50
	paper = Raphael(0, 0, 550, 164);
	
	track = new ChromosomeTrack({title: 'Chromosome: (50000 bp)', offsetY: '0'});
	track.render();
	
	track = new ChromosomeTrack({title: 'DNA: forward strand', offsetY: '31'});
	track.render();
/*
	var track = paper.set();
	track.push(
		createText(0,10,'Chromosome: (50000 bp)',{'font-size': 10}),
		createRect(0,14,550,2,{fill: 'white', stroke: 'black', 'stroke-width': '1px'}),
		createRect(134,14,11,4),
		createRect(354,14,11,4),
		createRect(0,14,11,4),
		createRect(45,14,11,4),
		createRect(184,14,11,4),
		createRect(306,14,11,4),
		createRect(98,14,11,4),
		createRect(239,14,11,4),
		createRect(186,14,11,4),
		createRect(515,14,11,4),
		createRect(327,12,84,4,{fill: 'blue'})
	);
	
	var track = paper.set();
	track.push(
		//createRect(0,0,550,30,{fill: 'white'}),
		createText(0,10,'DNA: forward strand (shown in 5\' to 3\' direction) 0 bp, splicing=29733..34985,36111..37349',{'font-size': 10}),
		createRect(0,13,379,4,{fill: createLinearGradient(), stroke: 'gray', 'stroke-width': '1px'}),
		createRect(461,13,89,4,{fill: createLinearGradient(), stroke: 'gray', 'stroke-width': '1px'}),
		createLine(379,15,420,7,{stroke: 'gray', 'stroke-width': '1px'}),
		createLine(420,7,461,15,{stroke: 'gray', 'stroke-width': '1px'})
	);
	track.translate(0,31);
	
	var track = paper.set();
	track.push(
		//createRect(0,0,550,30,{fill: 'white'}),
		createText(0,10,'Protein: PFA0005w (0 aa)',{'font-size': 10}),
		createRect(0,13,445,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}),
		createRect(445,13,105,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'})
	);
	track.translate(0,62);
	
	var track = paper.set();
	track.push(
		//createRect(0,0,550,30,{fill: 'white'}),
		createText(0,10,'Pfam domains',{'font-size': 10}),	
		createRect(0,13,550,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}),
		createRoundedRect(27,11,84,8,5,{fill: createRadialGradient('blue'), stroke: 'black', 'stroke-width': '1px'}),
		createRoundedRect(222,11,111,8,5,{fill: createRadialGradient('blue'), stroke: 'black', 'stroke-width': '1px'}),
		createRoundedRect(153,11,41,8,5,{fill: createRadialGradient('green'), stroke: 'black', 'stroke-width': '1px'}),
		createRoundedRect(373,11,36,8,5,{fill: createRadialGradient('green'), stroke: 'black', 'stroke-width': '1px'})
	);
	track.translate(0,93);
	
	var track = paper.set();
	track.push(
		//createRect(0,0,550,30,{fill: 'white'}),
		createText(0,10,'Secondary structure predictions',{'font-size': 10}),	
		createRect(0,13,550,4,{fill: 'proteinsequence', stroke: 'gray', 'stroke-width': '1px'}),
		createRoundedRect(27,11,84,8,5,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		
		createRect(1,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(3,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(14,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(34,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(40,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(52,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(56,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(61,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(70,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(71,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(73,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(93,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(99,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(106,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(120,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(123,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(135,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(142,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(144,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(152,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(173,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(218,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(225,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(228,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(231,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(233,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(235,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(237,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(239,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(256,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(265,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(267,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(273,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(281,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(284,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(288,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(295,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(302,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(304,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(310,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(333,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(355,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(357,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(373,11,2,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(374,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(382,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(392,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(439,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(441,11,2,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(443,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(448,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(454,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(456,11,2,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(460,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(469,11,2,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(492,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(493,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(496,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(502,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(502,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(510,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(512,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(529,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(539,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(544,11,1,8,{fill: 'green', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(4,11,3,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(7,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(8,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(10,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(14,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(15,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(18,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(33,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(40,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(42,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(48,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(50,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(57,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(58,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(63,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(66,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(67,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(69,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(81,11,5,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(98,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(99,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(101,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(103,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(110,11,3,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(114,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(117,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(137,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(149,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(152,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(152,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(155,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(163,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(164,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(165,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(167,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(174,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(178,11,4,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(188,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(192,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(209,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(211,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(214,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(221,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(237,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(239,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(247,11,5,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(252,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(253,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(254,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(256,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(260,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(263,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(264,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(270,11,3,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(281,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(283,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(291,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(305,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(308,11,3,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(322,11,4,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(327,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(328,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(336,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(354,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(356,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(362,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(363,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(375,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(378,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(382,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(384,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(392,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(397,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(400,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(404,11,3,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(443,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(448,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(465,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(481,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(502,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(503,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(505,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(507,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(508,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(511,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(515,11,2,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(518,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(518,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(520,11,4,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(530,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(532,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(533,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(546,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'}),
		createRect(546,11,1,8,{fill: 'red', stroke: 'black', 'stroke-width': '0.5px'})
	);
	track.translate(0,124);
	
	createLine(327,19,0,49,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	createLine(411,19,550,49,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	createLine(379,51,445,82,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	createLine(461,51,445,82,{'stroke-dasharray':'--', stroke: 'gray', 'stroke-width': '1px'});
	*/
}
