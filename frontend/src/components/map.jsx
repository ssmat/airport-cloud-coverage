import React, { Component } from 'react';

const Map = (props) => {
    return (
        <ul className="plot-line">
            {props.content.map((item, index) => (
                <li key={index}>
                    {item !== 'o' ? <b>{item}</b> : item}
                </li>
            ))}
        </ul>
    );
}

export default Map;