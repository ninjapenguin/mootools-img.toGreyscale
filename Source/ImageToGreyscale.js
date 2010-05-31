/*
---
description: Converts local image to greyscale version

license: MIT-style

authors:
- Matthew Wells

requires:
- core/1.2.4:*

provides: [Image.toGreyscale]

...
*/

(function() {

	var Greyscale = {
		convert : function(element) {
			if (element.get('original_src')) return element;

			var canvas = document.createElement('canvas');
			var canvasContext = canvas.getContext('2d');

			var imgW = element.width;
			var imgH = element.height;
			canvas.width = imgW;
			canvas.height = imgH;
			canvasContext.drawImage(element, 0, 0);

			var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

			for(var y = 0; y < imgPixels.height; y++){
				for(var x = 0; x < imgPixels.width; x++){
					var i = (y * 4) * imgPixels.width + x * 4;
					var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
					imgPixels.data[i] = avg;
					imgPixels.data[i + 1] = avg;
					imgPixels.data[i + 2] = avg;
				}
			}
			canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

			url = canvas.toDataURL();

			$(element).set('original_src', $(element).get('src'));
			$(element).set('greyscale_src', url);
			$(element).set('src', url);
			return element;
		}
	};

	Element.implement({
		toGreyscale: function() {
			if (this.get('tag') != 'img') return element;

			if (Browser.Engine.trident)
			{
				return this.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)';
			} else {
				if (!!document.createElement('canvas').getContext)
				{
					if (this.get('greyscale_src')) {
						return this.set('src', this.get('greyscale_src'))
					} else {
						return Greyscale.convert(this);
					}
				}
				return this;
			}
		},
		toSaturated: function() {
			if (this.get('tag') != 'img') return element;

			if (Browser.Engine.trident)
			{
				return this.style.filter = '';
			} else {
				if (!!document.createElement('canvas').getContext && this.get('original_src'))
				{
					return this.set('src', this.get('original_src'));
				}
				return this;
			}
		}
	});
})();