// https://ru.reactjs.org/docs/hooks-reference.html#useimperativehandle

import React, {forwardRef, useImperativeHandle, useRef} from 'react';

// `useImperativeHandle(ref, createHandle, [deps])` - хук позволяет связать реф дочернего компонента с рефом родительского
// используется для удобного рефакторинга

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }))

  return (
      <input ref={inputRef} />
  );
});

// Теперь компонент-предок этого компонента может вызвать inputRef.current.focus()
// Обязательно используется с `forwardRef()`