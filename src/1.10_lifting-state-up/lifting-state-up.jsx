// https://ru.reactjs.org/docs/lifting-state-up.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';
import {number, string, func} from 'prop-types';

const root = ReactDOM.createRoot(document.getElementById('root'));


// Состояния должны храниться в общем родительском компоненте
const scaleNames = {
  c: 'Цельсия',
  f: 'Фаренгейта'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export function BoilingVerdict(props) {
  BoilingVerdict.propTypes = {celsius: number};

  if (props.celsius >= 100) {
    return <p>Вода закипит</p>;
  }
  return <p>Вода НЕ закипит</p>;
}

export class TemperatureInput extends React.Component {
  static propTypes = {scale: string, temperature: string, onTemperatureChange: func};

  constructor(props) {
    super(props);
    this.state = {temperature: ''};
  }

  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  };

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
        <fieldset>
          <legend>Введите температуру в градусах {scaleNames[scale]}:</legend>
          <input value={temperature} onChange={this.handleChange}/>
        </fieldset>
    );
  }
}

export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange = (temperature) => {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange = (temperature) => {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
        <div>
          <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
          <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
          <BoilingVerdict celsius={parseFloat(celsius)}/>
        </div>
    );
  }
}

root.render(<Calculator/>);