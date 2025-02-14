import React, { useRef, useState } from "react"
import Sector from "./Sector";
import { AudioControlsAdapter } from "./modules/AudioControlsAdapter";
import { animate } from "./modules/Util";

function WhatWhereWhenRandomiser({ setCurrentSector, options } : { setCurrentSector : Function, options : string[] }): React.JSX.Element {
	const [currentAngle, setCurrentAngle] = useState(0);
    let audioRef:React.RefObject<HTMLAudioElement|null> = useRef<HTMLAudioElement|null>(null);
    let clickTime:number = 0;
    let spinningTopTurning:boolean = false;

    const sectorAngle = options.length > 0 ? 360 / options.length : 360;

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

		spinningTopTurning = true;
		audioControlsAdapter.play();

		animate(360, clickTime, 0.015, event.currentTarget, currentAngle, (angle: number) => {
			setCurrentAngle(angle);
			spinningTopTurning = false;
			audioControlsAdapter.stop();

			const countOfSectors = Math.floor(angle / sectorAngle) + 1;
			const currentIndex = countOfSectors === options.length ? 0 : countOfSectors;

			setCurrentSector(options[currentIndex]);
		});
	};

    return <div className="randomiser what-where-when">
		{sectors}
        <div className="spinning-top" onClick={turnTheSpinningTop} onMouseDown={startCalculatingTime} onMouseUp={stopCalculatingTime}></div>
        <audio ref={audioRef} src="/volchok.mp3"></audio>
	</div>;
}

export default WhatWhereWhenRandomiser;