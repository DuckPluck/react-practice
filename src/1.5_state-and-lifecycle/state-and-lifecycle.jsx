// https://ru.reactjs.org/docs/state-and-lifecycle.html


import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.scss';

// const root = ReactDOM.createRoot(document.getElementById('root'));


// В большом количестве компоненты перегружают систему, поэтому их нужно чистить.
// Делается это с помощью lifecycle-методов `componentDidMount()` и `componentWillUnmount()`  (mount - рендер компонентов в DOM)

// `componentDidMount()` - запускается как только компонент внедрён в DOM
// `componentWillUnmount()` - запускается перед удалением компонента из DOM
class LifecycleExample extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(
        () => this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}


// Иногда сброс или выполнение эффекта может вызвать проблемы с производительностью.
// Чтобы не выполнять рендер каждый раз, возможно решить это с помощью сравнения `prevProps` или `prevState`
class Example2 extends React.Component {
  componentDidMount(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      document.title = `Total count is ${this.state.count}`
    }
  }
}


// ---------------------------------------------------------------------------------------------------------------------
// Состояния(state) позволяют изменять компоненты, не пересоздавая их.
// Состояние объявляется в конструкторе компонента.
// Состояние это как пропс, который доступен только конкретному компоненту.
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()}               // Подготовили состояние к изменению.
  }

  componentDidMount() {
    this.timerID = setInterval(
        () => this.tick, 1000);     // При рендере метод запустит интервалы для метода tick()
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({                          // tick() запускает метод, который переключает состояние `.setState()`
      date: new Date()
    });
  }

  render() {
    return (
        <div>
          <h1>Привет, мир!</h1>
          <h2>Сейчас {this.state.date.toLocaleString()}.</h2>
        </div>
    );
  }
}

// root.render(<Clock />);



// Состояние НЕЛЬЗЯ менять вручную - изменение не произойдет. Разрешены только присваивания в конструкторе.
this.state.comment = 'Привет';                          // - НЕ НАДО ТАК
this.setState({comment: 'Привет'});                     // воо, вот это по-нашему.



// Тк состояния и пропсы это асинхронные штуки, НЕЛЬЗЯ обращаться к ним напрямую - они могут измениться во время работы.
// В таком случае в `.setState()` можно передать функцию и скопировать объекты как аргументы.
this.setState({
  counter: this.state.counter + this.props.increment,   // - фуууу (👎)
});

this.setState((state, props) => ({
  counter: state.counter + props.increment,             // - мммм) (👍)
}));



// Когда мы вызываем `.setState()`, его аргумент(новое состояние) объединяется с текущим состоянием компонента(props).
// То есть можно добавить новые поля или изменить старые отдельными или одним вызовами.
// Пропущенные поля в новом состоянии при этом останутся неизменными.
class Example1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
    }
  }

  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        post: response.post,
      })
    })

    fetchComments().then(response => {
      this.setState({
        comments: response.comments,
      })
    })
  }

}


// Как уже говорилось ранее, состояния инкапсулированы в конкретных компонентах.
// Единственный способ, как можно передать их - вниз, дочернему компоненту, в виде его `props`:
<FormattedDate date={this.state.date}/>

function FormattedDate(props) {
  return <h2>Сейчас {props.date.toLocaleString()}.</h2>;
}