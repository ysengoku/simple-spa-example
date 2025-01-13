// --- Bouncing Ball Animation ---
const canvasAnimation = document.getElementById("animationCanvas");
const ctxAnimation = canvasAnimation.getContext("2d");
const startButton = document.getElementById("startAnimation");
const stopButton = document.getElementById("stopAnimation");

let ballX = canvasAnimation.width / 2;
let ballY = canvasAnimation.height / 2;
let ballRadius = 15;
let ballSpeedX = 4;
let ballSpeedY = 3;

let animationRunning = false;
let animationFrameId = null;

function drawBall() {
	ctxAnimation.beginPath();
	ctxAnimation.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	ctxAnimation.fillStyle = "rgb(174, 56, 85)";
	ctxAnimation.fill();
	ctxAnimation.closePath();
}

function updateBallPosition() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX + ballRadius > canvasAnimation.width || ballX - ballRadius < 0) {
		ballSpeedX = -ballSpeedX;
	}
	if (ballY + ballRadius > canvasAnimation.height || ballY - ballRadius < 0) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawFrame() {
	ctxAnimation.clearRect(0, 0, canvasAnimation.width, canvasAnimation.height);
	drawBall();
	updateBallPosition();

	if (animationRunning) {
		animationFrameId = requestAnimationFrame(drawFrame);
	}
}

startButton.addEventListener("click", () => {
	if (!animationRunning) {
		animationRunning = true;
		startButton.disabled = true;
		stopButton.disabled = false;
		drawFrame();
	}
});

stopButton.addEventListener("click", () => {
	if (animationRunning) {
		animationRunning = false;
		cancelAnimationFrame(animationFrameId);
		startButton.disabled = false;
		stopButton.disabled = true;
	}
});

// --- Bar Graph ---
const canvasGraph = document.getElementById("graphCanvas");
const ctxGraph = canvasGraph.getContext("2d");
const valueInput = document.getElementById("valueInput");
const updateButton = document.getElementById("updateGraph");
const resetButton = document.getElementById("resetGraph");

let currentWidth = 0; // Initial width of the bar (0%)
let targetWidth = 0; // Target width to animate to (0-100%)
const animationSpeed = 2; // Speed of the animation (pixels per frame)

function drawHorizontalBar() {
	// Clear the canvas
	ctxGraph.clearRect(0, 0, canvasGraph.width, canvasGraph.height);

	// Draw the background bar (full width)
	ctxGraph.fillStyle = "#c4d2da";
	ctxGraph.fillRect(0, canvasGraph.height / 2 - 20, canvasGraph.width, 40);

	// Draw the animated bar
	ctxGraph.fillStyle = "rgb(174, 56, 85)";
	ctxGraph.fillRect(0, canvasGraph.height / 2 - 20, currentWidth, 40);
}

function animateBar() {
	if (currentWidth < targetWidth) {
		currentWidth += animationSpeed;
		if (currentWidth > targetWidth) {
			currentWidth = targetWidth; // Ensure we don't overshoot
		}
	} else if (currentWidth > targetWidth) {
		currentWidth -= animationSpeed;
		if (currentWidth < targetWidth) {
			currentWidth = targetWidth; // Ensure we don't undershoot
		}
	}

	drawHorizontalBar();

	if (currentWidth !== targetWidth) {
		requestAnimationFrame(animateBar); // Continue animating until the target is reached
	}
}

// Event listener for the update button
updateButton.addEventListener("click", () => {
	const userValue = parseInt(valueInput.value, 10);

	if (userValue >= 0 && userValue <= 100) {
		targetWidth = (userValue / 100) * canvasGraph.width; // Convert percentage to pixels
		animateBar();
	} else {
		alert("Please enter a value between 0 and 100.");
	}
});

// Event listener for the reset button
resetButton.addEventListener("click", () => {
	currentWidth = 0; // Reset the current width to 0
	targetWidth = 0; // Reset the target width to 0
	valueInput.value = ""; // Clear the input field
	drawHorizontalBar(); // Redraw the canvas to reflect the reset state
	});

// Initial draw
drawHorizontalBar();
