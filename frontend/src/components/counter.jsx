import React, { useState } from 'react';
import { useEffect } from 'react';

function Counter(props) {
    const [count, setCount] = useState(props.counter.value);
    useEffect(() => {
        if (count > props.counter.value) {
            props.onIncrement(props.counter, count);
        } else {
            props.onDecrement(props.counter, count);
        }
    }, [count]);

    return (
        <div>
            <span>{props.counter.label}</span>
            <span className="badge m-2 p-2 badge-primary">{count}</span>
            {/* <button onClick={() => setCount(count + 1)} className="btn btn-secondary btn-sm m-2"><b>+</b></button> */}
            <button onClick={() => setCount(count + 1)} className="btn btn-secondary btn-sm m-2"><b>+</b></button>

            <button onClick={() => setCount(count - 1)} className="btn btn-secondary btn-sm m-2" disabled={count === props.counter.minValue}><b>-</b></button>
        </div>
    );
}

export default Counter