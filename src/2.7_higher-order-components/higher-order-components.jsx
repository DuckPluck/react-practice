// https://ru.reactjs.org/docs/higher-order-components.html

import React from 'react';

// HOC - функция-обертка, которая 'апгрейдит' компонент
// Используется для повторного использования логики
function logProps(WrappedComponent, logCallback) {                // HOC функция возвращает обернутый в доп. логику компонент
    return class extends React.Component {
        componentDidUpdate(prevProps) {
            logCallback(prevProps);                                // Выполняет переданный в нее колбэк
        }

        render() {
            return <WrappedComponent {...this.props} />;          // Рендерит переданный в нее компонент
        }
    };
}

const logCallback = (prevProps) => {
    console.log('Текущие пропсы: ', this.props);
    console.log('Предыдущие пропсы: ', prevProps);
};

const CommentListWithPropsLog = logProps(                           // Вызываем HOC с разными компонентами, не повторяя при этом код
    CommentList,
    logCallback
);

const BlogPostWithPropsLog = logProps(
    BlogPost,
    logCallback
);



// (!) HOC функции не должны работать с прототипами, тк тогда их будет легко перезаписать друг-другом и будут проблемы с функциональными компонентами


// (!) Если после использования HOC в апгрейднутый компонент не требуется принимать все пропсы, то все равно нужно передавать все пропсы
// Тк это улучшит совместимость и не будет создавать путаницы, большинство HOC поэтому имеют такой render:
function exampleHOC(WrappedComponent, logCallback) {
    return class extends React.Component {
        componentDidUpdate(prevProps) {
            logCallback(prevProps);
        }

        render() {
            // Отфильтруйте пропсы применимые только к этому HOC и которые не нужно передавать дальше
            const {extraProp, ...passThroughProps} = this.props;

            // Добавьте новые пропсы в оборачиваемый компонент. Обычно мы передаём значения состояния или методы экземпляра
            const injectedProp = someStateOrInstanceMethod;

            // Передайте пропсы в оборачиваемый компонент
            return (
                <WrappedComponent
                    injectedProp={injectedProp}
                    {...passThroughProps}
                />
            );
        }
    };
}


// (!) Добавьте отображаемое в react dev tools имя (class.displayName) для апгрейднутых компонентов, чтобы не путать с обычным компонентом
function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {/* ... */}
    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return WithSubscription;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


// (!) Не используйте HOC внутри рендер-метода - из-за согласования react сравнит, а затем перерендерит дерево, обнулив данные
// При необходимости можно применять HOC в методах жизненного цикла или конструкторе компонента


// (!) Тк мы заворачиваем компонент в контейнер, все его статические методы теряются, так что их нужно определять в HOC заранее
// для этого нужно знать что за методы используются в компоненте (либо воспользоваться скриптом hoist-non-react-statics).
function enhance(WrappedComponent) {
    class Enhance extends React.Component {/*...*/}
    // Мы должны точно знать какие методы копировать :(
    Enhance.staticMethod = WrappedComponent.staticMethod;
    return Enhance;
}


// (!) Рефы у обернутых компонентов теряются. Их нужно использовать совместно с `React.forwardRef` (по аналогии с хуками)