/*
* BlockMuse™ file for Cornerstone SDK Multitaction Screen
* Written by Kaylie Cox, Diana Tosca, and Ingrid Henderson
* Created 11/5/2017
* Modified 11/15/2017
*/

//Set up root
var root = $.app.mainLayer();

//dsp class
var dsp = $.app.dspNetwork();

//variable to say whether play button should be grayed out or green
//will depend on count later 
var lit = false;

//set up list of instruction images
var instructionList = ["i1.png", "i2.png", "i3.png", "i4.png", "i5.png", "i6.png"];

//Add background Image
var background = createBackground("images/staff.png");

//root.addChild(playButton);

root.addChild(background);

var playButton = initializePlayButton("play.png");
createInstructions();
initializeLights();

console.log("************** Background ****************");
//root.addChild(playButton);
//console.log("************** PlayButton ****************");

//Creates and returns a customized widget for the application background
//that contains an ImageWidget.
function createBackground (background) {
	var w = new MultiWidgets.JavaScriptWidget();

	//create placeholder javascriptwidget
	w.setWidth(root.width());
	w.setHeight(root.height());
	w.setFixed();
	w.setAutoRaiseToTop(false);

	w.image = new MultiWidgets.ImageWidget();

	//load background image in and format
	if (w.image.load(background)) {
	    w.image.setWidth(w.width()*.85);
	    w.image.setHeight(w.height()*.5);
	    w.image.setLocation(root.width()*0.075, root.height()*.25);
    	w.image.setFixed();
    	w.image.setAutoRaiseToTop(false);
    	w.addChild(w.image);
    	w.image.raiseToTop();
	}

	markerSensorStaff(root.width()*0.075,root.height()*.25,root.height()*.5,root.width()*.85);
	return w;
}

//Create instructions as series of imagewidgets in itemflowwidget
function createInstructions(){

	//create itemflowwidget which houses other widgets
	var flow = new MultiWidgets.ItemFlowWidget();
	
	//position itemflow
	flow.setLocation(root.width()*.8, root.height()*.8);
	flow.setHeight(150);
	flow.setWidth(200);
	flow.setFixed();

	//add image items to itemflow
	for (i=0; i < instructionList.length; i++) {
		console.log("**instruction image list image: " + instructionList[i]);

		var imageWidget = new MultiWidgets.ImageWidget();
		imageWidget.load("images/"+instructionList[i]);
		console.log("loaded image");

		flow.addItem(imageWidget);
	}

	//add itemflow to root and raise
	root.addChild(flow);
	flow.raiseToTop();
}

//function to change the color of lights when a note is placed
//dependent on marker sensor of note (what LENGTH and what POSITION)
function changeLight(number){

	//given number of beats, light up number amount of lights and add beats to counter.
	//if number exceeds available (max 8) then turn all to red. 
	var counter = 0;

}

//function to set up initial unlit-lights under staff
function initializeLights(){
	var x = root.width()*0.255;

	//add 16 lights, adjust x coordinate after each new placement 
	for(i=0; i<16; i++){
		 addImage("wLED.png", x, root.height()*.65);
		//console.log("light: " + i);
		x += root.width()*.041;
	}

	console.log("lights initialized");
	console.log("light color changed");
}

//initializes image of the play button
function initializePlayButton(image){
	w = new MultiWidgets.ImageWidget();	

	var LocX = root.width()*0.4;
	var LocY = root.height()*.8;
	var width = root.width()*.09;
	var height = root.height()*.085;

	markerSensorPlay(LocX,LocY,height,width);

	//load background image in and format
	if (w.load("images/"+image)) {
	    w.setWidth(width);
	    w.setHeight(height);
	    w.setLocation(LocX,LocY);
    	root.addChild(w);
    	w.raiseToTop();
    	w.setFixed();
	}

	//check status of lit to determine if clicking "lights" or "unlights"
	if (lit == false) {
		w.onSingleTap(function(){
			console.log("on single tap before reassign" + lit.toString());
			lit = true;
			console.log("after reassign" + lit.toString());
			w.setSource("images/gPlay.png");
		});
			
	}

		else {
			w.onSingleTap(function(){
				console.log("unlight"); 
				console.log("inside On single tap");
				w.setSource("images/play.png")});
			lit = false;
		}

	return w;
}

function addImage(image, x, y){
	var w = new MultiWidgets.ImageWidget();

	if (w.load("images/"+image)) {
    	w.setHeight(35);
    	w.setWidth(35);
    	w.setLocation(x,y);
	    root.addChild(w);
    	w.raiseToTop();
	}

	return w;
}

//call to resonant class to play sample
function audioPlay(file){
	console.log("Playing sample...");
	dsp.samplePlayer().playSample(file, 1.0, 1.0, 0, 0);	
}

