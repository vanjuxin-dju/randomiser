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
		"some text 7",
		"some text 8",
		"some text 9",
		"some text 10",
		"some text 11",
		"some text 12",
	];

	let wheelTurning = false;

	const sectorAngle = 360 / listOfOptions.length;
	let currentAngle = 0;

	let styles = `
	.randomiser .sector::before {
	  transform: rotate(${180 - sectorAngle}deg);
	}
	.randomiser .sector .text {
	  transform: rotate(-${sectorAngle / 2}deg);
	  right: ${sectorAngle / 10}vmin;
	  bottom: ${sectorAngle * 0.14}vmin;
	}
	`;

	for (let i = 1; i < listOfOptions.length; i++) {
		styles += `
		.randomiser .sector:nth-child(${i + 1}) {
          transform: rotate(${sectorAngle * i}deg);
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

		const seed = 0.5 + Math.random() * 0.5;
		const initialSpeed = 180 * seed;
		let currentSpeedPerStep = initialSpeed / 20;
		const currentElement = event.currentTarget;
		const audioElement = currentElement.querySelector("audio");

		wheelTurning = true;

		audioElement.play();

		setTimeout(function step() {
			currentAngle += currentSpeedPerStep;
			currentSpeedPerStep -= 0.02;

			if (currentAngle >= 360) {
				currentAngle -= 360;
			}

			currentElement.style.transform = `rotate(${currentAngle}deg)`;

			if (currentSpeedPerStep >= 0) {
				setTimeout(step, 20);
			} else {
				wheelTurning = false;
				audioElement.pause();
				audioElement.currentTime = 0;
			}
			
		}, 20);
	};

	return <div className="randomiser" onClick={turnTheWheel}>
		{sectors}
		<style>{styles}</style>
		<audio src="/baraban_superigri.mp3"></audio>
	</div>;
}

export default Randomiser;