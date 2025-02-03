import React from "react";

function Sector({ text } : { text : string }) : React.JSX.Element {
    return <div className="sector">
        <div className="text">{text}</div>
    </div>;
}

export default Sector;