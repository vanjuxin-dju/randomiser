import TheFieldOfWondersRandomiser from "./TheFieldOfWondersRandomiser";
import WhatWhereWhenRandomiser from "./WhatWhereWhenRandomiser";
import React, { useState } from "react";

function RandomiserWrapper(): React.JSX.Element {
    const [currentSector, setCurrentSector] = useState("");
    const [options, setOptions] = useState([] as string[]);

    enum RandomiserType {
        THE_FIELD_OF_WONDERS,
        WHAT_WHERE_WHEN
    };

    const [currentRandomiser, setCurrentRandomiser] = useState(RandomiserType.THE_FIELD_OF_WONDERS);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentElement = event.currentTarget;
        const values = currentElement.value.split('\n');

        setOptions(values.filter((element) => element.length > 0));
    }

    const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentElement = event.currentTarget;
        setCurrentRandomiser(parseInt(currentElement.value));
    }

    return <div className="randomiser-wrapper">
        { currentRandomiser == RandomiserType.WHAT_WHERE_WHEN ? 
            <WhatWhereWhenRandomiser setCurrentSector={setCurrentSector} options={options} /> : 
            <TheFieldOfWondersRandomiser setCurrentSector={setCurrentSector} options={options} /> }
        <div className="info">
            <h1>Click the {currentRandomiser == RandomiserType.WHAT_WHERE_WHEN ? "spinning top" : "wheel"} to make a turn!</h1>
            <div className="current-sector">Current sector: <b>{currentSector}</b></div>
            <div className="options">
                <p>Available options:</p>
                <textarea onChange={onChange} defaultValue={options.join('\n')} placeholder="Please add options here, one per line"></textarea>
            </div>
            <div className="randomiser-type">
                <p>Randomiser type:</p>
                <select onChange={onChangeType}>
                    <option value={RandomiserType.THE_FIELD_OF_WONDERS}>The Field of Wonders</option>
                    <option value={RandomiserType.WHAT_WHERE_WHEN}>What? Where? When?</option>
                </select>
            </div>
        </div>

    </div>;
}

export default RandomiserWrapper;