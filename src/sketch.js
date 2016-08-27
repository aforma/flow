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

exports.setup = function(_ctx, _env){
  ctx = _ctx;
  env = _env;

  numParticles = 10000 * (ctx.canvas.width / 1024);
  RADIUS = 2 * (ctx.canvas.width / 1024);

  scale = Math.ceil(25 * (ctx.canvas.width / config.thumbnail_size));

  cols = Math.ceil(ctx.canvas.width / scale);
  rows = Math.ceil(ctx.canvas.height / scale);

  env.loadImage("/goya.colossus.jpg", function(img){
  	image = img;
  	background("#fff");
  	setupFieldFromImage();
  	addParticle();
  	setTimeout(env.done, 10000)
  })
}

exports.draw = function() {
	// background("rgba(255,255,255,0.01)")
	if(particles.length) {
		for(var i = 0; i < particles.length; i++) {
			particles[i].follow(angles, scale, rows);
			particles[i].draw(ctx)
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
	var imgd = imageCanvas.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	var pix = imgd.data;

	for(var y = 0; y < rows; y++) {

		for(var x = 0; x < cols; x++) {
			var _x = (x * scale) > 0 ? (x * scale) + Math.round(scale / 2) : Math.round(scale / 2);
			var _y = (y * scale) > 0 ? (y * scale) + Math.round(scale / 2) : Math.round(scale / 2);
			var c = getPixelXY(imgd, _x, _y)
			var index = x + y * cols;
			var avg = Math.round((c[0] + c[1] + c[2]) / 3);
			var v = new Vector(Math.cos(avg), Math.sin(avg))
			angles[index] = {v:v, color:[c[0],c[1],c[2]]};

		}
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