import React, { Component } from 'react';
import Counters from './components/counters';
import Map from './components/map';
import axios from 'axios';
import https from 'https';
import './App.scss';

class App extends Component {
  state = {
    counters: [
      { id: 0, name: 'airports', value: 3, minValue: 3, label: 'Airports' },
      { id: 1, name: 'clouds', value: 4, minValue: 4, label: 'Clouds' },
      { id: 2, name: 'map', value: 10, minValue: 10, label: 'Map size' },
    ],
    field: []
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  }

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  }

  calculate = async () => {
    const route = 'http://localhost:3333/'
    const req = {};
    this.state.counters.map(e => {
      req[e.name] = e.value;
    });

    let response = await axios.post(route, req, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `application/json`,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    const field = response.data.plot
    const firstAirportCovered = response.data.firstAirportCovered;
    const allAirportsCovered = response.data.allAirportsCovered;
    this.setState({ field });
    this.setState({ firstAirportCovered });
    this.setState({ allAirportsCovered });
  }

  componentDidMount = () => {
    this.calculate();
  }

  render() {
    return (
      <div className="App">
        <Counters counters={this.state.counters} onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} onSend={this.calculate} />

        <h3>The first airport will be hit by clouds in <b>{this.state.firstAirportCovered}</b> days and all the airports will be covered by the clouds in <b>{this.state.allAirportsCovered}</b> days </h3>

        <div className="container d-flex justify-content-center">
          <div>
            {this.state.field.map((element, index) => (
              <Map key={index} content={element}></Map>
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default App;
