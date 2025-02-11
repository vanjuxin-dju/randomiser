export function addStylesToAllocateSectors(sectorAngle: number, optionsLength: number) {
    let styles = `
	.randomiser .sector::before {
	  transform: rotate(${180 - sectorAngle}deg);
	}
	.randomiser .sector .text {
	  transform: rotate(${optionsLength > 2 ? (-sectorAngle / 2) : 0}deg);
	  right: ${sectorAngle / 10}vmin;
	  bottom: ${optionsLength > 2 ? sectorAngle * 0.14 : 20}vmin;
	}
	`;

    for (let i = 1; i < optionsLength; i++) {
        styles += `
		.randomiser .sector:nth-child(${i + 1}) {
          transform: rotate(${sectorAngle * i}deg);
        }
		`;
    }
    return styles;
}