// https://ru.reactjs.org/docs/context.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';


// Контекст позволяет вынести логику в отдельный файл context.jsx, потом можно обратиться к этой логике из любого компонента, который находится внутри <Context.Provider> напрямую.
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
        <ThemeContext.Provider value='dark'>
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
  static contextType = ThemeContext;              // получили контекст, минуя промежуточный компонент
  render() {
    return <Button theme={this.context} />;
  }
}



// (!) Контекст стоит использовать, когда нескольким компонентам нужен доступ к логике, вместо того, чтобы тащить логику сверху-вниз
// так что, если логика используется только одним компонентом, стоит использовать Инверсию управления:
// запихнуть этот компонент в переменную внутри управляющего компонента, чтобы она имела доступ к логике напрямую
// после этого динамически вызывать(`{}`) переменную в render упр. Компонента.



// TODO: context API