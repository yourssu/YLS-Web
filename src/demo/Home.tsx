import { useState } from 'react';
import { LogClick } from '../LogClick';
import { useLocation } from 'react-router-dom';
import { LogScreen } from '../LogScreen';
export const Home = () => {
  const [count, setCount] = useState(0);
  const router = useLocation();
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <LogScreen
          params={{
            userId: 123,
            screenName: router.pathname,
            eventName: '',
          }}
        >
          <LogClick
            params={{
              userId: 123,
              eventName: 'click',
              screenName: '',
            }}
          >
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          </LogClick>
        </LogScreen>
      </div>
    </>
  );
};
