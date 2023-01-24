// https://ru.reactjs.org/docs/lists-and-keys.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));



// Для вывода нескольких похожих компонентов подряд (списка) в React используется `.map()`
function NumberList (props) {
  const numbers = props.numbers;
  ;

  return (
      <ul>
        {numbers.map(num =>
          <li key={num.toString()}>
            {num}
          </li>                                      // Про ключи `key={num.toString()}` чуть ниже
        )}
      </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
root.render(<NumberList numbers={numbers} />);



// Ключи это уникальный идентификатор тега. Атрибут принимает строку в кач-ве аргумента. Она не должна повторяться среди этого списка.
// При создании списка, в `.map()` НЕОБХОДИМО указывать ключи, чтобы React мог отслеживать изменения в списке.
// Ключи это подсказки чисто для React. Они не передаются внутрь компонента.

// Если явно не указать ключ, то React по-умолчанию будет использовать индексы эл-тов.
// (!) НЕЛЬЗЯ использовать индексы как ключи, если порядок эл-ов может поменяться. Это вызывает проблемы.

