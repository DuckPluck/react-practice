// https://ru.reactjs.org/docs/hooks-reference.html#usecallback

// import {useCallback} from 'react';



// `useCallback(fn, [deps])` - мемоизирует закинутую в него функцию fn. Теперь она изменится только если изменится одна из зависимостей deps
// `useCallback(fn, [deps])` эквивалент `useMemo(() => fn, [deps])`
// Это полезно использовать при передаче колбэков дочерним компонентам с `shouldComponentUpdate`

// const memoizedCallback = useCallback(
//     () => {
//       doSomething(a, b)
//     }, [a, b]
// );


// Если передать пустой массив зависимостей, то будет ререндриться каждый раз, когда реф привязывается к другому узлу