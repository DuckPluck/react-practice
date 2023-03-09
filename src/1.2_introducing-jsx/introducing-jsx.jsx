// https://ru.reactjs.org/docs/introducing-jsx.html

import React from 'react';
import '../styles.scss';
// import {Routes, Route, Link} from 'react-router-dom';
//
// import { RenderingElements } from '../1.3_rendering-elements/rendering-elements';
// import { Componentsandprops } from '../1.4_components-and-props/components-and-props';
// import { Stateandlifecycle } from '../1.5_state-and-lifecycle/state-and-lifecycle';
// import { Handlingevents } from '../1.6_handling-events/handling-events';
// import { Conditionalrendering } from '../1.7_conditional-rendering/conditional-rendering';
// import { Listsandkeys } from '../1.8_lists-and-keys/lists-and-keys';
// import { Forms } from '../1.9_forms/forms';



// JSX - это расширение js. JSX производит элементы React. По сути это язык шаблонов с функциями js.
// Также JSX это название типа, которого привносит это расширение (это не строка и не фрагмент HTML):
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


// ---------------------------------------------------------------------------------------------------------------------

// export function Introducingjsx() {
//   return (
//       <>
//         <header>
//           <a href='/renderingelements'>Rendering elements</a>
//           <a href='/componentsandprops'>Components and props</a>
//           <a href='/stateandlifecycle'>State and lifecycle</a>
//           <a href='/handlingevents'>Handling events</a>
//           <a href='/conditionalrendering'>Conditional rendering</a>
//           <a href='/listsandkeys'>Lists and keys</a>
//           <a href='/forms'>Forms</a>
//         </header>
//         <Routes>
//           <Route path='/renderingelements' element={<RenderingElements />} />
//           <Route path='/componentsandprops' element={<Componentsandprops />} />
//           <Route path='/stateandlifecycle' element={<Stateandlifecycle />} />
//           <Route path='/handlingevents' element={<Handlingevents />} />
//           <Route path='/conditionalrendering' element={<Conditionalrendering />} />
//           <Route path='/listsandkeys' element={<Listsandkeys />} />
//           <Route path='/forms' element={<Forms />} />
//         </Routes>
//       </>
//   );
// }

