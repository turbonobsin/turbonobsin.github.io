const can = document.getElementById("can");
const ctx = can.getContext("2d");

can.oncontextmenu = function(e) {

	e.preventDefault();
};

function clearCanvas() {
	ctx.clearRect(0, 0, can.width, can.height);
}

function drawPixel(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, 1, 1);
}

function drawCanvas() {
	ctx.fillStyle = "#00f";
	ctx.fillRect(0, 0, can.width, can.height);
	ctx.fillStyle = "#f00";
	ctx.fillRect(0, 0, 1, can.height);
	ctx.fillStyle = "#0f0";
	ctx.fillRect(0, can.height - 1, can.width, 1);
}

function updateCanvas() {
	clearCanvas();
	drawCanvas();
	drawPixel(can.width / 2, can.height / 2, "rgb(0, 0, 0)");
}

// Run
let width = 0;
const startTime = Date.now();
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
let currentTime = 0;
requestAnimationFrame(function animate() {

	currentTime = Date.now();
	let timeDelta = currentTime - startTime;

	if (timeDelta >= 16) {
		updateCanvas();
		startTime = currentTime;
	}

	requestAnimationFrame(animate);
});
