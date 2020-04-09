import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
    render() {
        const {
            counters,
            onIncrement,
            onDecrement,
            onSend,
        } = this.props;

        return (
            <div className="d-flex justify-content-center">
                {counters.map(counter => (
                    <Counter key={counter.id} onIncrement={onIncrement} onDecrement={onDecrement} onSend={onSend} counter={counter}>
                    </Counter>
                ))}
                <button onClick={() => this.props.onSend(counters)} className="btn btn-danger btn-sm m-2">Solucionar</button>
            </div>
        );
    }
}

export default Counters;