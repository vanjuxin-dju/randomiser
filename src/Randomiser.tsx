import React, { useRef } from "react"
import Sector from "./Sector";

function Randomiser({ setCurrentSector, options } : { setCurrentSector : Function, options : string[] }): React.JSX.Element {
	let audioRef = useRef(null);
	let wheelTurning:boolean = false;

	let clickTime:number = 0;

	const sectorAngle = options.length > 0 ? 360 / options.length : 360;
	let currentAngle = 0;

	let styles = `
	.randomiser .sector::before {
	  transform: rotate(${180 - sectorAngle}deg);
	}
	.randomiser .sector .text {
	  transform: rotate(${options.length > 2 ? (-sectorAngle / 2) : 0}deg);
	  right: ${sectorAngle / 10}vmin;
	  bottom: ${options.length > 2 ? sectorAngle * 0.14 : 20}vmin;
	}
	`;

	for (let i = 1; i < options.length; i++) {
		styles += `
		.randomiser .sector:nth-child(${i + 1}) {
          transform: rotate(${sectorAngle * i}deg);
        }
		`;
	}

	let sectors = options.map((text, index) => {
		return <Sector text={text} key={index} />;
	});

	if (sectors.length === 0) {
		sectors.push(<Sector text={"Please add options on the right"} key={0} />);
	}

	const audioControlsWrapper = {
		play: () => {
			const audioElement: any = audioRef.current;
			audioElement.volume = 1;
			audioElement.play();
		},
		stop: () => {
			const audioElement: any = audioRef.current;
			setTimeout(function fade() {
				if (audioElement.volume > 0) {
					audioElement.volume = (audioElement.volume - 0.05).toFixed(2);
					setTimeout(fade, 40);
				} else {
					audioElement.pause();
					audioElement.currentTime = 0;
				}
			}, 40)
		}
	};

	const turnTheWheel = (event: any) => {
		if (wheelTurning || options.length === 0) {
			return;
		}

		const seed = 0.5 + Math.random() * 0.1 + ((clickTime % 1000) / 1000) * 0.4;
		let currentSpeedPerStep = 180 * seed / 20;
		const currentElement = event.currentTarget;

		wheelTurning = true;
		audioControlsWrapper.play();

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
				audioControlsWrapper.stop();

				const countOfSectors = Math.floor(currentAngle / sectorAngle) - 1;
				const currentIndex = (countOfSectors < 0 ? 1 : options.length - countOfSectors) - 1;

				setCurrentSector(options[currentIndex]);
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
		<audio ref={audioRef} src="/baraban_superigri.mp3"></audio>
	</div>;
}

export default Randomiser;