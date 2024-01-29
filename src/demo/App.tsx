import { useState } from 'react';
import { LogClick } from '../LogClick';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <LogClick
          params={{
            userId: 123,
            name: 'click',
          }}
        >
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        </LogClick>
      </div>
    </>
  );
};
