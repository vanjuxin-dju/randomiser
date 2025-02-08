import Randomiser from "./Randomiser";
import React from "react";

function RandomiserWrapper(): React.JSX.Element {
    return <div className="randomiser-wrapper">
        <Randomiser />
        <div className="info">
            <h1>Click the wheel to make a turn!</h1>
        </div>
    </div>;
}

export default RandomiserWrapper;