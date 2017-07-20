function Star(id, x, y){
	this.id = id;
	this.x = x;
	this.y = y;
	this.r = Math.floor(Math.random()*2)+1;
	var alpha = (Math.floor(Math.random()*10)+1)/10/2;
	this.color = "rgba(255,255,255,"+alpha+")";
}

Star.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.shadowBlur = this.r * 2;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	ctx.closePath();
	ctx.fill();
}

Star.prototype.move = function() {
	this.y -= .15;
	if (this.y <= -10) this.y = HEIGHT + 10;
	this.draw();
}

Star.prototype.die = function() {
    stars[this.id] = null;
    delete stars[this.id];
}


function Dot(id, x, y, r) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.r = Math.floor(Math.random()*5)+1;
	this.maxLinks = 2;
	this.speed = .5;
	this.a = .5;
	this.aReduction = .005;
	this.color = "rgba(255,255,255,"+this.a+")";
	this.linkColor = "rgba(255,255,255,"+this.a/4+")";

	this.dir = Math.floor(Math.random()*140)+200;
}

Dot.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.shadowBlur = this.r * 2;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	ctx.closePath();
	ctx.fill();
}

Dot.prototype.link = function() {
	if (this.id == 0) return;
	var previousDot1 = getPreviousDot(this.id, 1);
	var previousDot2 = getPreviousDot(this.id, 2);
	var previousDot3 = getPreviousDot(this.id, 3);
	if (!previousDot1) return;
	ctx.strokeStyle = this.linkColor;
	ctx.moveTo(previousDot1.x, previousDot1.y);
	ctx.beginPath();
	ctx.lineTo(this.x, this.y);
	if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
	if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
	ctx.stroke();
	ctx.closePath();
}

function getPreviousDot(id, stepback) {
	if (id == 0 || id - stepback < 0) return false;
	if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
	else return false;//getPreviousDot(id - stepback);
}

Dot.prototype.move = function() {
	this.a -= this.aReduction;
	if (this.a <= 0) {
		this.die();
		return
	}
	this.color = "rgba(255,255,255,"+this.a+")";
	this.linkColor = "rgba(255,255,255,"+this.a/4+")";
	this.x = this.x + Math.cos(degToRad(this.dir))*this.speed,
	this.y = this.y + Math.sin(degToRad(this.dir))*this.speed;

	this.draw();
	this.link();
}

Dot.prototype.die = function() {
    dots[this.id] = null;
    delete dots[this.id];
}


var canvas  = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	ctx2 = canvas2.getContext('2d'),
	t = 1,
	t2 = 5,
	up = true,
	points = [],
	WIDTH,
	HEIGHT,
	mouseMoving = false,
	mouseMoveChecker,
	mouseX,
	mouseY,
	stars = [],
	initStarsPopulation = 80,
	dots = [],
	dotsMinDist = 2,
	maxDistFromCursor = 50;

setCanvasSize();
init();

function setCanvasSize() {
	WIDTH = document.documentElement.clientWidth,
  HEIGHT = document.documentElement.clientHeight;

	canvas.setAttribute("width", WIDTH);
	canvas.setAttribute("height", HEIGHT);
}

function init() {
	ctx.strokeStyle = "white";
	ctx.shadowColor = "white";
	for (var i = 0; i < initStarsPopulation; i++) {
		stars[i] = new Star(i, Math.floor(Math.random()*WIDTH), Math.floor(Math.random()*HEIGHT));
		//stars[i].draw();
	}
	ctx.shadowBlur = 0;
	animate();
	showLogo()
}

function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i in stars) {
    	stars[i].move();
    }
    for (var i in dots) {
    	dots[i].move();
    }
    drawIfMouseMoving();
    requestAnimationFrame(animate);
}

function showLogo() {
	// 显示点,
	ctx2.clearRect(0, 0, 500, 500);
	ctx2.moveTo(0, 0)
	point(100, 100, 5, 10, 0.5)
	setTimeout(function () {
		//然后画线
		var arr = []
		arr.push({
			x: 100,
			y: 100
		})
		arr.push({
			x: 100,
			y: 200
		})
		points = calcWaypoints(arr)
		drawLine(points)
	}, 500)
}


// 生成点
function calcWaypoints(vertices) {
  var waypoints = [];
  for (var i = 1; i < vertices.length; i++) {
      var pt0 = vertices[i - 1];
      var pt1 = vertices[i];
      var dx = pt1.x - pt0.x;
      var dy = pt1.y - pt0.y;
      for (var j = 0; j < 100; j++) {
          var x = pt0.x + dx * j / 100;
          var y = pt0.y + dy * j / 100;
          waypoints.push({
              x: x,
              y: y
          });
      }
  }
  return (waypoints);
}

// 画线动画
function drawLine() {
  if (t < points.length - 1) {
      requestAnimationFrame(drawLine);
  } else {
		point(100, 200, 5, 10, 0.5)
		t = 1
		var arr = []
		arr.push({
			x: 100,
			y: 200
		})
		arr.push({
			x: 200,
			y: 300
		})
		points = calcWaypoints(arr)
		drawLine2()
	}
	line(points[t - 1].x, points[t - 1].y, points[t].x, points[t].y, 0)
  t++;
}

