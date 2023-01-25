// https://ru.reactjs.org/docs/conditional-rendering.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';

// const root = ReactDOM.createRoot(document.getElementById('root'));



// 1. Чтобы скрыть определенные компоненты из интерфейса, в их материнском компоненте используется `if` для `return`.
function UserGreeting(props) {                  // Компонент 1
  return (
      <h1>Hello {props.name}</h1>
  );
}

function GuestGreeting(props) {                 // Компонент 2
  return (
      <h1>Log in please</h1>
  );
}

function Greeting(props) {                      // Компонент управления рендером
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting/>;
  }
  return <GuestGreeting/>;
}

// root.render(<Greeting isLoggedIn={true} />);    // Вызов компонента управления в зависимости от пропа `isLoggedIn`



// 2. Также можно присваивать переменной компоненты по условию для последующего рендера
class LoginControll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick = () => {
    this.setState({isLoggedIn: true});                            // Обработчик для первого состояния
  }

  handleLogoutClick = () => {
    this.setState({isLoggedIn: false});                           // Обработчик для второго состояния
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;       // Присваиваем первое либо второе состояния
    } else {
      button = <LoginButton onClick={this.handleLoginClick()} />;
    }

    return (
        <div>
          {button}
        </div>
    )                                                                   // Отображаем переменную с первым либо вторым состоянием

  }
}

root.render(<LoginControll />);



// 3. Также можно использовать `&&` для сокращения синтаксиса условного рендеринга и переноса его прямо в JSX.
// Тк логическое И возвращает первый false, иначе последний true, можно использовать && как условие -
// если первое значение true, то выводится второе, если первое false, то выводится false.
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;

  return (
    <div>
      <h1>Здравствуйте</h1>
      {unreadMessages.length > 0 &&
        <h2>
          У вас {unreadMessages.length} непрочитанных сообщений.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

root.render(<Mailbox unreadMessages={messages} />);



// 4. Также можно пользоваться тернарным условием прямо в JSX.
class Example extends React.Component {
  render() {
    const isLoggedIn = true;

    return (
        <div>
          {isLoggedIn
            ? <LogoutButton onClick={this.handleLogoutClick} />
            : <LoginButton onClick={this.handleLoginClick} />
          }
        </div>
    )
  }
}



// Иногда может потребоваться спрятать уже отрендереный компонент. Тогда можно создать в нем условие, по которому он будет возвращать null.
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
      <div className='warning'>
        Предупреждение
      </div>
  );
}