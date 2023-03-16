// https://ru.reactjs.org/docs/hooks-reference.html#useref


import React, {useRef} from 'react';


// `useRef(initialValue)` - функциональный аналог `createRef()`. Позволяет обращаться к узлу или компонету как через `getDocumentById()`
// Также `useRef` можно использовать как св-ва экземпляра класса у функций



// Для оптимизации больших компонентов (чтобы не вычислять начальное состояние больше одного раза) рекомендуется создавать условие для начального значения
function Example1() {
  const ref = useRef(null);

  function getObserver() {
    if (ref.current === null) {
      ref.current = new Observer()
    }
    return ref.current;
  }

  return <p ref={ref}></p>
}


// Мутирование св-ва `ref.current` не вызывает ререндер. Если нужно запустить что-то, когда React присоединяет и отсоединяет реф, можно использовать коллбэк-реф (или useCallback)