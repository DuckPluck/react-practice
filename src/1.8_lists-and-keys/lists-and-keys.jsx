// https://ru.reactjs.org/docs/lists-and-keys.html


import { number } from 'prop-types';
import React from 'react';
import '../styles.scss';


// const root = ReactDOM.createRoot(document.getElementById('root'));



// Для вывода нескольких похожих компонентов подряд (списка) в React используется `.map()`
export function NumberList (props) {
  const numbers = props.numbers;

  NumberList.propTypes = {                              // Про типизацию пропсов чуть ниже
    numbers: number.isRequired
  }

  return (
      <ul>
        {numbers.map(num =>
          <li key={num.toString()}>
            {num}
          </li>                                         // Про ключи `key={num.toString()}` еще ниже
        )}
      </ul>
  );
}

export const numbers = [1, 2, 3, 4, 5];

// root.render(<NumberList numbers={numbers} />);



// В последних версиях React при обращении к пропсам требуется создавать статическое св-во `propTypes` с объектом - валидатором типов
//  - имя св-ва объекта это имя переменной, значение - возможные типы, которые принимает переменная.

// Это необходимо, чтобы React предупреждал об ошибках связанных с типами данных
// Также необходимо импортировать нужный тип и `isRequired` from 'prop-types'



// Ключи это уникальный идентификатор тега. Атрибут принимает строку в кач-ве аргумента. Она не должна повторяться среди этого списка.
// При создании списка, в `.map()` НЕОБХОДИМО указывать ключи, чтобы React мог отслеживать изменения в списке.
// Ключи это подсказки чисто для React. Они не передаются внутрь компонента.

// Если явно не указать ключ, то React по-умолчанию будет использовать индексы эл-тов.
// (!) НЕЛЬЗЯ использовать индексы как ключи, если порядок эл-ов может поменяться. Это вызывает проблемы.

