// https://ru.reactjs.org/docs/conditional-rendering.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));



// Чтобы скрыть определенные компоненты из интерфейса, в их материнском компоненте используется `if` для `return`.
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

root.render(<Greeting isLoggedIn={true} />);    // Вызов компонента управления в зависимости от пропа `isLoggedIn`



// 