import { useState } from 'react';
import { LogClick } from '../components/LogClick';
import { useLocation } from 'react-router-dom';
import { LogScreen } from '../components/LogScreen';

export const Home = () => {
  const [count, setCount] = useState(0);
  const router = useLocation();

  return (
    <>
      <h1>Home</h1>
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
