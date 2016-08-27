var Vector = require("./vector");
var perlin = require("@giuliandrimba/noise")

function Particle(x, y, radius, ctx) {
	this.ctx = ctx;
  this.radius = radius
  this.acc = new Vector(0,0);
  this.vel = new Vector(0,0);
  this.color = Math.random() * 255;
  this.alpha = Math.random() * 255;

  this.position = new Vector(x, y)
} 

Particle.prototype.setup = function(){
  var self = this;
}

Particle.prototype.follow = function(vectors, scale, rows){
	var x = Math.floor(this.position.x / scale)
	var y = Math.floor(this.position.y / scale)
	var index = x + y * rows;
	if(vectors[index]) {
		// this.color = Math.round(vectors[index].color);
		var force = vectors[index].v
		this.applyForce(force);
	}
}

Particle.prototype.applyForce = function(force){
	// force.mult(1);1
	this.acc.add(force);
	this.vel.add(this.acc);
	this.acc.mult(0);
	this.vel.limit(1);
	this.position.add(this.vel);

	if(this.position.x > this.ctx.canvas.width || this.position.y > this.ctx.canvas.height || this.position.x < 0 || this.position.y < 0) {
		this.position.mult(-1)
	}
}

Particle.prototype.draw = function(ctx, colors){
	// var c = Math.floor((colors[0] + colors[1] + colors[2]) / 3) * 2
	// if(c > 255) {
	// 	c = 240;
	// }
	this.alpha = Math.round(perlin(this.position.x * 0.001, this.position.y * 0.001) * 200);
  ctx.fillStyle = "rgb("+this.alpha+","+this.alpha+","+this.alpha+")";
  ctx.beginPath()
  ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
  // ctx.stroke();
}

module.exports = Particle;