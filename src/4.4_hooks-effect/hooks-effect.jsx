// https://ru.reactjs.org/docs/hooks-effect.html

import React, {useState, useEffect} from 'react';


// Effect hook дает возможность выполнения какой-либо логики сразу после маунта/обновления/уничтожении компонента (функциональный аналог componentDidMount\DidUpdate\WillUnmount)
// Обычно используется для загрузки данных, оформления подписки или изменения DOM вручную
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Total clicks is ${count}`;            // При обновлении компонента заголовок будет менять значение через API браузера
  });

  return (
      <div>
        <p>Total clicks is {count}</p>
        <button onClick={() => setCount(count + 1)}>Click me!</button>
      </div>
  );
}


// Чтобы прописать логику при уничтожении компонента, мы запихиваем ее в return:
// кстати функции необязательно иметь имя и она может быть стрелочной
function Example2() {
  useEffect(() => {
    document.title = 'for update/mount';

    return function () {
      document.title = 'for unmount';        // выполнится сразу перед уничтожением компонента (в том числе перед обновлением компонента)
    };
  });

  return <div>kek</div>;
}


// Иногда один компонент может объединять несколько несвязанных логик, часть которых требует обновления каждый рендер, а часть требует отписки при уничтожении
// В таких случаях проблема решается созданием нескольких хуков эффекта:
// Очередность выполнения - сверху-вниз
function Example3() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Total clicks is ${count}`;
  });

  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    setIsOnline(true);

    return () => {
      setIsOnline(false);
    };
  }, [isOnline]);
}


// Иногда сброс или выполнение эффекта может вызвать проблемы с производительностью.
// Можно сделать так, чтобы React пропускал исполнение хука эффекта, если определенные значения остались без изменений (===)
function Example4() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Total clicks is ${count}`;
  }, [count]);                                  // Теперь эффект перезапустится, только если count поменяется.
}

// В зависимости необходимо включать все меняющиеся значения, которые будут использоваться эффектом

// Если задача - запустить эффект и сбросить 1 раз, можно передать в зависимости пустой массив []
// При этом пропсы и состояние внутри эффекта всегда будут иметь начальное значение