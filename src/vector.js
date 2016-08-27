var Vector;

module.exports = Vector = (function() {
  Vector.prototype._x = 0;

  Vector.prototype._y = 0;

  function Vector(_x, _y) {
    this._x = _x;
    this._y = _y;
    Object.defineProperties(this, {
      "x": {
        get: function() {
          return this._x;
        },
        set: function(val) {
          return this._x = val;
        }
      },
      "y": {
        get: function() {
          return this._y;
        },
        set: function(val) {
          return this._y = val;
        }
      }
    });
  }

  Vector.prototype.add = function(vector) {
    this.x += vector.x;
    return this.y += vector.y;
  };

  Vector.add = function(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v1.y);
  };

  Vector.prototype.sub = function(vector) {
    this.x -= vector.x;
    return this.y -= vector.y;
  };

  Vector.sub = function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  };

  Vector.prototype.mult = function(n) {
    this.x *= n;
    return this.y *= n;
  };

  Vector.mult = function(n) {
    return new Vector(this.x * n, this.y * n);
  };

  Vector.prototype.div = function(n) {
    this.x /= n;
    return this.y /= n;
  };

  Vector.div = function(n) {
    return new Vector(this.x / n, this.y / n);
  };

  Vector.prototype.mag = function() {
    return Math.sqrt(this.magSq());
  };

  Vector.prototype.magSq = function(){
    var x = this.x, y = this.y;
    return (x * x + y * y);
  }

  Vector.prototype.norm = function() {
    var m;
    m = this.mag();
    return this.div(m);
  };

  Vector.prototype.limit = function(n) {
    if (this.mag() > n) {
      this.norm();
      return this.mult(n);
    }
  };

  Vector.rnd = function() {
    return new Vector(Math.random(), Math.random());
  };

  return Vector;

})()