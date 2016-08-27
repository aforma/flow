var perlin = require("@giuliandrimba/noise")

var ctx = undefined;
var env = undefined;

var increment = 0.1;
var scale = 20;
var columns = 0;
var rows = 0;
var field = [];
var image = undefined;

exports.setup = function(_ctx, _env){
  ctx = _ctx;
  env = _env;

  cols = Math.round(ctx.canvas.width / scale);
  rows = Math.round(ctx.canvas.height / scale);

  console.log(ctx.canvas.width / scale)

  env.loadImage("/goya.colossus.jpg", function(img){
  	image = img;
  	background("#fff");
  	setupFieldFromImage();
  })

  // setupField();
}

exports.draw = function() {

}

function setupFieldFromImage() {
	ctx.drawImage(image, 0,0, image.width, image.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
	var imgd = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	var pix = imgd.data;

	var  xoff = 0;
	for(var x = 0; x < cols; x++) {
		var yoff = 0;
		for(var y = 0; y < rows; y++) {
			// var r = Math.floor(perlin(xoff, yoff) * 255);
			var c = getPixelXY(imgd, x * scale, y * scale)
			ctx.beginPath();
			ctx.rect(x * scale, y * scale, scale, scale);
			ctx.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")";
			ctx.fill();
			yoff += increment;

		}
		xoff += increment;
	}
}

function getPixel(imgData, index) {
  var i = index*4, d = imgData.data;
  return [d[i],d[i+1],d[i+2],d[i+3]] // returns array [R,G,B,A]
}

// AND/OR

function getPixelXY(imgData, x, y) {
  return getPixel(imgData, y*imgData.width+x);
}

function setupField() {
	var  xoff = 0;
	for(var x = 0; x < cols; x++) {
		var yoff = 0;
		for(var y = 0; y < rows; y++) {
			var r = Math.floor(perlin(xoff, yoff) * 255);
			// field[x][y] = 
			ctx.beginPath();
			ctx.rect(x * scale, y * scale, cols, rows);
			ctx.fillStyle = "rgb("+r+","+r+","+r+")";
			ctx.fill();
			yoff += increment;

		}
		xoff += increment;
	}
}

function background(color){
  ctx.fillStyle = color;
  ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
}