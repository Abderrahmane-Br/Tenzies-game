import React from "react";

export default function Button(props) {
    return (
        <button 

        className="roll-btn"
            onClick={props.endGame ? props.reset : props.roll}

        >{props.endGame ? "Reset Game" : "Roll"}</button>
    )
}