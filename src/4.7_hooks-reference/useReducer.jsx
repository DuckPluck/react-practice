// https://ru.reactjs.org/docs/hooks-reference.html#usereducer

import React, {useReducer} from 'react';

// TODO разобраться почему не работает

// Хук редусер используется для обработки сложной логики состояния (например, несколько значений или след. состояние зависит от пред. состояния)
// Позволяет оптимизировать глубокие обновления, тк можно передавать dispatch вместо колбэков

// const [state, dispatch] = useReducer(reducer, initialArg, init);


// dispatch можно безопасно НЕ включать в списки зависимостей useEffect и useCallback.


// `useReducer(reducer, initialArg, init)` - Расширенная версия `useState()`.
// Принимает reducer в формате (state, action) => newState. Возвращает пару [state, dispatch].
const initialState = {count: 0};

function reducer1(state, action) {             // Перечисляем действия с состояниями
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter1() {
  const [state, dispatch] = useReducer(reducer1, initialState, init);              /* wtf почему ругается? */

  return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        {/* wtf почему ругается */}
      </>
  );
}


// Чтобы задать начальное состояние, нужно задать его третьим аргументом.
// Это обязательно должна быть функция, возвращающая результат. Аргументом в нее передастся `initialState`, а результат станет начальным состоянием.
function init(initialCount) {
  return {count: initialCount};
}

function reducer2(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter2({initialCount}) {
  const [state, dispatch] = useReducer(reducer2, initialCount, init);
  return (
      <>
        Count: {state.count}
        <button
            onClick={() => dispatch({type: 'reset', payload: initialCount})}>
          Reset
        </button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </>
  );
}

