// https://ru.reactjs.org/docs/refs-and-the-dom.html

import React, {Component, useRef} from 'react';
import {element} from 'prop-types';


// Рефы оправдано использовать при:
// управлении фокусом, выделении текста, управлением медиа; Императивном вызове анимаций: Интеграции со сторонними DOM библиотеками



// Рефы дают возможность получить доступ к DOM узлам или React эл-там, созданным в рендер-методе.
// Это лазейка, которая позволяет получить ссылку на узел DOM или компонент React (аналог `.getElementById()`)

// Рефы создаются с помощью `React.createRef()` и передаются в элементы через `ref` атрибут
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();     // В классах удобно присвоить реф св-ву класса
  }

  render() {
    return (
        <div ref={this.myRef}>My ref</div>
    )
  }
}

// Доступ к рефу можно получить через св-во `current`
const node = this.myRef.current


// Реф можно использовать с классовым(!) компонентом React или HTML эл-том -
// в первом случае в current кладется экземпляр смонтированного компонента
// во втором соответствующий DOM-элемент

// Пример использования для хранения DOM-элемента
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  focusTextInput = () => {
    this.textInput.current.focus()            // Обращаемся к current, чтобы получить дом узел
  }

  render() {
    return (
        <div>
          <input
            type='text'
            ref={this.textInput}
          />
          <input
            type='button'
            value='Focus on text field'
            onClick={this.focusTextInput}
          />
        </div>
    );
  }
}


// Пример использования для имитации клика по классовому(!) компоненту выше
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput()
  }

  render() {
    return (
        <CustomTextInput ref={this.textInput} />
    );
  }
}



// С функциональными компонентами реф нельзя использовать, тк у функции не создается экземпляров, но
// можно воспользоваться хуком `forwardRef()` и мб `useImperativeHandle`

// При всем этом реф в функциональном компоненте работает, если ссылается на DOM-элемент или классовый(!) компонент
function CustomTextInput2() {
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
      <div>
        <input
            type='text'
            ref={textInput}
        />
        <input
          type='button'
          value='Focus on text field'
          onClick={handleClick}
        />
      </div>
  );
}



// Если родительскому компоненту необходим доступ к дочернему DOM-узлу, то рекомендуется использовать перенаправление рефов (2.5)



// Колбэк рефы - способ определения атрибута рефов через колбэк

// React вызовет реф колбэк с DOM-элементом при монтировании компонента, а также вызовет его со значением null при размонтировании.
// Рефы будут хранить актуальное значение перед вызовом методов `componentDidMount()` и `componentDidUpdate()`
class CustomTextInput3 extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element
    }

    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus();
    }
  }

  componentDidMount() {
    this.focusTextInput()
  }

  render() {
    return (
        <div>
          <input
              type='text'
              ref={this.setTextInputRef}          // пихаем в реф колбэк, чтобы сохранять ссылку на DOM-элемент
          />
          <input
              type='button'
              value='Focus on text field'
              onClick={this.focusTextInput}
          />
        </div>
    );
  }
}


// Можно передавать колбэк рефы между компонентами точно также, как объектные рефы, созданные через `React.create()`
function CustomTextInput4(props) {
  return (
      <div>
        <input ref={props.inputRef} />
      </div>
  );
}

class Parent extends React.Component {

  render() {
    return (
        <CustomTextInput4 inputRef={el => this.inputElement = el} />    // Теперь св-во компонента Parent `inputElement` будет хранить значение DOM узла <input> в CustomTextInput4
    );
  }
}