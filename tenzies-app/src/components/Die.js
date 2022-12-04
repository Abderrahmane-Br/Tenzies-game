import React from "react";

export default function Die(props) {
    return (
        <div
            className={`die  ${props.fixed ? "fixed" : ""} face-${props.value}`}
            onClick={props.toggle}
        >
            {/* {props.value} */}
        </div>
    )
}