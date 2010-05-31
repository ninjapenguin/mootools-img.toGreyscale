toGreyscale
======

![icon](http://github.com/ninjapenguin/mootools-img.toGreyscale/raw/master/Images/gs.png)

Methods for converting a locally hosted image to greyscale and back again!

This is a mootools plugin port of an original piece of code seen [here](http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html), all credit goes to them!

Usage
----------

	JS
	// Attached on load as we need the images to of loaded!
	window.addEvent('load', function(){

		$$('img.coloured-image').each(function(element){

			// transform the image
			element.toGreyscale();

			// element.toSaturated will return image to saturated version if previously de-staurated with element.toGreyscale
			element.addEvent('mouseover', function(ev){
				this.toSaturated();
			})
			element.addEvent('mouseout', function(ev){
				this.toGreyscale();
			})
		})
	})

Known Issues
------

Non-IE browsers must support the canvas tag
Will only work on locally served images from the same domain (due to browser same origin policies)