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
root.addChild(background);

//Creating play button and reset button
var playButton = initializePlayButton("play.png");
var resetButton = createResetButton("images/reset.png",570,835);

//Creating instructions and the light images
createInstructions();
initializeLights();

//Adding all global variables

//variables for initializing note img
var quarterNoteImg;
var eighthNoteImg;
var halfNoteImg;
var wholeNoteImg;
var eighthRestImg;
var quarterRestImg;
var halfRestImg;
var wholeRestImg;

//flags for detecting if note or play button marker senssor has been placed
var eighthNotPlayed = true;
var quarterNotPlayed = true;
var halfNotPlayed = true;
var wholeNotPlayed = true;
var eightRestNotPlayed = true;
var quarterRestNotPlayed = true;
var halfRestNotPlayed = true;
var wholeRestNotPlayed = true;
var playNotPressed = true;

//arrays for detecting which notes/lengths have been played
var notesPlayed = [];
var lengthPlayed = [];

//counter for beats in each bar
var barOneCounter = 0;
var barTwoCounter = 0;

//Creates and returns a customized widget for the application background that contains an ImageWidget.
function createBackground (background) {
	var w = new MultiWidgets.JavaScriptWidget();

	//create placeholder javascriptwidget
	w.setWidth(root.width());
	w.setHeight(root.height());
	w.setFixed();
	w.setAutoRaiseToTop(false);

	//create image widget for the background
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

	//placing the marker sensor for the staff with the same height and width as the staff
	markerSensorStaff(root.width()*0.075,root.height()*.25,root.height()*.5,root.width()*.85);

	//return the widget
	return w;
}

