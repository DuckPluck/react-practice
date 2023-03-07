// https://ru.reactjs.org/docs/hooks-reference.html#usecontext

import React, {useContext} from 'react';


// Контекст позволяет вынести логику в отдельный файл context.jsx,
// потом можно обратиться к этой логике из любого компонента, который находится внутри тега <Context.Provider> напрямую.

// `useContext(Context)` - хук принимает объект контекста и подписывает компонент на этот контекст (аналог св-ва `static contentType` у классов)
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

function ThemedButton(props) {
  const contextValue = useContext(ThemeContext);      // получили контекст, минуя промежуточный компонент <Toolbar />

  return <Button theme={contextValue} />;
}

// Тонкости контекста приведены в пункте 3.3_context