import Randomiser from "./Randomiser";
import React, { useState } from "react";

function RandomiserWrapper(): React.JSX.Element {
    const [currentSector, setCurrentSector] = useState("");
    const [options, setOptions] = useState([] as string[]);

    const onChange = (event: any) => {
        const currentElement = event.currentTarget;
        const values = currentElement.value.split('\n');

        setOptions(values.filter((element: any) => element.length > 0));
    }

    return <div className="randomiser-wrapper">
        <Randomiser setCurrentSector={setCurrentSector} options={options} />
        <div className="info">
            <h1>Click the wheel to make a turn!</h1>
            <div className="current-sector">Current sector: <b>{currentSector}</b></div>
            <div className="options">
                <p>Available options:</p>
                <textarea onChange={onChange} defaultValue={options.join('\n')} placeholder="Please add options here, one per line"></textarea>
            </div>
        </div>

    </div>;
}

export default RandomiserWrapper;