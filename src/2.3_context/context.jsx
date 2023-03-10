// https://ru.reactjs.org/docs/context.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';


// Контекст позволяет вынести логику в отдельный файл context.jsx,
// потом можно обратиться к этой логике из любого компонента, который находится внутри тега <Context.Provider> напрямую.
// Для этого необходимо указать объект контекста в static св-во компонента `objectType`. Далее можно обращаться к контексту через `this.context`
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
      <div>
        <ThemedButton />
      </div>
  );
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;              // получили контекст, минуя промежуточный компонент <Toolbar />
  render() {
    return <Button theme={this.context} />;
  }
}


// (!) Контекст стоит использовать, когда нескольким компонентам нужен доступ к логике, вместо того, чтобы тащить логику сверху-вниз
// так что, если логика используется только одним компонентом, стоит использовать Инверсию управления:
// запихнуть этот компонент в переменную внутри управляющего компонента, чтобы она имела доступ к логике напрямую
// после этого динамически вызывать(`{}`) переменную в render упр. Компонента.



// API:

// `React.createContext(defaultValue)` - Создает объект Context, если компонент подписан на него, то React получает контекст из ближайшего Provider выше по дереву
// defaultValue используется только если для компонента нет подходящего Provider. Он выступит вместо него
const myContext = React.createContext();



// `<Context.provider>` - Создает провайдер - тег, внутри которого теги могут обращаться к контексту.
// Компонент Provider принимает проп value, который будет передан во все дочерние компоненты. Они будут перерендриваться, как только value Provider`а изменится (Object.is()).
// Если вложить один провайдер внутрь другого, то второй перезапишет проп value.
<MyContext.Provider value={'jopa'/* некоторое значение */}>
  {/* дочерние компоненты */}
</MyContext.Provider>;



// `Class.contextType` - у класса React есть св-во `contextType`.
// Если в него положить объект контекста, то внутри класса можно обращаться к нему через `this.context`
class Example1 extends React.Component {
  componentDidMount() {
    const value = this.context;
    /* ... */
  }

  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }

  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }

  render() {
    let value = this.context;
    /* отрендерить что-то, используя значение MyContext */
  }
}

Example1.contextType = myContext;                                   // Присвоили классу контекст (также можно объявить внутри класса через static св-во)

// При необходимости подписаться сразу на 2 контекста в дочернем компоненте придется вкладывать один Consumer в другой,
// а внутрь дочерний объект, которому передаются переменные.



// `<MyContex.Consumer>` - тег/компонент, который подписывается на изменения контекста, чтобы передать подписку дочерним компонентам
// Он принимает функцию в качестве дочернего компонента, эта функция принимает контекст и возвращает дочерний компонент
<MyContext.Consumer>
  {value => 'jopa'/* отрендерить что-то, используя value контекста */}
</MyContext.Consumer>;



// `Context.displayName` - у объекта Context есть св-во `displayName`, которое принимает строку. Эта строка будет отображаться в React DevTools
myContext.displayName = 'MyDisplayName';
<MyContext.Provider>        {/* "MyDisplayName.Provider" в DevTools*/}
  <MyContext.Consumer>
    {/* дочерние эл-ты */}
  </MyContext.Consumer>        {/* "MyDisplayName.Consumer" в DevTools */}
</MyContext.Provider>


// TODO: примеры использования