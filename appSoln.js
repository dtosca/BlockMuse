/* CompositeLab.js
 *
 * A starter code for am example composite application demonstrating: TextWidgets, ImageWidgets, 
 * VideoWidgets, JavaScriptWidgets, BookWidget, ItemsFlowWidget.
 * Also demonstrates creating a marker sensor widget and styling using CSS.
 * 
 * 
 * Solution is written by Jasmine Davis, August 2015
 * Updated by Orit Shaer, October 2015
 */


var root = $.app.mainLayer();


var background = createBackground("Media/background.jpg");

root.addChild(background);
console.log("******************background****************");

//creating a marker sensor
markerSensor();

//Add a stylesheet to the app
$.app.addStyleFilename("styles.css");


var textArr = new Array();
for(var i = 1; i<5; ++i){
	textArr[i] = new MultiWidgets.TextWidget();
	textArr[i].setCSSId("w"+i);
	textArr[i].addCSSClass("text");
	//textArr[i].setText("w"+i);
	textArr[i].addOperator(new MultiWidgets.StayInsideParentOperator());
	root.addChild(textArr[i]);
	textArr[i].raiseToTop();
}

addImage(100, 100, 400, 160, "Media/mmimage01.jpg");
addImage(500, 200, 300, 300, "Media/mmimage02.jpg");
//addImage(800, 600, 400, 400, "Media/mmimage03.jpg");



addVideo(450, 750, 200,"Media/Ham.mp4");
addVideo(1200, 200, 200, "Media/Showreel.mp4");


addBook(980,400,500.0,"./Research");
//addFlow(400,350,500);


/*
* Utility functions
*/

//Creates and returns a customized widget for the application background
//that contains an ImageWidget.
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

//Creates a customized JavaSCriptWidget with an image
// and adds it to the application's main layer.
function addImage(x, y, sizeX, sizeY, image) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setLocation(x, y);
	w.setWidth(sizeX);
	w.setHeight(sizeY);
	w.img = new MultiWidgets.ImageWidget();
	w.img.addCSSClass("ImageW")

	if (w.img.load(image)) {
	    w.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	w.img.setLocation(x,y);
    	w.img.setWidth(sizeX);
	    w.img.setHeight(sizeY);
	    w.addChild(w.img);
    	w.img.raiseToTop();
	}

	root.addChild(w);
	w.raiseToTop();
}

//Creates a VideoWidget and adds it to the application's main layer
function addVideo(x, y, size, video) {
	var vid = new MultiWidgets.VideoWidget();
	vid.setWidth(size);
	vid.setHeight(size);

	if (vid.load(video)) {
		vid.addOperator(new MultiWidgets.StayInsideParentOperator());
		//vid.resizeToFit(new Nimble.SizeF(size, size));
		vid.setLocation(x, y);
		//vid.setFixed();
		//vid.displayControls(true);
		vid.setAudioEnabled(true);
		vid.setPreviewPos(5, true); //sets preview image to 3 seond spot in video

		root.addChild(vid);
		vid.raiseToTop();

	}

}

//Creates a book widget and add it to the application's main layer
function addBook(x, y, size, book) {
	var bk = new MultiWidgets.BookWidget();

	if (bk.load("./Research")) {
		bk.addOperator(new MultiWidgets.StayInsideParentOperator());
		bk.setAllowRotation(false);
		bk.setLocation(x, y);
		bk.setScale(1);

		root.addChild(bk);
		bk.raiseToTop();
	}
}

//Creates a flow widget and add it to the application's main layer
function addFlow(x, y, size) {
	var flow = new MultiWidgets.ItemFlowWidget();
	flow.setLocation(x,y);
	for (var i=1; i<=9; i++) {
		var imgItem = new MultiWidgets.ImageWidget();
		var path = "./Media/mmimage0"+i+".jpg";
		if (imgItem.load(path)) {
			imgItem.addOperator(new MultiWidgets.StayInsideParentOperator());
   	 		imgItem.resizeToFit(new Nimble.SizeF(size,size));
			flow.addItem(imgItem);
		}
	}
	root.addChild(flow);
	flow.raiseToTop();
}


/*
*
* Marker functions
*/

function markerSensor() {
	//
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(0,0);
	markerSensor.setHeight(root.height());
	markerSensor.setWidth(root.width());
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(0.01,0.01,0.01,0.01);

	// create image to add on marker down and remove on marker up
	var wid = new MultiWidgets.JavaScriptWidget();
	wid.setWidth(400);
	wid.setHeight(400);
	wid.img = new MultiWidgets.ImageWidget();
	wid.img.addCSSClass("ImageW")

	if (wid.img.load("Media/mmimage03.jpg")) {
	    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	wid.img.setWidth(400);
	    wid.img.setHeight(400);
	    wid.addChild(wid.img);
    	wid.img.raiseToTop();
	}

	// create boolean for whether to add or remove image widget
	var isRootChild = false;

	markerSensor.onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if(marker.code()==42){
			console.log("**************** marker down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");
			
			if (!isRootChild) {
				root.addChild(wid);
				wid.raiseToTop();
				wid.setLocation(marker.centerLocation().x, marker.centerLocation().y);
				wid.img.setLocation(marker.centerLocation().x, marker.centerLocation().y);
				isRootChild = true;
			} else {
				wid.removeFromParent();
				isRootChild = false;
			}
		}
	});

	markerSensor.onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==42) {
			console.log("****************** marker up *******************");
		}
	});

	root.addChild(markerSensor);
	markerSensor.raiseToTop();}


