import React from "react";

function Sector({ text } : { text : string }) : React.JSX.Element {
    return <section className="sector">
        <div className="text">{text}</div>
    </section>;
}

export default Sector;