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
		// "some text 13",
		// "some text 14",
		// "some text 15",
		// "some text 16",
		// "some text 17",
		// "some text 18",
		// "some text 19",
		// "some text 20",
		// "some text 21",
		// "some text 22",
		// "some text 23",
		// "some text 24",
	];

	let wheelTurning:boolean = false;

	let clickTime:number = 0;

	const sectorAngle = 360 / listOfOptions.length;
	let currentAngle = 0;

	let styles = `
	.randomiser .sector::before {
	  transform: rotate(${180 - sectorAngle}deg);
	}
	.randomiser .sector .text {
	  transform: rotate(${listOfOptions.length > 2 ? (-sectorAngle / 2) : 0}deg);
	  right: ${sectorAngle / 10}vmin;
	  bottom: ${listOfOptions.length > 2 ? sectorAngle * 0.14 : 20}vmin;
	}
	`;

	for (let i = 1; i < listOfOptions.length; i++) {
		styles += `
		.randomiser .sector:nth-child(${i + 1}) {
          transform: rotate(${sectorAngle * i}deg);
        }
		`;
	}

	let sectors = listOfOptions.map((text, index) => {
		return <Sector text={text} key={index} />;
	});

	const turnTheWheel = (event: any) => {
		if (wheelTurning) {
			return;
		}

		const timeBasedSeed = (clickTime % 1000) / 1000;
		const seed = 0.5 + Math.random() * 0.1 + timeBasedSeed * 0.4;
		const initialSpeed = 180 * seed;
		let currentSpeedPerStep = initialSpeed / 20;
		const currentElement = event.currentTarget;
		const audioElement = currentElement.querySelector("audio");

		wheelTurning = true;

		// start audio
		audioElement.play();

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

				// stop audio
				audioElement.pause();
				audioElement.currentTime = 0;

				const countOfSectors = Math.floor(currentAngle / sectorAngle) - 1;
				const currentSector = countOfSectors < 0 ? 1 : listOfOptions.length - countOfSectors;
				const currentIndex = currentSector - 1;
				console.log("Current sector:", currentSector, listOfOptions[currentIndex]);
			}
			
		}, 20);
	};

	const startCalculatingTime = (event: any) => {
		if (event.button === 0) {
			clickTime = new Date().getTime();
		}
	};

	const stopCalculatingTime = (event: any) => {
		if (event.button === 0) {
			clickTime = new Date().getTime() - clickTime;
		}
	}

	return <div className="randomiser" onClick={turnTheWheel} onMouseDown={startCalculatingTime} onMouseUp={stopCalculatingTime}>
		{sectors}
		<style>{styles}</style>
		<audio src="/baraban_superigri.mp3"></audio>
	</div>;
}

export default Randomiser;