(function() {
  var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

  NUM_CONFETTI = 200;

  color_R = Math.random() * 255;
  color_G = Math.random() * 255;
  color_B = Math.random() * 255;
  COLORS = [[color_R, color_G, color_B], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("world");

  context = canvas.getContext("2d");

  window.w = 0;

  window.h = 0;

  resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeWindow, false);

  window.onload = function() {
    return setTimeout(resizeWindow, 0);
  };

  range = function(a, b) {
    var range_return = (b - a) * Math.random()  + a;
    // console.log(~~range_return);
    return range_return;
  };

  drawCircle = function(x, y, r, style) {
    var rand = Math.floor((Math.random() * 2) + 1);
    // console.log(rand);
    if(rand == 1 || rand == 2){
      context.beginPath();
      //context.arc(x, y, r, 0, PI_2, false);
      // console.log('x =' + x + 'y = ' + y );
      context.rect(x,y,y/20,y/20)
      context.fillStyle = style;
      return context.fill();
    }
    else {
      var radius = 20; // Arc radius
      var startAngle = 0; // Starting point on circle
      var endAngle = Math.PI / 4; // End point on circle
      var anticlockwise = i%2==0 ? false : true; // clockwise or anticlockwise
      context.beginPath();

      // context.moveTo(x,y);
      // context.bezierCurveTo(75,37,70,25,50,25);
      // context.bezierCurveTo(20,25,20,62.5,20,62.5);
      // context.bezierCurveTo(20,80,40,102,75,120);
      // context.bezierCurveTo(110,102,130,80,130,62.5);
      // context.bezierCurveTo(130,62.5,130,25,100,25);
      // context.bezierCurveTo(85,25,75,37,75,40);
      // context.arc(x, y, radius, startAngle, endAngle, anticlockwise);

      context.arc(x, y, r, 0, PI_2, false);
      // context.rect(x,y,10,10)
      context.fillStyle = style;
      return context.fill();
    }

  };

  xpos = 0.5;

  document.onmousemove = function(e) {
    // console.log(e.pageX / w)
    return xpos = e.pageX / w;
  };

  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  Colors_rand = function(){
    color_R = Math.random() * 255;
    color_G = Math.random() * 255;
    color_B = Math.random() * 255;
    var c_rand = [~~color_R, ~~color_G, ~~color_B];
    return c_rand;
  };

  Confetti = (function() {
    function Confetti() {
      // this.style = COLORS[~~range(0, 5)];
      this.style = Colors_rand();
      // console.log(this.style);
      this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2] + "," + 1.0 + ")" ;
      // this.rgb = '#'+(Math.random()*0xFFFF33<<0).toString(16);
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    Confetti.prototype.replace = function() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      // this.vx = range(0, 2) + 8 * xpos - 5;
      this.vx = -1/Math.log(xpos);
      console.log(this.vx);
      // return this.vy = 0.7 * this.r + range(-1, 1);
      return this.vy = this.r;
    };

    Confetti.prototype.draw = function() {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -0.01;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!((0 < (ref = this.x) && ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
    };

    return Confetti;

  })();

  confetti = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      results.push(new Confetti);
    }
    return results;
  })();

  window.step = function() {
    var c, j, len, results;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
      c = confetti[j];
      results.push(c.draw());
    }
    return results;
  };

  step();

}).call(this);
