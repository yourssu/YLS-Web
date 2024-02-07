import { useState } from 'react';
import { LogClick } from '../LogClick';
import { useLocation } from 'react-router-dom';
import { LogScreen } from '../LogScreen';
export const Drawer = () => {
  const [count, setCount] = useState(0);
  const router = useLocation();

  return (
    <>
      <h1>Drawer</h1>
      <div className="card">
        <LogScreen
          params={{
            path: router.pathname,
            name: '',
            userId: 'test',
            serviceName: 'home',
          }}
        >
          <LogClick
            params={{
              name: 'click',
              serviceName: 'home',
              path: router.pathname,
              userId: 'test',
            }}
          >
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          </LogClick>
        </LogScreen>
      </div>
    </>
  );
};
