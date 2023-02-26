// https://ru.reactjs.org/docs/hooks-overview.html

import {useState, useEffect, useContext, useReducer} from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';


// Хуки не работают внутри классов
// Хуки нельзя вызывать внутри циклов, условий и вложенных функций
// также хуки стоит вызывать только в функциональных компонентах React


// функция `useState(default)` это хук, который позволяет создать одно поле состояния и метод для его изменения(аналог `.setState()` для одного компонента).
// Метод принимает аргумент - начальное состояние.
// В качестве значения можно указать объект. НО(!) `useState`, в отличие от `setState` ЗАМЕЩАЕТ объект, а не осуществляет слияние!
function ExampleWithManyStates(props) {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState({text: 'learn hooks'});
  // ...
}



// `useEffect(callback)` это хук, который выполняет функционал `componentDidMount()`, `componentDidUpdate()` и `componentWillUnmount()`.
// Функция в колбэке запускается после каждого рендера.
// Функция в ретерне колбека запускается перед сбросом компонента
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times!`;
    return () => {
      // логика запустится перед сбросом
    };
  });

  return (
      <div>
        <p>You clicked {count} times!</p>
        <button onClick={() => setCount(count + 1)}>
          Click me!
        </button>
      </div>
  );
}



// `useContext()` позволяет подписаться на контекст без каких либо вложений.
function Example2() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
}



// `useReducer()` позволяет управлять внутренним состоянием более сложного компонента с помощью редусера
function Example3() {
  const [todos, dispatch] = useReducer(todosReducer);
}



// Для копирования состояния и логики хуков - работа с формами, анимациями, декларативные подписки, таймеры и тд, можно объединить эти хуки в один - пользовательский хук
// Имена хуков должны начинаться с 'use...'.
// Можно использовать один и тот-же хук несколько раз - они имеют независимые состояния
function useFriendStatus(friendId) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange);

    };
  });

  return isOnline;
}


function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'online' : 'offline';
}