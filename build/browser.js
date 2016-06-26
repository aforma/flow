var env = require("./browser/env");
var sketch = require("../src/sketch")
var loop = require('raf-loop');

var engine = loop(function(dt) { sketch.draw() }).start()
var browserEnv = env(engine);
var ctx = browserEnv.createContext()
sketch.setup(ctx, browserEnv);