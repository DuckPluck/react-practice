import React, {memo, useState} from 'react';

// useMemo позволяет решить проблему принудительного рендера, если значение не менялось

// memo - 'улучшает' компонент до компонента высшего порядка (high order component)
// он обновляется только если его пропсы изменились

export const MemoChild = memo(() => {
  return (
      <div>Я никогда не буду обновляться</div>
  );
})

export const Child = () => {
  return (
      <div>Я буду обновляться с родителем</div>
  );
}

export const Parent = () => {
  const [state, setState] = useState(true)
  return (
  <div>
    <Child/>
    <MemoChild/>
    <button  onClick={() => setState(v => !v)}>Click</button>
  </div>
  )
}