function createSeed(clickTime: number): number {
    return 0.5 + Math.random() * 0.1 + ((clickTime % 1000) / 1000) * 0.4
}

export function animate(desiredSpeed: number, clickTime: number, resistance: number, currentElement: HTMLElement, startAngle: number, finish: Function) {
	let currentSpeedPerStep = desiredSpeed * createSeed(clickTime) / 20;
	let currentAngle = startAngle;

	setTimeout(function step() {
		currentAngle += currentSpeedPerStep;
		currentSpeedPerStep -= resistance;

		if (currentAngle >= 360) {
			currentAngle -= 360;
		}

		currentElement.style.transform = `rotate(${currentAngle}deg)`;

		if (currentSpeedPerStep >= 0) {
			setTimeout(step, 20);
		} else {
			finish(currentAngle);
		}

	}, 20);
}