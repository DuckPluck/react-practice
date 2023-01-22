// https://ru.reactjs.org/docs/introducing-jsx.html

import React from 'react';
import '../styles.scss';



// JSX - это расширение js. JSX производит элементы React. По сути это язык шаблонов с функциями js.
// Также JSX это название типа, который привносит это расширение (это не строка и не фрагмент HTML):
const element = <div><h1>Привет, мир!</h1></div>;


// JSX допускает использование любых js выражений в фигурных скобках `{}`
const example = <h1>Я хочу сказать {element + 101}</h1>;      // Output: <h1>Я хочу сказать <h1>Привет, мир!</h1> 101</h1>


// Если выражение необходимо разбить на несколько строк, то оно заключается в скобки для избежания проблем с `;`
const example2 = (
    <h1>
      Здравствуйте
    </h1>
);


// Атрибуты тегов в jsx могут быть записаны строкой ("") или js-выражением ({}).
const strAttribute = <a href="https://www.reactjs.org"> link </a>;
const exprAttribute = <img src={Math.E + 10}/>;



// После компиляции jsx превращается в объект, так что можно относится к нему как к объекту.

// Это эквивалентные записи
const element1 = (
  <h1 className='greeting'>
    Привет мир!
  </h1>
);

const element2 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Привет мир!'
);

// В результате создается похожий объект:
const element3 = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Привет, мир!',
  },
};
