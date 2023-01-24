// https://ru.reactjs.org/docs/handling-events.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));



// События в React именуются в camelCase и обработчик передается не строкой, а функцией

// Синтаксис чистого HTML (👎):
<button onclick='activateLasers()'>
  Активировать лазеры
</button>

// Синтаксис React (👍):
<button onClick={activateLasers}>
  Активировать лазеры
</button>



// В React нельзя предотвратить события по-умолчанию, вернув false, как в чистом HTML

// Синтаксис чистого HTML:
<form onsubmit='console.log("Форма отправлена"); return false'>
  <button type='submit'>Отправить</button>
</form>

// Синтаксис React (👍):
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Форма отправлена');
  }

  return (
      <form onSubmit={handleSubmit}>
        <button type='submit'>Отправить</button>
      </form>
  );
}



// При прослушке событий в React не нужен `addEventListener*()`, чтобы добавить обработчик события.
// Вместо этого обработчик добавляется в качестве метода компонента.
class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
  }

  handleClick = () => {                         // Стрелочная, тк при передаче в кач-ве колбека не теряет this. Это синтаксис публичных полей.
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'Включено' : 'Выключено'}
        </button>
    )
  }
}



// Чтобы передать дополнительный аргумент в обработчик события (например id), указываем его в кач-ве аргумента перед передачей события:
<button onClick={(event) => this.deleteRow(id, event)}>Удалить строчку</button>