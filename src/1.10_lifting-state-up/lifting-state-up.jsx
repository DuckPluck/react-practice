// https://ru.reactjs.org/docs/lifting-state-up.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';
import {number} from 'prop-types';

const root = ReactDOM.createRoot(document.getElementById('root'));



export function BoilingVerdict(props) {
  BoilingVerdict.propTypes = {celsius: number}

  if (props.celsius >= 100) {
    return <p>Вода закипит</p>;
  }
  return <p>Вода НЕ закипит</p>;
}



export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: ''}
  }

  handleChange = (e) => {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
        <fieldset>
          <legend>Введите температуру в градусах Цельсия:</legend>
          <input value={temperature} onChange={this.handleChange} />
          <BoilingVerdict celsius={parseFloat(temperature)} />
        </fieldset>
    );
  }
}

root.render(<Calculator />);