import React, { useRef } from "react"
import Sector from "./Sector";
import { AudioControlsAdapter } from "./modules/AudioControlsAdapter";

function WhatWhereWhenRandomiser({ setCurrentSector, options } : { setCurrentSector : Function, options : string[] }): React.JSX.Element {
    let audioRef:React.RefObject<HTMLAudioElement|null> = useRef<HTMLAudioElement|null>(null);
    let clickTime:number = 0;
    let spinningTopTurning:boolean = false;

    const sectorAngle = options.length > 0 ? 360 / options.length : 360;
    let currentAngle = 0;

    const audioControlsAdapter = new AudioControlsAdapter(audioRef);

	let sectors = options.map((text, index) => {
		return <Sector text={text} optionsLength={options.length} sectorAngle={sectorAngle} index={index} key={index} />;
	});

	if (sectors.length === 0) {
		sectors.push(<Sector text={"Please add options on the right"} optionsLength={options.length} sectorAngle={sectorAngle} index={0} key={0} />);
	}

    const startCalculatingTime = (event: React.MouseEvent<HTMLElement>) => {
		if (event.button === 0) {
			clickTime = new Date().getTime();
		}
	};

	const stopCalculatingTime = (event: React.MouseEvent<HTMLElement>) => {
		if (event.button === 0) {
			clickTime = new Date().getTime() - clickTime;
		}
	}

    const turnTheSpinningTop = (event: React.MouseEvent<HTMLElement>) => {
		if (spinningTopTurning || options.length === 0) {
			return;
		}

		const seed = 0.5 + Math.random() * 0.1 + ((clickTime % 1000) / 1000) * 0.4;
		let currentSpeedPerStep = 360 * seed / 20;
		const currentElement = event.currentTarget;

		spinningTopTurning = true;
		audioControlsAdapter.play();

		setTimeout(function step() {
			currentAngle += currentSpeedPerStep;
			currentSpeedPerStep -= 0.015;

			if (currentAngle >= 360) {
				currentAngle -= 360;
			}

			currentElement.style.transform = `rotate(${currentAngle}deg)`;

			if (currentSpeedPerStep >= 0) {
				setTimeout(step, 20);
			} else {
				spinningTopTurning = false;
				audioControlsAdapter.stop();

				const countOfSectors = Math.floor(currentAngle / sectorAngle) + 1;
				const currentIndex = countOfSectors === options.length ? 0 : countOfSectors;

				setCurrentSector(options[currentIndex]);
			}
			
		}, 20);
	};

    return <div className="randomiser what-where-when">
		{sectors}
        <div className="spinning-top" onClick={turnTheSpinningTop} onMouseDown={startCalculatingTime} onMouseUp={stopCalculatingTime}></div>
        <audio ref={audioRef} src="/volchok.mp3"></audio>
	</div>;
}

export default WhatWhereWhenRandomiser;