function markerSensorPlay(locationx, locationy, height, width){
	var markerSensorPlay = new MultiWidgets.JavaScriptWidget();
	//place marker sensor directly over the play button
	console.log("Placing play button marker sensor...");
	markerSensorPlay.setLocation(locationx, locationy);
	markerSensorPlay.setHeight(height);
	markerSensorPlay.setWidth(width);
	markerSensorPlay.setFixed();
	markerSensorPlay.setBackgroundColor(1.0,1.0,.53,1.0);

	markerSensorPlay.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==9){
			console.log("**************** marker down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
			audioPlay("Media/beep.wav");
		}
	});

	markerSensorPlay.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==9) {
			console.log("****************** marker up *******************");
		}
	});

	root.addChild(markerSensorPlay);
	markerSensorPlay.raiseToTop();
	}

	//note mappings for maker codes:
	// 1 eighth note soil
	// 2 quarter note carbon dioxide
	// 3 half note biomass
	// 4 whole note poop 
	// 5 eight rest fuel
	// 6 quarter rest nutrients
	// 7 half rest oxygen
	// 8 whole rest brick
	// 9 play water water

	var eighthNotPlayed = true;
	var quarterNotPlayed = true;
	var halfNotPlayed = true;
	var wholeNotPlayed = true;

	function markerSensorStaff(locationx, locationy, height, width){
	console.log("Placing staff marker sensor...");
	var markerSensorStaff = new MultiWidgets.JavaScriptWidget();
	//place marker sensor directly over the staff
	markerSensorStaff.setLocation(locationx, locationy);
	markerSensorStaff.setHeight(height);
	markerSensorStaff.setWidth(width);
	markerSensorStaff.setBackgroundColor(0.0,0.0,0.0,0.0);
	markerSensorStaff.setFixed();

	markerSensorStaff.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==1 || marker.code()==2 || marker.code()==3 || marker.code()==4){
			console.log("Marker code is :"+marker.code());

			var xLoc = marker.centerLocation().x;
			var yLoc = marker.centerLocation().y;

			console.log("X LOCATION: "+xLoc);
			console.log("Y LOCATION: "+yLoc);

			console.log(".......................................CHECKING BOOLEAN VALUES....................................");

			console.log("eightNotPlayed value: "+eighthNotPlayed);
			console.log("quarterNotPlayed value: "+quarterNotPlayed);
			console.log("halfNotPlayed value: "+halfNotPlayed);
			console.log("wholeNotPlayed value: "+wholeNotPlayed);

			if(eighthNotPlayed && marker.code()==1){
				eighthNotPlayed = false;
				var eighthNote = getNote(yLoc);
				var eighthBar = getBar(xLoc,yLoc);
				playNote(eighthNote);
			}
			if(quarterNotPlayed && marker.code()==2){
				quarterNotPlayed = false;
				var quarterNote = getNote(yLoc);
				var quarterBar = getBar(xLoc,yLoc);
				playNote(quarterNote);
			}
			if(halfNotPlayed && marker.code()==3){
				halfNotPlayed = false;
				var halfNote = getNote(yLoc);
				var halfBar = getBar(xLoc,yLoc);
				playNote(halfNote);
			}
			if(wholeNotPlayed && marker.code()==4){
				wholeNotPlayed = false;
				var wholeNote = getNote(yLoc);
				var wholeBar = getBar(xLoc,yLoc);
				playNote(wholeNote);
			}
		}
	});

	markerSensorStaff.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==1) {
			console.log("****************** marker up *******************");
		}
	});

	root.addChild(markerSensorStaff);
	markerSensorStaff.raiseToTop();
	}

	function playNote(noteName){
		if(noteName == "E4"){
			audioPlay("Media/E4.wav");
		}
		if(noteName == "F4"){
			audioPlay("Media/F4.wav");
		}
		if(noteName == "G4"){
			audioPlay("Media/G4.wav");
		}
		if(noteName == "A4"){
			audioPlay("Media/A4.wav");
		}
		if(noteName == "B4"){
			audioPlay("Media/B4.wav");
		}
		if(noteName == "C5"){
			audioPlay("Media/C5.wav");
		}
		if(noteName == "D5"){
			audioPlay("Media/D5.wav");
		}
		if(noteName == "E5"){
			audioPlay("Media/E5.wav");
		}
		if(noteName == "F5"){
			audioPlay("Media/F5.wav");
		}
	}

	function getNote(yLoc){
		//Note heights, scientific pitch notation names
		var E4 = {start:635,end:670};
		var F4 = {start:620,end:635};
		var G4 = {start:570,end:620};
		var A4 = {start:560,end:570};
		var B4 = {start:505,end:560};
		var C5 = {start:495,end:505};
		var D5 = {start:460,end:495};
		var E5 = {start:450,end:460};
		var F5 = {start:340,end:450};

		if(yLoc >= E4.start && yLoc <= E4.end){
			console.log("Note is E4");
			return "E4";
		}
		else if(yLoc >= F4.start && yLoc <= F4.end){
			console.log("Note is F4");
			return "F4";
		}
		else if(yLoc >= G4.start && yLoc <= G4.end){
			console.log("Note is G4");
			return "G4";
		}
		else if(yLoc >= A4.start && yLoc <= A4.end){
			console.log("Note is A4");
			return "A4";
		}
		else if(yLoc >= B4.start && yLoc <= B4.end){
			console.log("Note is B4");
			return "B4";
		}
		else if(yLoc >= C5.start && yLoc <= C5.end){
			console.log("Note is C5");
			return "C5";
		}
		else if(yLoc >= D5.start && yLoc <= D5.end){
			console.log("Note is D5");
			return "D5";
		}
		else if(yLoc >= E5.start && yLoc <= E5.end){
			console.log("Note is E5");
			return "E5";
		}
		else if(yLoc >= F5.start && yLoc <= F5.end){
			console.log("Note is F5");
			return "F5";
		}
		else {
			console.log("Note out of range");
			audioPlay("Media/beep.wav");
			return "Error";
		}

	}

	function getBar(xLoc){
		//bar lengths
		var barStart = 500; //start of bar 1
		var bar1 = 1000; //end of bar 1
		var bar2 = 1500; //end of bar 2

		if (xLoc > barStart && xLoc < bar1)
		{
			console.log("Marker in Bar 1");
			return "bar1";
		}

		else if(xLoc > bar1 && xLoc < bar2)
		{
			console.log("Marker in Bar 2");
			return "bar2"
		}

		else {
			console.log("Marker outside of bar range");
			return "Error";
		}
	}