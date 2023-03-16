// https://ru.reactjs.org/docs/forwarding-refs.html

import React from 'react';



// Перенаправление рефов позволяет автоматически передавать реф компонента одному из дочерних эл-тов (цеплять на родительский реф детский эл-т)

// `React.forwardRef` - позволяет создать компонент, в который можно передать помимо пропсов еще и реф вторым аргументом,
// чтобы зацепить его за узел этого компонента

export const FancyButton = React.forwardRef((props, ref) => {
  return (
      <button ref={ref}>
        {props.children}
      </button>
  );
})

// const ref = React.createRef();                         - теперь можно отправить внутрь компонента реф:
// <FancyButton ref={ref}>Click me!</FancyButton>         - этот реф будет указывать на узел <button> в компоненте <FancyButton>