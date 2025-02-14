import React, { useRef, useState } from "react"
import Sector from "./Sector";
import { AudioControlsAdapter } from "./modules/AudioControlsAdapter";
import { animate } from "./modules/Util";

function TheFieldOfWondersRandomiser({ setCurrentSector, options } : { setCurrentSector : Function, options : string[] }): React.JSX.Element {
	const [currentAngle, setCurrentAngle] = useState(0);
	let audioRef:React.RefObject<HTMLAudioElement|null> = useRef<HTMLAudioElement|null>(null);
	let wheelTurning:boolean = false;

	let clickTime:number = 0;

	const sectorAngle: number = options.length > 0 ? 360 / options.length : 360;

	let sectors = options.map((text, index) => {
		return <Sector text={text} optionsLength={options.length} sectorAngle={sectorAngle} index={index} key={index} />;
	});

	if (sectors.length === 0) {
		sectors.push(<Sector text={"Please add options on the right"} optionsLength={options.length} sectorAngle={sectorAngle} index={0} key={0} />);
	}

	const audioControlsAdapter = new AudioControlsAdapter(audioRef);

	const turnTheWheel = (event: React.MouseEvent<HTMLElement>) => {
		if (wheelTurning || options.length === 0) {
			return;
		}

		wheelTurning = true;
		audioControlsAdapter.play();
		animate(180, clickTime, 0.01, event.currentTarget, currentAngle, (angle: number) => {
			setCurrentAngle(angle);
			wheelTurning = false;
			audioControlsAdapter.stop();

			const countOfSectors = Math.floor(angle / sectorAngle) - 1;
			const currentIndex = (countOfSectors < 0 ? 1 : options.length - countOfSectors) - 1;

			setCurrentSector(options[currentIndex]);
		});
	};

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

	return <div className="randomiser" onClick={turnTheWheel} onMouseDown={startCalculatingTime} onMouseUp={stopCalculatingTime}>
		{sectors}
		<audio ref={audioRef} src="/baraban_superigri.mp3"></audio>
	</div>;
}

export default TheFieldOfWondersRandomiser;