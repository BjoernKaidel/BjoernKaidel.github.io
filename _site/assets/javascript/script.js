// HTB ToC variables
var floatToC;
var tocShown = false;

// Headings
var summary;
var enumeration;
var foothold;
var user;
var root;

// Array containing all headings
var toCElem;

// Elements of the floating ToC
var summaryFloat;
var enumerationFloat;
var footholdFloat;
var userFloat;
var rootFloat;

// current entry of the floating ToC with the .currentPos class
var currPosFloat;

// Array of the floating ToC elements
var floatToCElem;

window.onload = function() {
	floatToC = document.getElementById("htbToC-Float");

	// listeners
	if(floatToC != null && window.innerWidth >= 1460) {
		summary = document.getElementById("summary");
		enumeration = document.getElementById("enum");
		foothold = document.getElementById("foothold");
		user = document.getElementById("user");
		root = document.getElementById("root");

		toCElem = [summary, enumeration, foothold, user, root];

		summaryFloat = document.getElementById("summaryFloat");
		enumerationFloat = document.getElementById("enumFloat");
		footholdFloat = document.getElementById("footholdFloat");
		userFloat = document.getElementById("userFloat");
		rootFloat = document.getElementById("rootFloat");

		currPosFloat = summaryFloat;
		summaryFloat.className = "currentPos";
		floatToCElem = [summaryFloat, enumerationFloat, footholdFloat, userFloat, rootFloat];

		window.addEventListener('scroll', showFloatToC);

		showFloatToC(); // check that the floating ToC is shown if the side is reloaded
	}
}


// code for showing/hiding the floating ToC on HTB write ups
function showFloatToC() {
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;
  	var showOn = 405;

		// determine if the floating ToC is to be shown
    if (!tocShown && distanceY >= showOn) {
  		floatToC.style.transform ="translate(0%,-50%)";
			tocShown = true;

    } else if(tocShown && distanceY < showOn) {
  		floatToC.style.transform = "translate(-110%,-50%)";
			tocShown = false;

  	}

		if(tocShown) {
				// if floating ToC is shown, determine the closest heading and set its css class to .currentPos
				var minElem = null;
				var minDist = Number.POSITIVE_INFINITY;

				for(i = 0; i < toCElem.length; i++) {
						// determine distances of the headings to the viewport
						var boundingRect = toCElem[i].getBoundingClientRect();
						var currDist = Math.abs(boundingRect.y);

						if(currDist < minDist && boundingRect.bottom <= (window.innerHeight/2 || document.documentElement.clientHeight/2)) {
							minDist = currDist;

							// minElement = element of the FLOATING ToC equivalent to the closest heading
							minElem = floatToCElem[i];
						}
				}

				// update which element has the .currentPos class
				currPosFloat.className = "";
				minElem.className = "currentPos";
				currPosFloat = minElem;
		}
}
