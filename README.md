NodeJs Module: Color Difference
============

NodeJs Module that implements the Delta E(CIE 2000) algorithm/Formula to calculate the difference between a LAB sample color and LAB reference color. Usage: Provide your colors in in RGB and it will do the rest. Includes functions to convert ```RGB->XYZ->LAB```

1. Install Module from NPM: ```$ npm install colordifference```

```
var colorDiff = require('colordifference');
var rgb1 = [ 200, 172, 123 ]; //your rgb values need to be in an array
var rgb2 = [ 200, 172, 123 ]; //your rgb values need to be in an array

colorDiff(rgb1, rgb2, callback)

function callback(err, result){
	console.log(result)
}
```
