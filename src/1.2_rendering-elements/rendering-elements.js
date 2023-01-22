// https://ru.reactjs.org/docs/rendering-elements.html


import React from 'react';
import '../styles.scss';
import ReactDOM from 'react-dom/client';


// Элементы React это простые объекты, из которых строятся компоненты React.
// Для рендеринга (отображения) они передаются в jsx объект с помощью метода `.render()`:
const root = ReactDOM.createRoot(document.getElementById('root'));                  // Создаем корневой jsx-объект
const element = <h1>Hello, world!</h1>;                                                      // Создаем элемент
root.render(element);                                                                        // Передаём эл-т в рендер


// Элементы иммутабельны - после создания нельзя менять атрибуты и даже потомков.
// Чтобы обновить интерфейс, придется создать новый эл-т и передать его в `root.render()`(👎) или изменить его состояние(👍)
function clock() {
  const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleDateString()}.</h2>
      </div>
  );
  root.render(element);
}

setInterval(clock, 1000);                                                           // Обновляет элемент (часы) каждую секунду

// Хотя мы создали целое DOM дерево, React обновляет только изменившийся эл-т.