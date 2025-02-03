import React from "react"
import Sector from "./Sector";

function Randomiser(): React.JSX.Element {
	let listOfOptions:string[] = [
		"some text 1",
		"some text 2",
		"some text 3",
		"some text 4",
		"some text 5",
		"some text 6",
		"some text 1",
		"some text 2",
		"some text 3",
		"some text 4",
		"some text 5",
		"some text 6",
		"some text 1",
		"some text 2",
		"some text 3",
		"some text 4",
		"some text 5",
		"some text 6",
		"some text 1",
		"some text 2",
		"some text 3",
		"some text 4",
		"some text 5",
		"some text 6",
		"some text 1",
		"some text 2",
		"some text 3",
		"some text 4",
		"some text 5",
		"some text 6",
		"some text 1",
		"some text 2",
		"some text 3",
		"some text 4",
		"some text 5",
		"some text 6",
		"some text 1",
		"some text 2",
		"some text 3",
		"some text 4",
		"some text 5",
		"some text 6",
		"some text 1",
		"some text 2",
		"some text 3",
		"some text 4",
		"some text 5",
		"some text 6",
	];

	let wheelTurning = false;

	const angle = 360 / listOfOptions.length;

	let styles = `
	.randomiser .sector::before {
	  transform: rotate(${180 - angle}deg);
	}
	.randomiser .sector .text {
	  transform: rotate(-${angle / 2}deg);
	  right: ${angle / 10}vmin;
	  bottom: ${angle * 0.14}vmin;
	}
	`;

	for (let i = 1; i < listOfOptions.length; i++) {
		styles += `
		.randomiser .sector:nth-child(${i + 1}) {
          transform: rotate(${angle * i}deg);
        }
		`;
	}

	let sectors = listOfOptions.map((text) => {
		return <Sector text={text} />;
	});

	const turnTheWheel = (event: any) => {
		if (wheelTurning) {
			return;
		}

		let initialSpeed = 270 * Math.random();
		let currentSpeedPerStep = initialSpeed / 20;
		let currentElement = event.currentTarget;
		let currentAngle = 0;
		wheelTurning = true;

		setTimeout(function step() {
			currentAngle += currentSpeedPerStep;
			currentSpeedPerStep -= 0.01;

			if (currentAngle >= 360) {
				currentAngle -= 360;
			}

			currentElement.style.transform = `rotate(${currentAngle}deg)`;

			if (currentSpeedPerStep >= 0) {
				setTimeout(step, 20);
			} else {
				wheelTurning = false;
			}
			
		}, 20);
	};

	return <div className="randomiser" onClick={turnTheWheel}>
		{sectors}
		<style>{styles}</style>
	</div>;
}

export default Randomiser;