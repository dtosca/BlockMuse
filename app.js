/* CompositeLab.js
 *
 * A starter code for am example composite application demonstrating: TextWidgets, ImageWidgets, 
 * VideoWidgets, JavaScriptWidgets, BookWidget, ItemsFlowWidget.
 * Also demonstrates creating a marker sensor widget and styling using CSS.
 * 
 * 
 * Solution is written by Jasmine Davis, August 2015
 * Solution was updated and modified by Orit Shaer, September 2016
 */


var root = $.app.mainLayer();

var background = createBackground("Media/background.jpg");
//pointer to resonant
var dsp = $.app.dspNetwork();

root.addChild(background);
console.log("******************background****************");

//log to console
console.log("******* background *******");
$.app.addStyleFilename("styles.css");

//play button
addButton(100,100,200,200);
//addSlider(500,500);
//create marker sensor
//markerSensorPlay();
markerSensorStaff();

//background 
function createBackground (background) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setWidth(root.width());
	w.setHeight(root.height());
	w.setFixed();
	w.setAutoRaiseToTop(false);

	w.image = new MultiWidgets.ImageWidget();

	if (w.image.load(background)) {
	    w.image.setWidth(w.width());
	    w.image.setHeight(w.height());
    	w.image.setFixed();
    	w.image.setAutoRaiseToTop(false);
    	w.addChild(w.image);
    	w.image.raiseToTop();
	}
	
	return w;
}

//button maker
function addButton(x, y, sizeX, sizeY) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setLocation(x, y);
	w.setWidth(sizeX);
	w.setHeight(sizeY);
	w.setFixed();
	w.img = new MultiWidgets.ImageWidget();

	//add play media
	if (w.img.load("Media/play.png")) {
	    w.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	w.img.setLocation(x,y);
    	w.img.setWidth(sizeX);
	    w.img.setHeight(sizeY);
	    w.img.setFixed();
	    w.addChild(w.img);
    	w.img.raiseToTop();
	}
	root.addChild(w);
	w.raiseToTop();

	//play a sample on single tap
	//anonymous function console.logs statement and called the audio play function
	 w.onSingleTap(
	 	function(){
	 		console.log("Touching Play Button");
	 		audioPlay("Media/PinkPanther30.wav");
	 	});
}

//call to resonant class to play sample
function audioPlay(file){
	console.log("Playing sample...");
	dsp.samplePlayer().playSample(file, 1.0, 1.0, 0, 0);	
}

function markerSensorPlay(){
	var markerSensorPlay = new MultiWidgets.JavaScriptWidget();
	//place marker sensor directly over the play button
	markerSensorPlay.setLocation(100,100);
	markerSensorPlay.setHeight(200);
	markerSensorPlay.setWidth(200);
	markerSensorPlay.setFixed();

	markerSensorPlay.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==1){
			console.log("**************** marker down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
			audioPlay("Media/PinkPanther30.wav");
		}
	});

	markerSensorPlay.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==1) {
			console.log("****************** marker up *******************");
		}
	});

	root.addChild(markerSensorPlay);
	//markerSensorPlay.raiseToTop();
	}

	function markerSensorStaff(){
	var markerSensorStaff = new MultiWidgets.JavaScriptWidget();
	//place marker sensor directly over the play button
	markerSensorStaff.setLocation(100,400);
	markerSensorStaff.setHeight(root.height()*.3);
	markerSensorStaff.setWidth(root.width()*.7);
	markerSensorStaff.setFixed();
	markerSensorStaff.addCSSClass("SensorW");

	markerSensorStaff.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==2){
			console.log("**************** marker down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
			audioPlay("Media/PinkPanther30.wav");
			//var xLoc = marker.centerLocation().x;
			//var yLoc = marker.centerLocation().y;
			//var note = getNote(xLoc,yLoc);
			//var bar = getBar(xLoc,yLoc);
		}
	});

	markerSensorStaff.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==2) {
			console.log("****************** marker up *******************");
		}
	});

	root.addChild(markerSensorStaff);
	markerSensorStaff.raiseToTop();}

	function getNote(yLoc){
		//Note heights, scientific pitch notation names
		var E4= {start:0 ,end:2};
		var F4 = {start:0 ,end:2};
		var G4 = {start:0 ,end:2};
		var A4 = {start:0 ,end:2};
		var B4 = {start:0 ,end:2};
		var C5 = {start:0 ,end:2};
		var D5 = {start:0 ,end:2};
		var E5 = {start:0 ,end:2};
		var F5 = {start:0 ,end:2};

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
			return "Error";
		}

	}

	function getBar(xLoc){
		//bar lengths
		var barStart = 1; //start of bar 1
		var bar1 = 0; //end of bar 1
		var bar2 = 2; //end of bar 2

		if(xLoc > barStart && xLoc < bar1)
		{
			console.log("Marker in Bar 1");
			return "bar1";
		}

		else if(xLoc > bar1 && xLoc < bar2)
		{
			console.log("Marker in Bar 1");
			return "bar2"
		}

		else {
			console.log("Marker outside of bar range");
			return "Error";
		}
	}