function drawLine2 () {
	if (t < points.length - 1) {
      requestAnimationFrame(drawLine2);
  } else {
		 point(200, 300, 5, 10, 0.5)
		 t = 1
 		var arr = []
 		arr.push({
 			x: 200,
 			y: 300
 		})
 		arr.push({
 			x: 300,
 			y: 300
 		})
 		points = calcWaypoints(arr)
 		drawLine3()
	}
	line(points[t - 1].x, points[t - 1].y, points[t].x, points[t].y, 0)
	t++;
}


function drawLine3 () {
	if (t < points.length - 1) {
      requestAnimationFrame(drawLine3);
  } else {
		 point(300, 300, 5, 10, 0.5)
		 point(200, 100, 5, 10, 0.5)
		 t = 1
 		var arr = []
 		arr.push({
 			x: 200,
 			y: 100
 		})
 		arr.push({
 			x: 300,
 			y: 200
 		})
 		points = calcWaypoints(arr)
 		drawLine4()
	}
	line(points[t - 1].x, points[t - 1].y, points[t].x, points[t].y, 0)
	t++;
}

function drawLine4 () {
	if (t < points.length - 1) {
      requestAnimationFrame(drawLine4);
  } else {
		point(300, 200, 5, 10, 0.5)
		point(300, 100, 5, 10, 0.5)
		point(200, 200, 5, 10, 0.5)
		point(100, 300, 5, 10, 0.5)
		showLogos()
	}
	line(points[t - 1].x, points[t - 1].y, points[t].x, points[t].y, 0)
	t++;
}

// 画点
function point(x, y , r, shadow, opacity) {
	ctx2.beginPath();
	ctx2.fillStyle = "rgba(255,255,255, "+ opacity +")";
	ctx2.shadowColor = "rgba(255,255,255, 1)";
	ctx2.shadowBlur =  shadow;
	ctx2.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx2.fill();
	ctx2.closePath();
}

// 画线
function line(x1, y1, x2, y2, r) {
	ctx2.beginPath()
	ctx2.strokeStyle = "rgba(255,255,255, 0.5)"
	if (r === 0) {
		ctx2.moveTo(x1, y1)
		ctx2.lineTo(x2, y2)
	} else if (x1 === x2) {
		ctx2.moveTo(x1, y1 + r)
		ctx2.lineTo(x2, y2 - r)
	} else if (y1 === y2) {
		ctx2.moveTo(x1 + r, y1)
		ctx2.lineTo(x2 - r, y2)
	} else {
		ctx2.moveTo(x1 + r / 2, y1 + r / 2)
		ctx2.lineTo(x2 - r / 2, y2 - r / 2)
	}
	ctx.fill()
	ctx2.stroke()
	ctx2.closePath()
}

function  showLogos() {
	if (up) {
		if (t2 <= 10) {
			t2 = t2 + 0.1;
		} else {
			up = false
		}
		requestAnimationFrame(showLogos)
	} else {
		if (t2 >= 5) {
			t2 = t2 - 0.1;
		} else {
			up = true
		}
		requestAnimationFrame(showLogos)
	}

	ctx2.clearRect(0, 0, 500, 500)
	line(100, 100, 100, 200, t2)
	line(100, 200, 200, 300, t2)
	line(200, 300, 300, 300, t2)
	line(200, 100, 300, 200, t2)
	point(100, 100, t2, t2, 0.5)
	point(100, 200, t2, t2, 0.5)
	point(100, 300, 5, 10, 0.5)
	point(200, 100, t2, t2, 0.5)
	point(200, 200, t2, t2, 0.5)
	point(200, 300, t2, t2, 0.5)
	point(300, 100, 5, 10, 0.5)
	point(300, 200, t2, t2, 0.5)
	point(300, 300, t2, t2, 0.5)
}


function drawIfMouseMoving(){
	if (!mouseMoving) return;

	if (dots.length == 0) {
		dots[0] = new Dot(0, mouseX, mouseY);
		dots[0].draw();
		return;
	}

	var previousDot = getPreviousDot(dots.length, 1);
	var prevX = previousDot.x;
	var prevY = previousDot.y;

	var diffX = Math.abs(prevX - mouseX);
	var diffY = Math.abs(prevY - mouseY);

	if (diffX < dotsMinDist || diffY < dotsMinDist) return;

	var xVariation = Math.random() > .5 ? -1 : 1;
	xVariation = xVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
	var yVariation = Math.random() > .5 ? -1 : 1;
	yVariation = yVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
	dots[dots.length] = new Dot(dots.length, mouseX+xVariation, mouseY+yVariation);
	dots[dots.length-1].draw();
	dots[dots.length-1].link();
}
//setInterval(drawIfMouseMoving, 17);

function degToRad(deg) {
	return deg * (Math.PI / 180);
}