//creating the reset button
function createResetButton(image,x,y){
	var w = new MultiWidgets.ImageWidget();

	//loading reset button image and making it the correct size
	if (w.load(image)) {
    	w.setLocation(x,y);
    	w.setHeight(150);
    	w.setWidth(150);
	    root.addChild(w);
    	w.raiseToTop();
    	w.setFixed();
	}

	//reset of each variable occurs when the reset button is pressed
	w.onSingleTap(function(){

		//check if note image isn't null, then remove them
		if(null != quarterNoteImg){
			quarterNoteImg.removeFromParent();
		}

		if(null != eighthNoteImg){
			eighthNoteImg.removeFromParent();
		}

		if(null != halfNoteImg){
			halfNoteImg.removeFromParent();
		}

		if(null != wholeNoteImg){	
			wholeNoteImg.removeFromParent();
		}

		if(null != eighthRestImg){
			eighthRestImg.removeFromParent();
		}

		if(null != quarterRestImg){
			quarterRestImg.removeFromParent();
		}

		if(null != halfRestImg){
			halfRestImg.removeFromParent();
		}	
		if(null != wholeRestImg){
			wholeRestImg.removeFromParent();
		}

		//reinitalize lights to make them unlit
		initializeLights();

		//reset all the variables
		eighthNotPlayed = true;
		quarterNotPlayed = true;
		halfNotPlayed = true;
		wholeNotPlayed = true;
		eightRestNotPlayed = true;
		quarterRestNotPlayed = true;
		halfRestNotPlayed = true;
		wholeRestNotPlayed = true;
		playNotPressed = true;
		notesPlayed = [];
		lengthPlayed = [];
		barOneCounter = 0;
		barTwoCounter = 0;

	});

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

//function to change the color of lights in the first bar when a note is placed
function changeLightsBarOne(){
	//placement of the first light
	var x = root.width()*0.255;

	//if the barOneCounter global variable counts too many beats per bar, turn all the lights red
	if(barOneCounter > 8) {
		for(i=0; i<=7; i++){
		addImage("rLED.png", x, root.height()*.65);
		x += root.width()*.041;
		}
	}
	//if the barOneCounter has the correct amount of beats, turn all the lights green
	else if (barOneCounter == 8){
		for(i=0; i<=7; i++){
		addImage("gLED.png", x, root.height()*.65);
		x += root.width()*.041;
		}
	}
	//if the barOneCounter doesn't have enough beats, lights with filled beats turns yellow
	else{	
		for(i=0; i<barOneCounter; i++){
			addImage("yLED.png", x, root.height()*.65);
			x += root.width()*.041;
		}
	}	
}

//function to change the color of lights in the second bar when a note is placed
function changeLightsBarTwo(){
	//placement of the first light
	var x = root.width()*0.255;

	//if the barTwoCounter global variable counts too many beats per bar, turn all the lights red
	if(barOneCounter > 8) {
		for(i=0; i<=7; i++){
		addImage("rLED.png", x, root.height()*.65);
		x += root.width()*.041;
		}
	}
	//if the barTwoCounter has the correct amount of beats, turn all the lights green
	else if (barOneCounter == 8){
		for(i=0; i<=7; i++){
		addImage("gLED.png", x, root.height()*.65);
		x += root.width()*.041;
		}
	}
	//if the barTwoCounter doesn't have enough beats, lights with filled beats turns yellow
	else{	
		for(i=0; i<barOneCounter; i++){
			addImage("yLED.png", x, root.height()*.65);
			x += root.width()*.041;
		}
	}	
}

//function to set up initial unlit lights under staff
function initializeLights(){
	var x = root.width()*0.255;

	//add 16 lights, adjust x coordinate after each new placement 
	for(i=0; i<16; i++){
		 addImage("wLED.png", x, root.height()*.65);
		x += root.width()*.041;
	}
	console.log("lights initialized");
}

//initializes image of the play button
function initializePlayButton(image){
	w = new MultiWidgets.ImageWidget();	

	//variables for the location of the play button
	var LocX = root.width()*0.4;
	var LocY = root.height()*.8;
	var width = root.width()*.09;
	var height = root.height()*.085;

	//place the marker sensor on top of the play button
	markerSensorPlay(LocX,LocY,height,width);

	//load background image in and format
	if (w.load("images/"+image)) {
	    w.setWidth(width);
	    w.setHeight(height);
	    w.setLocation(LocX,LocY);
    	root.addChild(w);
    	//w.raiseToTop();
    	w.setFixed();
	}

	//check status of lit to determine if clicking "lights" or "unlights"
	if (lit == false) {
		w.onSingleTap(function(){
			lit = true;
			w.setSource("images/gPlay.png");
		});
			
	}
		else {
			w.onSingleTap(function(){
				console.log("unlight");
				w.setSource("images/play.png")});
			lit = false;
		}

	return w;
}

//function to add light images from the image folder
function addImage(image, x, y){
	var w = new MultiWidgets.ImageWidget();

	//raise images to top, set height and width, set fixed
	if (w.load("images/"+image)) {
    	w.setHeight(35);
    	w.setWidth(35);
    	w.setLocation(x,y);
	    root.addChild(w);
    	w.raiseToTop();
    	w.setFixed();
	}

	return w;
}

//function to add note images the correct distace from the marker sensor
function addNoteImage(image, x, y){
	var w = new MultiWidgets.ImageWidget();
	if (w.load("images/"+image)) {
    	w.setLocation(x-100,y-300);
	    root.addChild(w);
    	w.raiseToTop();
    	w.setFixed();
	}

	return w;
}

//call to resonant class to play sample
function audioPlay(file){
	console.log("Playing sample...");
	var sound = dsp.samplePlayer().playSample(file, 1.0, 1.0, 0, 0);
}

//function for behavior when play marker is placed on top of the sensor
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

		//checking if its the correct marker code and the flag hasn't been set off
		if(marker.code()==9 && playNotPressed){
			console.log("**************** marker down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
			playNotPressed = false;
			console.log(notesPlayed);
			console.log(lengthPlayed);
		}
	});

	//function for detecting when marker is lifted
	//on marker up doesn't work too well
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

	//function for marker sensor staff behavior
	function markerSensorStaff(locationx, locationy, height, width){
	console.log("Placing staff marker sensor...");
	var markerSensorStaff = new MultiWidgets.JavaScriptWidget();
	//place marker sensor directly over the staff
	markerSensorStaff.setLocation(locationx, locationy);
	markerSensorStaff.setHeight(height);
	markerSensorStaff.setWidth(width);
	markerSensorStaff.setBackgroundColor(0.0,0.0,0.0,0.0);
	markerSensorStaff.setFixed();

	//when the marker sensors are placed
	markerSensorStaff.onMarkerDown(function(id_as_string) {
		console.log("************************BAR COUNTER*****************************");
		console.log(barOneCounter);
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);

		//if the marker sensors are either notes or rests
		if(marker.code()==1 || marker.code()==2 || marker.code()==3 || marker.code()==4 || marker.code()==5 || marker.code()==6 || marker.code()==7 || marker.code()==8){
			
			//check the marker code
			console.log("Marker code is :"+marker.code());

			//store the location of the markers
			var xLoc = marker.centerLocation().x;
			var yLoc = marker.centerLocation().y;

			//log the location of the sensors
			console.log("X LOCATION: "+xLoc);
			console.log("Y LOCATION: "+yLoc);

			//if a note if played and it is the coreect marker code
			if(eighthNotPlayed && marker.code()==1){
				//set the flag for the maker being placed
				eighthNotPlayed = false;

				//get which note and bar it is placed on
				var eighthNote = getNote(yLoc);
				var eighthBar = getBar(xLoc,yLoc);

				//play the note sound
				playNote(eighthNote,"eighth");

				//push the note and length onto the arrays
				notesPlayed.push(eighthNote);
				lengthPlayed.push("eighth");

				//place image of the note
				eighthNoteImg = addNoteImage("eighthNote.png",xLoc,yLoc);

				//change lights in the counter
				if(eighthBar == "bar1"){
					barOneCounter += 1;
					changeLightsBarOne(barOneCounter);
				}
				if(eighthBar == "bar2"){
					barTwoCounter += barTwoCounter + 1;
					changeLightsBarTwo(barTwoCounter);
				}
			}

			if(quarterNotPlayed && marker.code()==2){
				//set the flag for the maker being placed
				quarterNotPlayed = false;

				//get which note and bar it is placed on
				var quarterNote = getNote(yLoc);
				var quarterBar = getBar(xLoc,yLoc);

				//play the note sound
				playNote(quarterNote,"quarter");

				//push the note and length onto the arrays
				notesPlayed.push(quarterNote);
				lengthPlayed.push("quarter");

				//place image of the note
				quarterNoteImg = addNoteImage("quarterNote.png",xLoc,yLoc);

				//change lights in the counter
				if(quarterBar == "bar1"){
					barOneCounter += 2;
					changeLightsBarOne(barOneCounter);
				}

				if(quarterBar == "bar2"){
					barTwoCounter += 2;
					changeLightsBarTwo(barTwoCounter);
				}
			}

			if(halfNotPlayed && marker.code()==3){
				//set the flag for the maker being placed
				halfNotPlayed = false;

				//get which note and bar it is placed on
				var halfNote = getNote(yLoc);
				var halfBar = getBar(xLoc,yLoc);

				//play the note sound
				playNote(halfNote,"half");

				//push the note and length onto the arrays
				notesPlayed.push(halfNote);
				lengthPlayed.push("half");

				//place image of the note
				halfNoteImg = addNoteImage("halfNote.png",xLoc,yLoc);

				//change lights in the counter
				if(halfBar == "bar1"){
					barOneCounter += 4;
					changeLightsBarOne(barOneCounter);
				}
				if(halfBar == "bar2"){
					barTwoCounter += 4;
					changeLightsBarTwo(barTwoCounter);
				}
			}

			if(wholeNotPlayed && marker.code()==4){
				//set the flag for the maker being placed
				wholeNotPlayed = false;

				//get which note and bar it is placed on
				var wholeNote = getNote(yLoc);
				var wholeBar = getBar(xLoc,yLoc);

				//play the note sound
				playNote(wholeNote,"whole");

				//push the note and length onto the arrays
				notesPlayed.push(wholeNote);
				lengthPlayed.push("whole");

				//place image of the note
				wholeNoteImg = addNoteImage("wholeNote.png",xLoc,yLoc);

				//change lights in the counter
				if(wholeBar == "bar1"){
					barOneCounter += 8;
					changeLightsBarOne(barOneCounter);
				}
				if(wholeBar == "bar2"){
					barTwoCounter += 8;
					changeLightsBarTwo(barTwoCounter);
				}
			}

			if(eightRestNotPlayed && marker.code()==5){
				//set the flag for the maker being placed
				eightRestNotPlayed = false;

				//play rest sound
				playRest("eighth");

				//get bar rest is placed on 
				var eighthRestBar = getBar(xLoc,yLoc);

				//push rest and length onto the arrays
				notesPlayed.push("rest");
				lengthPlayed.push("eighth");

				//place image of the note
				eighthRestImg = addNoteImage("eighthRest.png",xLoc,yLoc);

				//change lights in the counter
				if(eighthRestBar == "bar1"){
					barOneCounter += 1;
					changeLightsBarOne(barOneCounter);
				}
				if(eighthRestBar == "bar2"){
					barTwoCounter += barTwoCounter + 1;
					changeLightsBarTwo(barTwoCounter);
				}
			}

			if(quarterRestNotPlayed && marker.code()==6){
				//set the flag for the maker being placed
				quarterRestNotPlayed = false;

				//play rest sound
				playRest("quarter");

				//get bar rest is placed on 
				var quarterRestBar = getBar(xLoc,yLoc);

				//push rest and length onto the arrays
				notesPlayed.push("rest");
				lengthPlayed.push("quarter");

				//place image of the note
				quarterRestImg = addNoteImage("quarterRest.png",xLoc,yLoc);

				//change lights in the counter
				if(quarterRestBar == "bar1"){
					barOneCounter += 2;
					changeLightsBarOne(barOneCounter);
				}
				if(quarterRestBar == "bar2"){
					barTwoCounter += barTwoCounter + 2;
					changeLightsBarTwo(barTwoCounter);
				}
			}

			if(halfRestNotPlayed && marker.code()==7){
				//set the flag for the maker being placed
				halfRestNotPlayed = false;

				//play rest sound
				playRest("half")

				//get bar rest is placed on 
				var halfRestBar = getBar(xLoc,yLoc);

				//push rest and length onto the arrays
				notesPlayed.push("rest");
				lengthPlayed.push("half");

				//place image of the note
				halfRestImg = addNoteImage("halfRest.png",xLoc,yLoc);

				//change lights in the counter
				if(halfRestBar == "bar1"){
					barOneCounter += 4;
					changeLightsBarOne(barOneCounter);
				}
				if(halfRestBar == "bar2"){
					barTwoCounter += 4;
					changeLightsBarTwo(barTwoCounter);
				}
			}

			if(wholeRestNotPlayed && marker.code()==8){
				//set the flag for the maker being placed
				wholeRestNotPlayed = false;

				//play rest sound
				playRest("whole");
				
				//get bar rest is placed on 
				var wholeRestBar = getBar(xLoc,yLoc);
				
				//push rest and length onto the arrays
				notesPlayed.push("rest");
				lengthPlayed.push("whole");

				//place image of the note
				wholeRestImg = addNoteImage("wholeRest.png",xLoc,yLoc);

				//change lights in the counter
				if(wholeRestBar == "bar1"){
					barOneCounter += 8;
					changeLightsBarOne(barOneCounter);
				}
				if(wholeRestBar == "bar2"){
					barTwoCounter += barTwoCounter + 8;
					changeLightsBarTwo(barTwoCounter);
				}
			}
		}
	});

	root.addChild(markerSensorStaff);
	markerSensorStaff.raiseToTop();
	}

	function playRest(restLength){
		if(restLength == "eighth"){
			audioPlay("Notes/8thRest.wav");
		}
		if(restLength == "quarter"){
			audioPlay("Notes/rest.wav");
		}
		if(restLength == "half"){
			audioPlay("Notes/halfRest.wav");
		}
		if(restLength == "whole"){
			audioPlay("Notes/fullRest.wav");
		}
	}

	function playNote(noteName,noteLength){
		if(noteLength=="eighth"){
			if(noteName == "E4"){
			audioPlay("Notes/8thE4.wav");
			}
			if(noteName == "F4"){
				audioPlay("Notes/8thF4.wav");
			}
			if(noteName == "G4"){
				audioPlay("Notes/8thG4.wav");
			}
			if(noteName == "A4"){
				audioPlay("Notes/8thA4.wav");
			}
			if(noteName == "B4"){
				audioPlay("Notes/8thB4.wav");
			}
			if(noteName == "C5"){
				audioPlay("Notes/8thC5.wav");
			}
			if(noteName == "D5"){
				audioPlay("Notes/8thD5.wav");
			}
			if(noteName == "E5"){
				audioPlay("Notes/8thE5.wav");
			}
			if(noteName == "F5"){
				audioPlay("Notes/8thF5.wav");
			}
		}
		if(noteLength=="quarter"){
			if(noteName == "E4"){
			audioPlay("Notes/E4.wav");
			}
			if(noteName == "F4"){
				audioPlay("Notes/F4.wav");
			}
			if(noteName == "G4"){
				audioPlay("Notes/G4.wav");
			}
			if(noteName == "A4"){
				audioPlay("Notes/A4.wav");
			}
			if(noteName == "B4"){
				audioPlay("Notes/B4.wav");
			}
			if(noteName == "C5"){
				audioPlay("Notes/C5.wav");
			}
			if(noteName == "D5"){
				audioPlay("Notes/D5.wav");
			}
			if(noteName == "E5"){
				audioPlay("Notes/E5.wav");
			}
			if(noteName == "F5"){
				audioPlay("Notes/F5.wav");
			}
		}
		if(noteLength=="half"){
			console.log("In note length half");
			if(noteName == "E4"){
			audioPlay("Notes/halfE4.wav");
			}
			if(noteName == "F4"){
				audioPlay("Notes/halfF4.wav");
			}
			if(noteName == "G4"){
				audioPlay("Notes/halfG4.wav");
			}
			if(noteName == "A4"){
				audioPlay("Notes/halfA4.wav");
			}
			if(noteName == "B4"){
				audioPlay("Notes/halfB4.wav");
			}
			if(noteName == "C5"){
				audioPlay("Notes/halfC5.wav");
			}
			if(noteName == "D5"){
				audioPlay("Notes/halfD5.wav");
			}
			if(noteName == "E5"){
				audioPlay("Notes/halfE5.wav");
			}
			if(noteName == "F5"){
				audioPlay("Notes/halfF5.wav");
			}
		}
		if(noteLength=="whole"){
			if(noteName == "E4"){
			audioPlay("Notes/fullE4.wav");
			}
			if(noteName == "F4"){
				audioPlay("Notes/fullF4.wav");
			}
			if(noteName == "G4"){
				audioPlay("Notes/fullG4.wav");
			}
			if(noteName == "A4"){
				audioPlay("Notes/fullA4.wav");
			}
			if(noteName == "B4"){
				audioPlay("Notes/fullB4.wav");
			}
			if(noteName == "C5"){
				audioPlay("Notes/fullC5.wav");
			}
			if(noteName == "D5"){
				audioPlay("Notes/fullD5.wav");
			}
			if(noteName == "E5"){
				audioPlay("Notes/fullE5.wav");
			}
			if(noteName == "F5"){
				audioPlay("Notes/fullF5.wav");
			}
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