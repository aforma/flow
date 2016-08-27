var perlin = require("@giuliandrimba/noise")
var config = require("../config.json")
var Particle = require("./particle");
var Vector = require("./vector");

var ctx = undefined;
var env = undefined;

var increment = 0.1;
var scale = 20;
var columns = 0;
var rows = 0;
var angles = [];
var image = undefined;
imageCanvas = undefined;
var particles = [];
var numParticles = 500;
var RADIUS = 30;
var imgd;

exports.setup = function(_ctx, _env){
  ctx = _ctx;
  env = _env;

  numParticles = 2500 * Math.round((ctx.canvas.width / 1024)).toFixed(2);
  RADIUS = 1
  RADIUS = 2 * Math.round((ctx.canvas.width / 1024)).toFixed(2);
	increment = 0.1;

  scale = Math.ceil(10 * (ctx.canvas.width / 1024).toFixed(2));
  cols = Math.ceil(ctx.canvas.width / scale);
  rows = Math.ceil(ctx.canvas.height / scale);

  env.loadImage("/luisa.jpg", function(img){
  	image = img;
  	background("#fff");
  	setupFieldFromImage();
  	addParticle();
  	setTimeout(env.done, 60000)
  })
}

exports.draw = function() {
	if(particles.length) {
		for(var i = 0; i < particles.length; i++) {
			particles[i].follow(angles, scale, rows);
			var c = getPixelXY(imgd, Math.round(particles[i].position.x), Math.round(particles[i].position.y));
			particles[i].draw(ctx, c)
		}
	}
}

function addParticle() {
	for(var i = 0; i < numParticles; i++) {
		particles[i] = new Particle(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height, RADIUS, ctx)
	}
}

function setupFieldFromImage() {
	imageCanvas = env.createCanvas()
	imageCanvas.drawImage(image, 0,0, image.width, image.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
	imgd = imageCanvas.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	var yoff = 0;
	for(var y = 0; y < rows; y++) {
		var xoff = 0;
		for(var x = 0; x < cols; x++) {
			var index = x + y * cols;
			var angle = perlin(xoff, yoff) * (Math.PI * 2)
			var c = getPixel(imgd, x * scale, y * scale);
			var avg = ((c[0] + c[1] + c[2] + c[3]) / 4) * 0.1
			avg = avg * Math.PI / 180;
			// angle += avg;
			var v = new Vector(Math.cos(angle), Math.sin(angle))
			angles[index] = {v:v};
			xoff += increment;
		}
		yoff += increment;
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

function background(color){
  ctx.fillStyle = color;
  ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
}