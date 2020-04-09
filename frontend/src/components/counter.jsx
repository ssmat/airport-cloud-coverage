import React, { Component } from 'react';

class Counter extends Component {
    render() {
        return (
            <div>
                <span>{this.props.counter.label}</span>
                <span className="badge m-2 p-2 badge-primary">{this.props.counter.value}</span>
                <button onClick={() => this.props.onIncrement(this.props.counter)} className={this.getButtonClasses()}><b>+</b></button>
                <button onClick={() => this.props.onDecrement(this.props.counter)} className={this.getButtonClasses()} disabled={this.props.counter.value === this.props.counter.minValue}><b>-</b></button>
            </div>
        );
    }

    getButtonClasses() {
        let classes = "btn btn-secondary btn-sm m-2 ";
        classes += (this.props.counter.value === 0) && "disabled";
        return classes;
    }
}

export default Counter;