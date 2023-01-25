// https://ru.reactjs.org/docs/forms.html


import React from 'react';
// import ReactDOM from 'react-dom/client';
import '../styles.scss';

// const root = ReactDOM.createRoot(document.getElementById('root'));



// Формы в React могут быть достаточно больной темой. Поэтому для форм есть удобная сторонняя библиотека - formik.



// Форму удобнее всего обрабатывать с помощью материнской функции, у которой есть доступ к введенным данным.

// В React у элементов формы изначально есть внутреннее состояние(state)
export class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert(`Submitted name: ${this.state.value}`);
    event.preventDefault();                               // `event.preventDefault()` отменяет действия браузера по умолчанию (тут - отправку формы на сервер)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>                                  // input value={this.state.value} - значение в инпуте записывается в state.value при каждом изменении(onChange={this.handleChange})
    );
  }
}
// root.render(<NameForm />);



// Тег `<textarea>` обрабатывается идентичным образом, хотя в HTML обработка бы отличалась.



// Тег `<select>` (внутри `<option>`) создает выпадающий список.
// Чтобы задать ему значение по-умолчанию в React, ему добавляется атрибут `value`. В целом, работает идентичным образом, что и теги выше.
// Единственная особенность - в `value` можно передать массив - это позволит выбрать несколько значений одновременно.



// Для обработки нескольких инпутов одновременно на них нужно использовать атрибут `name`:
export class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    }
  }

  handleInputChange = (event) => {
    const target = event.target;                                                // `event.target` - это объект, который был инициатором события.
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
        <form>
          <label>
            Пойдут:
            <input
                name='isGoing'
                type='checkbox'
                checked={this.state.isGoing}
                onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Количество гостей:
            <input
                name='numberOfGuests'
                type='number'
                value={this.state.numberOfGuests}
                onChange={this.handleInputChange}/>
          </label>
        </form>
    );
  }
}
// root.render(<Reservation />);