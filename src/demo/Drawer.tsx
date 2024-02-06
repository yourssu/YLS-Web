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
            userId: 123,
            path: router.pathname,
            name: '',
            serviceName: 'drawer',
          }}
        >
          <LogClick
            params={{
              userId: 123,
              name: 'click',
              serviceName: 'drawer',
              path: router.pathname,
            }}
          >
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          </LogClick>
        </LogScreen>
      </div>
    </>
  );
};